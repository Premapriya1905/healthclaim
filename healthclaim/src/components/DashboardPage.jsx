import React, { useState, useEffect } from 'react';
import { 
  Home, FileText, Eye, BarChart2, Calendar, Users, Database, Shield, Settings, User,
  Bell, LogOut, CheckCircle, Clock, X, Search, Filter, Download, Activity, ChevronDown, ChevronRight, AlertCircle
} from 'lucide-react';

const DashboardPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'review', label: 'Review', icon: Eye },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const fetchClaims = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/v1/claims');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch claims: ${response.status}`);
      }
      
      const result = await response.json();
      const claimsData = result.data || [];
      
      if (!Array.isArray(claimsData)) {
        throw new Error('API response data is not an array');
      }
      
      setClaims(claimsData);
      
    } catch (err) {
      setError(err.message);
      setClaims([]);
      console.error('Error fetching claims:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  // Status helpers
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'processing': return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'failed': return <X className="w-4 h-4 text-red-500" />;
      case 'rejected': return <X className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded text-xs font-medium";
    switch (status?.toLowerCase()) {
      case 'completed': return `${base} bg-green-100 text-green-800`;
      case 'pending': return `${base} bg-orange-100 text-orange-800`;
      case 'processing': return `${base} bg-blue-100 text-blue-800`;
      case 'failed': return `${base} bg-red-100 text-red-800`;
      case 'rejected': return `${base} bg-red-100 text-red-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  // Data calculations
  const stats = {
    total: claims.length,
    completed: claims.filter(c => c.status?.toLowerCase() === 'completed').length,
    pending: claims.filter(c => c.status?.toLowerCase() === 'pending').length,
    processing: claims.filter(c => c.status?.toLowerCase() === 'processing').length,
    failed: claims.filter(c => c.status?.toLowerCase() === 'failed').length,
    rejected: claims.filter(c => c.status?.toLowerCase() === 'rejected').length,
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.fileName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status?.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (claim) => {
    setSelectedClaim(claim);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClaim(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Modal */}
      {showModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Execution Details</h3>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase">Execution ID</span>
                  <p className="text-sm text-gray-900 mt-1 break-all">{selectedClaim.id}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase">File Name</span>
                  <p className="text-sm text-gray-900 mt-1">{selectedClaim.fileName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase">File Type</span>
                  <p className="text-sm text-gray-900 mt-1">{selectedClaim.fileType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase">Start Time</span>
                  <p className="text-sm text-gray-900 mt-1">{selectedClaim.startTime}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase">End Time</span>
                  <p className="text-sm text-gray-900 mt-1">{selectedClaim.endTime || '—'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase">Review Status</span>
                  <div className="mt-1">
                    <span className={getStatusBadge(selectedClaim.reviewStatus)}>
                      {selectedClaim.reviewStatus}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 uppercase">Environment</span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedClaim.environment === 'Prod' 
                        ? 'bg-black text-white'
                        : selectedClaim.environment === 'Dev'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-800 text-white'
                    }`}>
                      {selectedClaim.environment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm transition-all duration-300 flex flex-col border-r border-gray-100`}>
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          {!sidebarCollapsed && (
            <h1 className="text-lg font-semibold text-gray-900">Monitor</h1>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">User</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 text-sm">Select workflow</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-6">
                <span className="text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-2">Dashboard</span>
                <span className="text-sm text-gray-500 pb-2">Table</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Document AI</span>
              <span className="text-sm text-gray-500">Review</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {/* Executions Overview */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Executions overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Pending</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">32</div>
                    <div className="text-sm text-gray-500">Files queued</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Completed</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">85</div>
                    <div className="text-sm text-gray-500">Files succeeded</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">Rejected</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">9</div>
                    <div className="text-sm text-gray-500">Files failed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Executions Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <h3 className="text-base font-medium text-gray-900">Executions table</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Production</span>
                    <span>|</span>
                    <span>ID</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Last updated</span>
                  <span>Thu, 15 Feb 2024 at 8:14 CST</span>
                  <button className="p-1">
                    <div className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Table Content */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Activity className="w-6 h-6 animate-spin text-gray-400" />
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <X className="w-6 h-6 text-red-500" />
                <span className="ml-3 text-red-600">{error}</span>
              </div>
            ) : (
              <>
                <div className="">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase truncate">Execution ID</th>
                        <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Name</th>
                        <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Type</th>
                        <th className="w-36 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Time</th>
                        <th className="w-36 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Time</th>
                        <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Review Status</th>
                        <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Environment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {paginatedClaims.map((claim) => (
                        <tr 
                          key={claim.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(claim)}
                        >
                          {console.log(claim)}
                          <td className="w-24 px-4 py-3 text-sm text-gray-900 truncate" title={claim.execution_id}>
                            {claim.execution_id}
                          </td>
                          <td className="w-32 px-4 py-3 text-sm text-gray-900 truncate" title={claim.fileName}>
                            {claim.fileName}
                          </td>
                          <td className="w-24 px-4 py-3 text-sm text-gray-500 truncate">
                            {claim.fileType}
                          </td>
                          <td className="w-36 px-4 py-3 text-sm text-gray-500 truncate">
                            {claim.startTime}
                          </td>
                          <td className="w-36 px-4 py-3 text-sm text-gray-500 truncate">
                            {claim.endTime || '—'}
                          </td>
                          <td className="w-32 px-4 py-3">
                            <span className={getStatusBadge(claim.status)}>
                              {claim.review_status}
                            </span>
                          </td>
                          <td className="w-24 px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              claim.environment === 'Prod' 
                                ? 'bg-black text-white'
                                : claim.environment === 'Dev'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-800 text-white'
                            }`}>
                              {claim.environment}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        disabled={page === '...'}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : page === '...'
                            ? 'text-gray-400 cursor-default'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;