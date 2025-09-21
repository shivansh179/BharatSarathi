import { useState, useEffect } from 'react';

// Define User type
interface Permission {
  id: number;
  name: string;
}
interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}
interface Authority {
  authority: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  aadhaarNumber: string;
  qrCodePath: string | null;
  selfiePath: string;
  token: string | null;
  role: Role;
  createdAt: string;
  modifiedAt: string | null;
  enabled: boolean;
  authorities: Authority[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const response = await fetch('https://bharatsarathi.in/user/get-all-users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'UTC'
    }).format(date);
  }

  const handleViewDetails = (user: User) => setSelectedUser(user);
  const closeModal = () => setSelectedUser(null);

  // Always returns a string, never null!
  const formatImagePath = (path: string | null): string => {
    if (!path) return '/default-qr.png'; // Use a placeholder image in your public folder
    if (path.startsWith('s3://')) {
      return path.replace('s3://', 'https://');
    }
    if (!path.startsWith('http') && !path.startsWith('/')) {
      return `https://bharatsarathi.in/${path}`;
    }
    return path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhaar Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-600">{user.name.charAt(0).toUpperCase()}</span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role.name === 'ADMIN' 
                              ? 'bg-purple-100 text-purple-800' 
                              : user.role.name === 'DRIVER' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* User detail modal */}
              {selectedUser && (
                <div className="fixed inset-0 bg-black text-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b">
                      <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="flex flex-col items-center">
                            <div className="h-48 w-48 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                              <span className="text-gray-600 text-5xl">{selectedUser.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">{selectedUser.name}</h3>
                            <p className="text-gray-600">{selectedUser.email}</p>
                            <div className="mt-4">
                              <p className="text-sm text-gray-500 mb-2 text-center">QR Code</p>
                              <img 
                                className="h-40 w-40 object-cover" 
                                src={formatImagePath(selectedUser.qrCodePath)} 
                                alt="QR Code" 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="md:w-2/3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="text-sm text-gray-500">ID</p>
                              <p className="font-medium">{selectedUser.id}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="text-sm text-gray-500">Aadhaar Number</p>
                              <p className="font-medium">{selectedUser.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="text-sm text-gray-500">Role</p>
                              <p className="font-medium">{selectedUser.role.name}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="text-sm text-gray-500">Created At</p>
                              <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="text-sm text-gray-500">Account Status</p>
                              <p className="font-medium">
                                {selectedUser.enabled ? (
                                  <span className="text-green-600">Active</span>
                                ) : (
                                  <span className="text-red-600">Inactive</span>
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <h4 className="font-semibold text-gray-700 mb-2">Permissions</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedUser.authorities.map((auth, index) => (
                                <span 
                                  key={index} 
                                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                >
                                  {auth.authority}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 p-6 border-t">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
