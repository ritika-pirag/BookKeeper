import React, { useState } from "react";
import "./SystemSettings.css";
import { FaAws } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

const SystemSettings = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [selected2FAMethod, setSelected2FAMethod] = useState("authApp");
  const [provider, setProvider] = useState("aws");

  const providers = [
    { id: "aws", name: "AWS", Icon: FaAws },
    { id: "azure", name: "Azure", Icon: VscAzure },
    { id: "gcp", name: "Google Cloud", Icon: SiGooglecloud },
  ];

  return (
    <div className="container-fluid py-4 px-4 bg-light min-vh-100 mt-4 mt-md-0">
      <h3 className="fw-semibold mb-3 text-primary">System Settings</h3>
      <p className="text-muted mb-4">
        Manage global configurations for your system. Changes apply to all users and modules.
      </p>

      {/* Super Admin Settings */}
      <div className="card rounded-4 shadow-sm border-0 mb-5">
        <div className="card-body">
          <h4 className="mb-4 text-primary">Super Admin Settings</h4>
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">Business Name</label>
              <input type="text" className="form-control" placeholder="Enter your business name" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Logo</label>
              <div
                className="border rounded-4 d-flex flex-column align-items-center justify-content-center p-4 text-center"
                style={{ borderStyle: "dashed", minHeight: 160, background: "#fafafa" }}
              >
                <p className="fw-medium mb-1">Upload a file</p>
                <small className="text-muted mb-2">PNG, JPG, GIF (max 2MB)</small>
                <input type="file" className="form-control" style={{ maxWidth: 250 }} />
              </div>
            </div>
          </div>
          <div className="text-end mt-4">
            <button className="btn btn-success px-4">Save </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card rounded-4 shadow-sm border-0 mb-5">
      <div className="card-body">
        <h4 className="mb-4 text-primary">Security Rules</h4>
        <div className="row g-4">
          {/* 2FA Settings */}
          <div className="col-lg-6">
            <h6 className="mb-3">Two-Factor Authentication (2FA)</h6>
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input form-switch"
                type="checkbox"
                id="2faToggle"
                checked={is2FAEnabled}
                onChange={() => setIs2FAEnabled(!is2FAEnabled)}
              />
              <label className="form-check-label text-warning" htmlFor="2faToggle">
                Enable 2FA
              </label>
            </div>

            {is2FAEnabled && (
              <>
                <p className="mb-2">Select 2FA method:</p>
                {[
                  { id: "authApp", label: "Authenticator app" },
                  { id: "smsBased", label: "SMS-based" },
                  { id: "emailBased", label: "Email-based" },
                ].map((method) => (
                  <div className="form-check mb-2" key={method.id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="2faMethod"
                      id={method.id}
                      value={method.id}
                      checked={selected2FAMethod === method.id}
                      onChange={(e) => setSelected2FAMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor={method.id}>
                      {method.label}
                    </label>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Password Policy */}
          <div className="col-lg-6">
            <h6 className="mb-3">Password Policy</h6>
            <div className="mb-3">
              <label className="form-label">Minimum Length</label>
              <input type="number" className="form-control" defaultValue={8} />
            </div>
            {[
              { id: "specialChar", label: "Require special character" },
              { id: "requireNumber", label: "Require number" },
              { id: "requireUpper", label: "Require uppercase letter" },
            ].map((rule) => (
              <div className="form-check mb-2" key={rule.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={rule.id}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor={rule.id}>
                  {rule.label}
                </label>
              </div>
            ))}
            <div className="mb-2">
              <label className="form-label">Password Expiration (days)</label>
              <input type="number" className="form-control" defaultValue={90} />
              <small className="text-muted">Set to 0 for no expiration</small>
            </div>
          </div>
        </div>

        <div className="text-end mt-4">
          <button className="btn btn-success px-4">Save Security Settings</button>
        </div>
      </div>
    </div>

{/* Cloud Settings */}
<div className="card rounded-4 shadow-sm border-0 mt-5">
  <div className="card-body">
    <h4 className="fw-semibold mb-4 text-primary">Cloud Settings</h4>

    <label className="form-label fw-semibold">Cloud Provider</label>
<div className="row g-3 mb-4">
  {providers.map(({ id, name, Icon }) => (
    <div className="col-md-4" key={id}>
      <div
        className={`border rounded-3 p-4 d-flex flex-column justify-content-center align-items-center text-center h-100 ${
          provider === id ? "border-primary bg-light-subtle" : "border-secondary-subtle"
        }`}
        style={{
          cursor: "pointer",
          transition: "all 0.3s ease",
          borderWidth: provider === id ? "2px" : "1px",
          minHeight: "150px",
        }}
        onClick={() => setProvider(id)}
      >
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Icon size={50} className="text-dark" />
        </div>
        <div className="form-check d-flex justify-content-center align-items-center gap-2">
          <input
            className="form-check-input"
            type="radio"
            name="provider"
            value={id}
            checked={provider === id}
            readOnly
          />
          <label className="form-check-label mb-0">{name}</label>
        </div>
      </div>
    </div>
  ))}
</div>


    <div className="tab-content pt-2">
      {/* AWS Tab */}
      {provider === 'aws' && (
        <div className="tab-pane fade show active">
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">Access Key ID</label>
              <input type="text" className="form-control" placeholder="AWS Access Key" />

              <label className="form-label mt-3">Region</label>
              <select className="form-select">
                <option>Select AWS Region</option>
                <option>us-east-1</option>
                <option>us-west-2</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">S3 Bucket</label>
              <input type="text" className="form-control mb-3" placeholder="S3 Bucket" />

              <label className="form-label">Service Endpoint</label>
              <input type="text" className="form-control" placeholder="https://example.endpoint.com" />
            </div>
          </div>
        </div>
      )}

      {/* Azure Tab */}
      {provider === 'azure' && (
        <div className="tab-pane fade show active">
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">Subscription ID</label>
              <input type="text" className="form-control" placeholder="Azure Subscription ID" />

              <label className="form-label mt-3">Region</label>
              <select className="form-select">
                <option>Select Azure Region</option>
                <option>East US</option>
                <option>West Europe</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Storage Account</label>
              <input type="text" className="form-control mb-3" placeholder="Azure Storage Account" />

              <label className="form-label">Service URL</label>
              <input type="text" className="form-control" placeholder="https://azure.endpoint.com" />
            </div>
          </div>
        </div>
      )}

      {/* GCP Tab */}
      {provider === 'gcp' && (
        <div className="tab-pane fade show active">
          <div className="row g-4">
            <div className="col-md-6">
              <label className="form-label">Project ID</label>
              <input type="text" className="form-control" placeholder="GCP Project ID" />

              <label className="form-label mt-3">Region</label>
              <select className="form-select">
                <option>Select GCP Region</option>
                <option>us-central1</option>
                <option>europe-west1</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Storage Bucket</label>
              <input type="text" className="form-control mb-3" placeholder="GCP Bucket" />

              <label className="form-label">Service Endpoint</label>
              <input type="text" className="form-control" placeholder="https://gcp.endpoint.com" />
            </div>
          </div>
        </div>
      )}
    </div>

    <div className="d-flex justify-content-between mt-4">
      <button className="btn btn-outline-warning">Test Connection</button>
      <button className="btn btn-success px-4">Save Cloud Settings</button>
    </div>
  </div>
</div>



    </div>
  );
};

export default SystemSettings;
