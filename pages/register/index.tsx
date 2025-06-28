'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  UserIcon, IdentificationIcon, CheckCircleIcon, ArrowLeftIcon, ArrowRightIcon,
  PaperAirplaneIcon, ExclamationTriangleIcon, DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import axios, { isAxiosError } from 'axios';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';
import { DOCUMENT_TYPES } from '../../documentConfig';

const UPLOADED_DOCS_STORAGE_KEY = 'userUploadedDocsStatus';
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ritiktest.site";

function InputField({ label, id, type = 'text', value, onChange, placeholder, required = true, disabled = false, ...props }: { label: string; id: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; required?: boolean; disabled?: boolean; [key: string]: any; className?: string; }) {
  return ( <div className="mb-4"><label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label><input type={type} id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} className={props.className || `block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm text-black ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`} required={required} disabled={disabled} {...props} /></div>);
}

function StepWrapper({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode; }) {
  return ( <div><div className="flex items-center mb-6 border-b border-gray-200 pb-3"><Icon className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0" /><h2 className="text-xl md:text-2xl font-semibold text-indigo-800">{title}</h2></div>{children}</div>);
}

function EnhancedAadhaarVerification({ t, aadhaarNumber, aadhaarFile, updateAadhaarNumber, updateAadhaarFile }: { t: any; aadhaarNumber: string; aadhaarFile: File | null; updateAadhaarNumber: (number: string) => void; updateAadhaarFile: (file: File | null) => void;}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) { toast.error("File size exceeds 10MB limit."); updateAadhaarFile(null); e.target.value = ''; return; }
    updateAadhaarFile(file);
  };
  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); if (value.length <= 12) { updateAadhaarNumber(value); }
  };
  return (
    <div className="space-y-6">
      <div><label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-1">{t.aadhaar_label} <span className="text-red-500">*</span></label><input type="text" id="aadhaarNumber" value={aadhaarNumber} onChange={handleAadhaarChange} placeholder={t.aadhaar_placeholder} className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out shadow-sm text-black" maxLength={12} required /><p className="text-xs text-gray-500 mt-1">{aadhaarNumber.length}/12 digits</p></div>
      <div>
        <label htmlFor="aadhaarUpload" className="block text-sm font-medium text-gray-700 mb-1">{t.aadhaar_file_label} <span className="text-red-500">*</span></label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
          <div className="space-y-1 text-center">
            <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 justify-center"><label htmlFor="aadhaarUpload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-2 py-1"><span>{t.aadhaar_file_cta}</span><input id="aadhaarUpload" name="aadhaarUpload" type="file" accept="image/*,.pdf" onChange={handleFileChange} className="sr-only" required /></label><p className="pl-1 hidden sm:inline">{t.aadhaar_drag_drop}</p></div>
            <p className="text-xs text-gray-500">{t.aadhaar_file_hint}</p>
          </div>
        </div>
        {aadhaarFile && (<div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md"><p className="text-sm text-green-700 flex items-center"><CheckCircleIcon className="w-4 h-4 mr-2" />{t.file_selected_text.replace('{fileName}', aadhaarFile.name)}</p></div>)}
      </div>
    </div>
  );
}

export default function Register() {
  const router = useRouter();
  const { t } = useTranslation('register');
  const [step, setStep] = useState(1);
  const [otpPhase, setOtpPhase] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', otp: '', aadhaarNumber: '', aadhaarFile: null as File | null });
  const [isLoading, setIsLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [newUserFlowCompleted, setNewUserFlowCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedQR = localStorage.getItem('qrCodePath');
      if (storedQR) setQrCode(storedQR);
    }
  }, []);

  const stepsInfo = [ { number: 1, title: t.step_1_title, icon: UserIcon }, { number: 2, title: t.step_2_title, icon: IdentificationIcon }];
  const updateFormData = (data: Partial<typeof formData>) => { setFormData(prev => ({ ...prev, ...data })); setError(null); };
  
  const handleSendOtpClick = async () => {
    setError(null);
    if (!formData.name.trim()) { toast.error(t.name_required_error); setError(t.name_required_error); return; }
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) { toast.error(t.phone_required_error); setError(t.phone_required_error); return; }
    setOtpLoading(true);
    const apiFormData = new FormData();
    apiFormData.append('name', formData.name.trim()); apiFormData.append('phoneNumber', formData.phone); apiFormData.append('role', 'DRIVER');
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/register`, apiFormData);
      if (response.status === 200 || response.status === 201) { toast.success(t.otp_sent_toast); setOtpPhase(true); } else { toast.error(response.data?.message || t.otp_failed_toast); setError(response.data?.message || t.otp_failed_toast); }
    } catch (err) {
      let errorMsg = "Failed to send OTP."; if (isAxiosError(err)) errorMsg = err.response?.data.message || err.message; toast.error(errorMsg); setError(errorMsg);
    } finally { setOtpLoading(false); }
  };
  
  const verifyOTP = async (): Promise<boolean> => {
    const otpLength = 4;
    if (!formData.otp || formData.otp.length !== otpLength) { toast.error(t.otp_length_error.replace('{otpLength}', otpLength.toString())); return false; }
    setVerifyOtpLoading(true); setError(null);
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/verify-otp`, { phoneNumber: formData.phone, otp: formData.otp });
      localStorage.setItem("userDetails", JSON.stringify(response.data.user)); localStorage.setItem("authToken", response.data.user.token); if (response.data.user.qrCodePath) localStorage.setItem("qrCodePath", response.data.user.qrCodePath);
      toast.success(t.otp_verify_success_toast); return true;
    } catch (error) {
      const errorMsg = isAxiosError(error) ? error.response?.data?.message || t.otp_verify_failed_toast : t.otp_verify_failed_toast;
      toast.error(errorMsg); setError(errorMsg); return false;
    } finally { setVerifyOtpLoading(false); }
  };
  
  const handleNext = async () => {
    setError(null);
    if (step === 1) {
      if (!formData.name.trim()) { toast.error(t.name_required_error); setError(t.name_required_error); return; }
      if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) { toast.error(t.phone_required_error); setError(t.phone_required_error); return; }
      if (!otpPhase) { toast.error(t.send_otp_first_error); setError(t.send_otp_first_error); return; }
      const otpVerified = await verifyOTP(); if (otpVerified) { setStep(prev => prev + 1); }
    } else { setStep(prev => prev + 1); }
  };
  
  const handleBack = () => { setError(null); if (step > 1) setStep(prev => prev - 1); };
  
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault(); setError(null);
    if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) { setError(t.aadhaar_num_required_error); toast.error(t.aadhaar_num_required_error); return; }
    if (!formData.aadhaarFile) { setError(t.aadhaar_doc_required_error); toast.error(t.aadhaar_doc_required_error); return; }
    setIsLoading(true); const loadingToastId = toast.loading(t.aadhaar_uploading_toast);
    const aadhaarForm = new FormData();
    aadhaarForm.append('aadhaarNumber', formData.aadhaarNumber); aadhaarForm.append('type', 'AADHAAR'); aadhaarForm.append('file', formData.aadhaarFile, formData.aadhaarFile.name);
    const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
    if (!token) { toast.dismiss(loadingToastId); toast.error(t.auth_token_missing_error); setError(t.auth_token_missing_error); setIsLoading(false); return; }
    try {
      await axios.post(`${apiBaseUrl}/auth/upload-document`, aadhaarForm, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
      toast.dismiss(loadingToastId); toast.success(t.aadhaar_upload_success_toast);
      if (typeof window !== 'undefined') { const docs = JSON.parse(localStorage.getItem(UPLOADED_DOCS_STORAGE_KEY) || '{}'); docs['AADHAAR'] = true; localStorage.setItem(UPLOADED_DOCS_STORAGE_KEY, JSON.stringify(docs)); }
      let allDocsUp = false;
      if (typeof window !== 'undefined') { const status = JSON.parse(localStorage.getItem(UPLOADED_DOCS_STORAGE_KEY) || '{}'); allDocsUp = DOCUMENT_TYPES.every(doc => !!status[doc.key]); }
      setNewUserFlowCompleted(allDocsUp); setStep(stepsInfo.length + 1);
      if (!allDocsUp) { toast.success(t.aadhaar_proceed_toast, { duration: 4000 }); }
    } catch (err) {
      toast.dismiss(loadingToastId); let errorMsg = t.aadhaar_upload_failed_toast;
      if (isAxiosError(err)) errorMsg = err.response?.data.message || err.response?.data.error || err.message; toast.error(errorMsg); setError(errorMsg);
    } finally { setIsLoading(false); }
  };

  const progressPercent = step <= stepsInfo.length ? ((step - 1) / (stepsInfo.length - 1)) * 100 : 100;
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center"><h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2">{t.page_title}</h1><p className="text-gray-600 text-lg">{t.page_description}</p></div>
        {step <= stepsInfo.length && (
          <div className="mb-12 px-4"><div className="relative"><div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 transform -translate-y-1/2 rounded-full"></div><div className="absolute left-0 top-1/2 h-1 bg-indigo-600 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div><div className="relative flex justify-between items-start">{stepsInfo.map(({ number, title, icon: Icon }) => { const isActive = step === number; const isCompleted = step > number; let itemClass = `flex flex-col items-center text-center z-10 w-24 ${stepsInfo.length === 2 ? (number === 1 ? 'items-start text-left' : 'items-end text-right') : ''}`; return (<div key={number} className={itemClass}><div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg' : isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300 text-gray-500'}`}>{isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : <Icon className="w-5 h-5 md:w-6 md:h-6" />}</div><span className={`mt-2 text-xs md:text-sm font-medium transition-colors duration-300 ${isActive ? 'text-indigo-700' : 'text-gray-500'}`}>{title}</span></div>);})}</div></div></div>
        )}
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10">
          {error && (<div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm flex items-center"><ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" /><span>{error}</span></div>)}
          {step === 1 && (<StepWrapper title={t.step_1_wrapper_title} icon={UserIcon}><div className="space-y-6"><InputField label={t.name_label} id="name" value={formData.name} onChange={(e) => updateFormData({ name: e.target.value })} placeholder={t.name_placeholder} required disabled={otpPhase} /><div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t.phone_label} <span className="text-red-500">*</span></label><div className="flex"><span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span><input type="tel" id="phone" value={formData.phone} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); if (value.length <= 10) { updateFormData({ phone: value }); } }} placeholder={t.phone_placeholder} className="flex-1 block w-full border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm text-black" maxLength={10} required disabled={otpPhase} /></div></div>{!otpPhase && (<button type="button" onClick={handleSendOtpClick} disabled={otpLoading} className="w-full mt-4 flex justify-center items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm disabled:opacity-60">{otpLoading ? t.sending_otp_button : t.send_otp_button}</button>)}{otpPhase && (<InputField label={t.otp_label} id="otp" type="tel" value={formData.otp} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); if (value.length <= 4) updateFormData({ otp: value }); }} placeholder={t.otp_placeholder} maxLength={4} required disabled={verifyOtpLoading} />)}</div></StepWrapper>)}
          {step === 2 && (<StepWrapper title={t.step_2_wrapper_title} icon={IdentificationIcon}><EnhancedAadhaarVerification t={t} aadhaarNumber={formData.aadhaarNumber} aadhaarFile={formData.aadhaarFile} updateAadhaarNumber={(number) => updateFormData({ aadhaarNumber: number })} updateAadhaarFile={(file) => updateFormData({ aadhaarFile: file })} /></StepWrapper>)}
          {step === stepsInfo.length + 1 && (<div className="text-center py-8"><CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" /><h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-600">{newUserFlowCompleted ? t.final_title_all_docs : t.final_title_aadhaar_only}</h2><p className="text-gray-600 mb-8 max-w-md mx-auto">{newUserFlowCompleted ? t.final_desc_all_docs : t.final_desc_aadhaar_only}</p>{!newUserFlowCompleted ? (<div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-md"><p className="text-indigo-700 font-medium">{t.final_cta_next_steps}</p><button onClick={() => router.push('/driver/driverVehicleDetails')} className="mt-3 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out">{t.final_cta_upload}</button></div>) : (<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md"><p className="text-green-700">{t.final_cta_under_review}</p></div>)}{qrCode && (<div className="mb-10 bg-gray-50 p-6 rounded-lg inline-block border border-gray-200"><h3 className="text-lg font-medium mb-4 text-indigo-700">{t.qr_title}</h3><Image src={qrCode} alt="Registration QR Code" width={180} height={180} className="rounded shadow mx-auto" unoptimized={true} /><p className="text-gray-500 mt-4 text-sm max-w-xs mx-auto">{t.qr_description}</p></div>)}<div><Link href="/" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{t.back_to_home_button}</Link></div></div>)}
          {step <= stepsInfo.length && (<div className={`flex mt-10 ${step > 1 ? 'justify-between' : 'justify-end'}`}>{step > 1 && (<button onClick={handleBack} type="button" disabled={isLoading || verifyOtpLoading} className="inline-flex items-center bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"><ArrowLeftIcon className="w-5 h-5 mr-2" /> {t.back_button}</button>)}{step < stepsInfo.length ? (<button onClick={handleNext} type="button" disabled={verifyOtpLoading || otpLoading || (step === 1 && !otpPhase) || (step === 1 && otpPhase && (!formData.otp || formData.otp.length !== 4))} className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60">{t.next_button} <ArrowRightIcon className="w-5 h-5 ml-2" /></button>) : (<button type="button" onClick={handleSubmit} disabled={isLoading} className="inline-flex justify-center items-center bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px]">{isLoading ? <>{/* SVG spinner */} {t.submitting_button}</> : <>{t.submit_button} <PaperAirplaneIcon className="w-5 h-5 ml-2 -rotate-45" /></>}</button>)}</div>)}
        </div>
      </div>
    </div>
  );
}