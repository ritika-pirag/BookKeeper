import React, { useState } from 'react';

const ActivityLogs = () => {
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [searchQuery, setSearchQuery] = useState('');

  const activityData = [
    {
      id: 1,
      roleName: 'Admin',
      action: 'Created new product listing',
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      roleName: 'Manager',
      action: 'Updated inventory levels',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      roleName: 'Staff',
      action: 'Processed customer order',
      timestamp: '6 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      roleName: 'Admin',
      action: 'Modified user permissions',
      timestamp: '8 hours ago',
      status: 'completed'
    },
    {
      id: 5,
      roleName: 'Manager',
      action: 'Generated sales report',
      timestamp: '10 hours ago',
      status: 'completed'
    },
    {
      id: 6,
      roleName: 'Staff',
      action: 'Updated customer information',
      timestamp: '12 hours ago',
      status: 'completed'
    },
    {
      id: 7,
      roleName: 'Admin',
      action: 'Configured system settings',
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: 8,
      roleName: 'Manager',
      action: 'Approved discount campaign',
      timestamp: '1 day ago',
      status: 'completed'
    }
  ];

  const roleOptions = ['All Roles', 'Admin', 'Manager', 'Staff'];
  const userOptions = ['All Users', 'Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Brown'];

  // Filter activities based on selected filters
  const filteredActivities = activityData.filter(activity => {
    const matchesRole = selectedRole === 'All Roles' || activity.roleName === selectedRole;
    const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="">
      {/* Header Section */}
      <div className="border-bottom">
        <h1 className="h2 mb-1 mb-md-2">Activity Logs</h1>
        <p className="text-muted mb-0">Track and monitor all system activities and user actions.</p>
      </div>

      {/* Main Content */}
      <div className="">
        {/* Filter Section */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <label className="form-label">Filter by Role:</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="form-select"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Filter by User:</label>
                <select 
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="form-select"
                >
                  {userOptions.map((user) => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Search activities:</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search activities..."
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="cursor-pointer">
                    <div className="d-flex align-items-center">
                      <span>Role Name</span>
                      <i className="fas fa-sort ms-2 text-muted"></i>
                    </div>
                  </th>
                  <th scope="col" className="cursor-pointer">
                    <div className="d-flex align-items-center">
                      <span>Action</span>
                      <i className="fas fa-sort ms-2 text-muted"></i>
                    </div>
                  </th>
                  <th scope="col" className="cursor-pointer">
                    <div className="d-flex align-items-center">
                      <span>Timestamp</span>
                      <i className="fas fa-sort ms-2 text-muted"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity) => (
                  <tr key={activity.id} className="cursor-pointer">
                    <td>
                      <span className={`badge ${
                        activity.roleName === 'Admin' ? 'bg-primary' :
                        activity.roleName === 'Manager' ? 'bg-success' :
                        'bg-secondary'
                      }`}>
                        <i className={`fas ${
                          activity.roleName === 'Admin' ? 'fa-user-shield' :
                          activity.roleName === 'Manager' ? 'fa-user-tie' :
                          'fa-user'
                        } me-2`}></i>
                        {activity.roleName}
                      </span>
                    </td>
                    <td className="fw-semibold">{activity.action}</td>
                    <td>
                      <i className="fas fa-clock me-2 text-muted"></i>
                      {activity.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">8</span> of{' '}
                <span className="fw-semibold">24</span> results
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary">
                  <i className="fas fa-chevron-left me-1"></i>
                  Previous
                </button>
                <button className="btn btn-primary">1</button>
                <button className="btn btn-outline-secondary">2</button>
                <button className="btn btn-outline-secondary">3</button>
                <button className="btn btn-outline-secondary">
                  Next
                  <i className="fas fa-chevron-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;