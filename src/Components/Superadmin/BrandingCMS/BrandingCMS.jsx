import React, { useState, useEffect } from 'react';

const BrandingCMS = () => {
  // Default data structure
  const defaultData = {
    helpContent: '',
    announcement: '',
    logoPreview: null,
    announcements: [
      {
        id: 1,
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM EST',
        priority: 'Normal',
        status: 'Scheduled',
        date: '6 hours ago'
      }
    ],
    changes: [
      {
        id: 1,
        type: 'Logo Update',
        description: 'Platform logo updated',
        status: 'Published',
        date: '2 hours ago'
      },
      {
        id: 2,
        type: 'Color Theme',
        description: 'Primary color changed to blue',
        status: 'Active',
        date: '4 hours ago'
      }
    ]
  };

  // Load saved data from localStorage or use defaults
  const loadData = () => {
    try {
      const savedData = localStorage.getItem('platformSettings');
      return savedData ? JSON.parse(savedData) : defaultData;
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
      return defaultData;
    }
  };

  const [data, setData] = useState(loadData());
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    message: '',
    priority: 'Normal',
    schedule: ''
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('platformSettings', JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
    }
  }, [data]);

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedData = {
          ...data,
          logoPreview: e.target?.result,
          changes: [
            {
              id: Date.now(),
              type: 'Logo Update',
              description: 'Platform logo updated',
              status: 'Published',
              date: 'Just now'
            },
            ...data.changes
          ]
        };
        setData(updatedData);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setData({
      ...data,
      logoPreview: null,
      changes: [
        {
          id: Date.now(),
          type: 'Logo Update',
          description: 'Platform logo removed',
          status: 'Published',
          date: 'Just now'
        },
        ...data.changes
      ]
    });
  };

  const saveHelpContent = () => {
    setData({
      ...data,
      changes: [
        {
          id: Date.now(),
          type: 'Help Content',
          description: 'Help documentation updated',
          status: 'Published',
          date: 'Just now'
        },
        ...data.changes
      ]
    });
    setShowHelpModal(false);
  };

  const saveAnnouncement = () => {
    const announcement = {
      id: Date.now(),
      title: newAnnouncement.title,
      message: newAnnouncement.message,
      priority: newAnnouncement.priority,
      status: 'Published',
      date: 'Just now'
    };

    setData({
      ...data,
      announcement: newAnnouncement.message,
      announcements: [announcement, ...data.announcements],
      changes: [
        {
          id: Date.now(),
          type: 'Announcement',
          description: `New announcement: ${newAnnouncement.title}`,
          status: 'Published',
          date: 'Just now'
        },
        ...data.changes
      ]
    });

    setNewAnnouncement({
      title: '',
      message: '',
      priority: 'Normal',
      schedule: ''
    });
    setShowAnnouncementModal(false);
  };

  return (
    <div className="">

      <div className="mb-4">
        <h1 className="h2 mb-1 mb-md-2">BrandingCMS</h1>
      </div>
      {/* Main Contenin-vh-100 bg-lightt */}
      <main className="">
        <div className="row g-4">
          {/* Platform Logo Upload */}
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="card-title mb-1">Platform Logo</h5>
                    <p className="card-text text-muted small">Upload your brand logo for the platform</p>
                  </div>
                  <i className="fas fa-image text-primary fs-5"></i>
                </div>
                <div className="border border-2 border-dashed rounded p-4 text-center">
                  {data.logoPreview ? (
                    <img src={data.logoPreview} alt="Logo Preview" className="img-fluid" style={{ maxHeight: '100px' }} />
                  ) : (
                    <div>
                      <i className="fas fa-cloud-upload-alt text-muted fs-3 mb-2"></i>
                      <p className="text-muted mb-1">Drop your logo here or click to browse</p>
                      <p className="text-muted small">Supports PNG, JPG up to 2MB</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="d-none"
                  id="logo-upload"
                />
                <div className="d-flex gap-3 mt-3">
                  <label
                    htmlFor="logo-upload"
                    className="btn btn-primary flex-grow-1"
                  >
                    Choose File
                  </label>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={removeLogo}
                    disabled={!data.logoPreview}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Help Center Editor */}
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="card-title mb-1">Help Center</h5>
                    <p className="card-text text-muted small">Edit help documentation and FAQs</p>
                  </div>
                  <i className="fas fa-question-circle text-primary fs-5"></i>
                </div>
                <div className="border rounded p-3 bg-light">
                  <p className="text-muted small mb-0">
                    {data.helpContent || (
                      <>
                        Welcome to our platform! Here you can find answers to common questions.
                        <br />
                        Click "Edit Content" to customize this section.
                      </>
                    )}
                  </p>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => setShowHelpModal(true)}
                  >
                    <i className="fas fa-edit me-2"></i>
                    Edit Content
                  </button>
                  <button className="btn btn-outline-secondary">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Announcement Editor */}
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h5 className="card-title mb-1">Announcements</h5>
                    <p className="card-text text-muted small">Create and manage platform announcements</p>
                  </div>
                  <i className="fas fa-bullhorn text-primary fs-5"></i>
                </div>
                {data.announcements.length > 0 ? (
                  <div className="border rounded p-3 bg-warning bg-opacity-10 border-warning mb-3">
                    <div className="d-flex gap-3">
                      <i className="fas fa-info-circle text-warning mt-1"></i>
                      <div>
                        <p className="small fw-medium text-warning mb-1">{data.announcements[0].title}</p>
                        <p className="small text-warning mb-0">
                          {data.announcements[0].message}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded p-3 bg-light mb-3">
                    <p className="text-muted small mb-0">No active announcements</p>
                  </div>
                )}
                <div className="d-flex gap-3 mt-3">
                  <button
                    className="btn btn-primary flex-grow-1"
                    onClick={() => setShowAnnouncementModal(true)}
                  >
                    <i className="fas fa-plus me-2"></i>
                    New Announcement
                  </button>
                  <button className="btn btn-outline-secondary">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Changes */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Recent Changes</h5>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th className="small text-muted fw-normal">TYPE</th>
                    <th className="small text-muted fw-normal">DESCRIPTION</th>
                    <th className="small text-muted fw-normal">STATUS</th>
                    <th className="small text-muted fw-normal">DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.changes.map((change) => (
                    <tr key={change.id}>
                      <td className="small">{change.type}</td>
                      <td className="small text-muted">{change.description}</td>
                      <td>
                        <span className={`badge ${change.status === 'Published' ? 'bg-success' :
                            change.status === 'Active' ? 'bg-primary' : 'bg-warning'
                          }`}>
                          {change.status}
                        </span>
                      </td>
                      <td className="small text-muted">{change.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Help Editor Modal */}
      {showHelpModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Help Center Content</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowHelpModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fas fa-bold"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fas fa-italic"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fas fa-underline"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fas fa-list-ul"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="fas fa-link"></i>
                    </button>
                  </div>
                </div>
                <textarea
                  value={data.helpContent}
                  onChange={(e) => setData({ ...data, helpContent: e.target.value })}
                  className="form-control mb-3"
                  rows={10}
                  placeholder="Enter help center content..."
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={saveHelpContent}
                >
                  Save Changes
                </button>
                <button className="btn btn-outline-secondary">
                  Preview
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowHelpModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Announcement</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAnnouncementModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    placeholder="Enter announcement title"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                    placeholder="Enter announcement message..."
                  />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      value={newAnnouncement.priority}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Schedule</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={newAnnouncement.schedule}
                      onChange={(e) => setNewAnnouncement({ ...newAnnouncement, schedule: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={saveAnnouncement}
                >
                  Publish Now
                </button>
                <button className="btn btn-outline-secondary">
                  Save Draft
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowAnnouncementModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandingCMS;