import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define section interfaces
interface Product {
  id?: number;
  name: string;
  description: string;
  price: string;
  category: string;
}

interface Service {
  id?: number;
  name: string;
  description: string;
  price: string;
  category: string;
}

interface ServiceProvider {
  id?: number;
  providerName: string;
  contactInfo: string;
  location: string;
  description: string;
}

interface CarRentalService {
  id?: number;
  providerName: string;
  contactInfo: string;
  location: string;
  description: string;
}

interface Loan {
  id?: number;
  type: string;
  amount: string;
  interestRate: string;
  terms: string;
  description: string;
}

interface Insurance {
  id?: number;
  type: string;
  provider: string;
  coverage: string;
  premium: string;
  validityPeriod: string;
  description: string;
}

interface JobReference {
  id?: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
}

interface LegalService {
  id?: number;
  serviceName: string;
  provider: string;
  cost: string;
  description: string;
}

// Union type for all possible data types
type DataItem = Product | Service | ServiceProvider | CarRentalService | Loan | Insurance | JobReference | LegalService;

// Define field template interface
interface FieldTemplate {
  name: string;
  placeholder: string;
}

// Define the API sections
const API_SECTIONS = [
  'products',
  'services',
  'service-providers',
  'loans',
  'legal-services',
  'job-references',
  'car-rental-services',
  'insurances'
] as const;

// Define type for API sections
type ApiSection = typeof API_SECTIONS[number];

// Field templates for each section
const fieldTemplates: Record<ApiSection, FieldTemplate[]> = {
  'products': [
    { name: 'name', placeholder: 'Product Name' },
    { name: 'description', placeholder: 'Description' },
    { name: 'price', placeholder: 'Price' },
    { name: 'category', placeholder: 'Category' },
  ],
  'services': [
    { name: 'name', placeholder: 'Service Name' },
    { name: 'description', placeholder: 'Description' },
    { name: 'price', placeholder: 'Price' },
    { name: 'category', placeholder: 'Category' },
  ],
  'service-providers': [
    { name: 'providerName', placeholder: 'Provider Name' },
    { name: 'contactInfo', placeholder: 'Contact Info' },
    { name: 'location', placeholder: 'Location' },
    { name: 'description', placeholder: 'Description' },
  ],
  'car-rental-services': [
    { name: 'providerName', placeholder: 'Provider Name' },
    { name: 'contactInfo', placeholder: 'Contact Info' },
    { name: 'location', placeholder: 'Location' },
    { name: 'description', placeholder: 'Description' },
  ],
  'loans': [
    { name: 'type', placeholder: 'Type (e.g. EDUCATION)' },
    { name: 'amount', placeholder: 'Amount' },
    { name: 'interestRate', placeholder: 'Interest Rate' },
    { name: 'terms', placeholder: 'Terms' },
    { name: 'description', placeholder: 'Description' },
  ],
  'insurances': [
    { name: 'type', placeholder: 'Type (e.g. CAR)' },
    { name: 'provider', placeholder: 'Provider (e.g. ICICI)' },
    { name: 'coverage', placeholder: 'Coverage Type' },
    { name: 'premium', placeholder: 'Premium' },
    { name: 'validityPeriod', placeholder: 'Validity Period' },
    { name: 'description', placeholder: 'Description' },
  ],
  'job-references': [
    { name: 'companyName', placeholder: 'Company Name' },
    { name: 'contactPerson', placeholder: 'Contact Person' },
    { name: 'email', placeholder: 'Email' },
    { name: 'phone', placeholder: 'Phone' },
  ],
  'legal-services': [
    { name: 'serviceName', placeholder: 'Service Name' },
    { name: 'provider', placeholder: 'Provider' },
    { name: 'cost', placeholder: 'Cost' },
    { name: 'description', placeholder: 'Description' },
  ],
};

// Color themes for each section
const sectionThemes: Record<ApiSection, {primary: string; secondary: string; accent: string}> = {
  'products': {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    secondary: 'bg-purple-100',
    accent: 'text-purple-600'
  },
  'services': {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    secondary: 'bg-blue-100',
    accent: 'text-blue-600'
  },
  'service-providers': {
    primary: 'bg-gradient-to-r from-green-600 to-emerald-600',
    secondary: 'bg-green-100',
    accent: 'text-green-600'
  },
  'car-rental-services': {
    primary: 'bg-gradient-to-r from-yellow-600 to-amber-600',
    secondary: 'bg-yellow-100',
    accent: 'text-yellow-600'
  },
  'loans': {
    primary: 'bg-gradient-to-r from-red-600 to-rose-600',
    secondary: 'bg-red-100',
    accent: 'text-red-600'
  },
  'insurances': {
    primary: 'bg-gradient-to-r from-indigo-600 to-blue-600',
    secondary: 'bg-indigo-100',
    accent: 'text-indigo-600'
  },
  'job-references': {
    primary: 'bg-gradient-to-r from-pink-600 to-fuchsia-600',
    secondary: 'bg-pink-100',
    accent: 'text-pink-600'
  },
  'legal-services': {
    primary: 'bg-gradient-to-r from-teal-600 to-cyan-600',
    secondary: 'bg-teal-100',
    accent: 'text-teal-600'
  },
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<ApiSection>('products');
  const [data, setData] = useState<DataItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const currentTheme = sectionThemes[activeSection];

  useEffect(() => {
    fetchData(activeSection);
  }, [activeSection]);

  const fetchData = async (endpoint: ApiSection) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://ritiktest.site/admin/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
      toast.success(`${endpoint.replace(/-/g, ' ')} data loaded successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionClick = (section: ApiSection) => {
    setActiveSection(section);
    setShowForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `https://ritiktest.site/admin/${activeSection}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('Data submitted successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
      setShowForm(false);
      setFormData({});
      fetchData(activeSection);
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit data. Please check your inputs.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to render data in a table format
  const renderDataTable = () => {
    if (!data || data.length === 0) {
      return (
        <div className={`flex flex-col items-center justify-center p-12 ${currentTheme.secondary} rounded-lg text-gray-600 transform transition-all duration-300`}>
          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm opacity-75 mt-1">Add a new item to get started</p>
        </div>
      );
    }

    const allKeys = Array.from(
      new Set(data.flatMap(item => Object.keys(item)))
    ).filter(key => key !== 'id');
    const keys = ['id', ...allKeys];

    return (
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className={`${currentTheme.primary} text-white`}>
            <tr>
              {keys.map((key) => (
                <th key={key} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {key}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => {
              const itemId = 'id' in item ? item.id : index;
              return (
                <tr 
                  key={itemId} 
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-150`}
                >
                  {keys.map((key) => {
                    const value = (item as any)[key];
                    return (
                      <td key={`${itemId}-${key}`} className="px-6 py-4 text-sm text-gray-700">
                        {value !== undefined ? String(value) : '-'}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className={`${currentTheme.accent} hover:underline mr-3 flex items-center`}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const backgroundStyles = {
    backgroundImage: 'linear-gradient(to right bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.9)), url("https://www.transparenttextures.com/patterns/cubes.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex min-h-screen relative bg-gradient-to-br from-gray-100 to-gray-300">
      <aside className={`w-72 ${currentTheme.primary} text-white p-6 space-y-4 shadow-xl transform transition-all duration-300`}>
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-2 bg-white rounded-lg">
            <svg className={`w-8 h-8 ${currentTheme.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <div className="space-y-1">
          {API_SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => handleSectionClick(section)}
              className={`flex hover:text-black items-center w-full text-left px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all duration-200 ${
                activeSection === section ? 'bg-white text-black bg-opacity-30 font-medium' : ''
              }`}
            >
              <span className="capitalize">{section.replace(/-/g, ' ')}</span>
              {activeSection === section && (
                <span className="ml-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className={`p-4 bg-white bg-opacity-20 rounded-lg text-sm backdrop-blur-sm`}>
            <p className="font-medium mb-1">Need help?</p>
            <p className="opacity-80">Check our documentation or contact support for assistance.</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto text-black" style={backgroundStyles}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className={`text-3xl font-extrabold capitalize bg-clip-text text-transparent bg-gradient-to-r ${currentTheme.primary.replace('bg-', 'from-').replace(' to-', ' to-')}`}>
                {activeSection.replace(/-/g, ' ')}
              </h1>
              <p className="text-gray-600 mt-1">Manage your {activeSection.replace(/-/g, ' ')} data</p>
            </div>
            
            <button
              onClick={() => fetchData(activeSection)}
              className={`${currentTheme.accent} hover:underline flex items-center font-semibold`}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Data
            </button>
          </div>

          {showForm && fieldTemplates[activeSection] && (
            <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 border-t-4 transform transition-all duration-300 hover:shadow-xl" style={{borderColor: currentTheme.primary.replace('bg-gradient-to-r from-', 'rgb(').replace(' to-', ',').replace('-600', ')').replace('-600)', ')')}}>
              <h2 className={`text-xl font-semibold mb-6 flex items-center ${currentTheme.accent}`}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New {activeSection.replace(/-/g, ' ').replace(/s$/, '')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fieldTemplates[activeSection].map((field: FieldTemplate) => (
                    <div key={field.name} className="relative">
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.placeholder}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={handleFormChange}
                        className={`w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-${currentTheme.accent.replace('text-', '')} focus:border-transparent bg-gray-50 transition-all duration-200`}
                        required
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-2 ${currentTheme.primary} text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors duration-200 flex items-center`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                {activeSection.replace(/-/g, ' ')} List
              </h2>
              <div className="text-sm text-gray-500">
                {data.length} {data.length === 1 ? 'item' : 'items'} found
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <div className={`${currentTheme.accent} animate-pulse flex flex-col items-center`}>
                  <svg className="animate-spin h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading data...</span>
                </div>
              </div>
            ) : (
              renderDataTable()
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({});
          }}
          className={`fixed bottom-6 right-6 ${currentTheme.primary} text-white w-16 h-16 rounded-full text-3xl flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200 z-10`}
          aria-label="Add new item"
        >
          {showForm ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          )}
        </button>
      </main>
      <ToastContainer />
    </div>
  );
}