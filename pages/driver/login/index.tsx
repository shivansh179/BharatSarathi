'use client';

import { useState, FormEvent, ChangeEvent, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios, { isAxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from '@/hooks/useTranslation';
import {
    DevicePhoneMobileIcon, KeyIcon, ArrowRightOnRectangleIcon, TruckIcon,
    ExclamationTriangleIcon, PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ritiktest.site';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: FC<React.ComponentProps<'svg'>>;
}

function InputField({ id, label, type = 'text', value, onChange, placeholder, icon: Icon, required = false, className = '', ...props }: InputFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="relative mt-2 rounded-md shadow-sm">
                {Icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Icon className="h-5 w-5 text-gray-400" aria-hidden="true" /></div>}
                <input type={type} id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} required={required} className={`block w-full rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6 transition duration-150 ease-in-out ${Icon ? 'pl-10' : 'px-3'} ${className}`} {...props} />
            </div>
        </div>
    );
}

export default function DriverPhoneLogin() {
    const { t } = useTranslation('login');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const router = useRouter();

    const handleSendOtp = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        if (!phoneNumber || !/^\d{10,15}$/.test(phoneNumber)) {
            setError(t.invalid_phone_error);
            setIsLoading(false);
            toast.error(t.invalid_phone_error);
            return;
        }
        const loadingToastId = toast.loading(t.sending_otp_toast);
        try {
            await axios.post(`${apiBaseUrl}/auth/send-otp`, { phoneNumber });
            toast.dismiss(loadingToastId);
            toast.success(t.otp_sent_toast);
            setOtpSent(true);
            setError(null);
        } catch (err) {
            toast.dismiss(loadingToastId);
            let errorMsg = t.generic_otp_send_error;
            if (isAxiosError(err)) {
                 if (!err.response) errorMsg = t.connect_server_error;
                 else errorMsg = err.response.data?.message || err.response.data?.error || "Failed to send OTP.";
            } else if (err instanceof Error) {
                errorMsg = err.message;
            }
            setError(errorMsg);
            toast.error(t.otp_failed_toast.replace('{errorMsg}', errorMsg));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtpAndLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        if (!otp || !/^\d{4,6}$/.test(otp)) {
            setError(t.invalid_otp_error);
            setIsLoading(false);
            toast.error(t.invalid_otp_error);
            return;
        }
        const loadingToastId = toast.loading(t.verifying_otp_toast);
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/verify-otp`, { phoneNumber, otp });
            toast.dismiss(loadingToastId);
            const { token, user: apiUser } = response.data;
            
            console.log("data is",response.data);
            
            if (apiUser?.qrCodePath) localStorage.setItem("qrCodePath", apiUser.qrCodePath);
            
            const userData = {
                type: "Bharat Sarathi Registration (Phone OTP)",
                name: apiUser?.name, email: apiUser?.email, phoneNumber,
                aadhaarLast4: apiUser?.aadhaarNumber ? apiUser.aadhaarNumber.slice(-4) : null,
                registrationTimestamp: new Date().toISOString()
            };

            if (userData.name || userData.email || userData.phoneNumber) localStorage.setItem('userDetail', JSON.stringify(userData));
            
            if (token && typeof token === 'string') {
                localStorage.setItem('authToken', token);
                window.dispatchEvent(new Event('loginSuccess'));
                toast.success(t.login_success_toast);
                const uploadedDocs = JSON.parse(localStorage.getItem('userUploadedDocsStatus') || '{}');
                const allUploaded = Object.values(uploadedDocs).every(v => v === true);
                router.push(allUploaded ? '/' : '/driver/driverVehicleDetails');
            } else {
                setError(t.token_error);
                toast.error(t.token_error);
            }
        } catch (err) {
            toast.dismiss(loadingToastId);
            let errorMsg = t.generic_otp_verify_error;
            if (isAxiosError(err)) {
                if (!err.response) errorMsg = t.connect_server_error;
                else {
                    const backendMessage = err.response.data?.message || err.response.data?.error;
                    if (err.response.status === 401 || err.response.status === 400) errorMsg = backendMessage || t.invalid_otp_server_error;
                    else if (err.response.status >= 500) errorMsg = backendMessage || t.server_error_verify;
                    else errorMsg = backendMessage || `Verification failed (Status: ${err.response.status})`;
                }
            } else if (err instanceof Error) {
                errorMsg = err.message;
            }
            setError(errorMsg);
            toast.error(t.login_failed_toast.replace('{errorMsg}', errorMsg));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-white to-sky-100 p-4 sm:p-6 lg:p-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-8 sm:px-10 sm:py-12">
                    <div className="text-center mb-8">
                        <TruckIcon className="mx-auto h-12 w-auto text-indigo-600 mb-4" aria-hidden="true" />
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t.title}</h1>
                        <p className="mt-2 text-lg leading-8 text-gray-600">{otpSent ? t.subtitle_enter_otp : t.subtitle_sign_in}</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md mb-6">
                            <div className="flex"><div className="flex-shrink-0"><ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" /></div><div className="ml-3"><p className="text-sm font-medium text-red-800">{error}</p></div></div>
                        </div>
                    )}

                    {!otpSent ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <InputField
                                id="phoneNumber"
                                label={t.phone_label}
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                placeholder={t.phone_placeholder}
                                icon={DevicePhoneMobileIcon}
                                required
                                autoComplete="tel"
                                disabled={isLoading || !apiBaseUrl}
                                maxLength={15}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !apiBaseUrl || !phoneNumber}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                            >
                                {isLoading ? (
                                    <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{t.sending_otp_button}</>
                                ) : (
                                    <>{t.send_otp_button}<PaperAirplaneIcon className="w-5 h-5 ml-2 transform rotate-45" aria-hidden="true" /></>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtpAndLogin} className="space-y-6">
                            <p className="text-sm text-gray-600 text-center">{t.change_number_prompt.replace('{phoneNumber}', phoneNumber)}<button type="button" onClick={() => { setOtpSent(false); setOtp(''); setError(null); }} className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500" disabled={isLoading}>{t.change_number_button}</button></p>
                            <InputField
                                id="otp"
                                label={t.otp_label}
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                placeholder={t.otp_placeholder}
                                icon={KeyIcon}
                                required
                                autoComplete="one-time-code"
                                disabled={isLoading || !apiBaseUrl}
                                maxLength={6}
                                inputMode="numeric"
                            />
                            <button type="submit" disabled={isLoading || !apiBaseUrl || !otp} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out">
                                {isLoading ? (
                                    <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{t.verifying_button}</>
                                ) : (
                                    <>{t.verify_button}<ArrowRightOnRectangleIcon className="w-5 h-5 ml-2" aria-hidden="true" /></>
                                )}
                            </button>
                            <button type="button" onClick={handleSendOtp} disabled={isLoading} className="w-full text-center py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-150">{t.resend_otp_button}</button>
                        </form>
                    )}
                    <div className="mt-8 text-center text-sm text-gray-500">{t.email_login_prompt}{' '}<Link href="/driver/login" className={`font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>{t.email_login_link}</Link></div>
                </div>
            </div>
        </div>
    );
}