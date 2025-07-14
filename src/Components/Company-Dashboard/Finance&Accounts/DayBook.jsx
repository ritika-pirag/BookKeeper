import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPlusCircle,
  FaSearch,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Daybook.css";

const  Daybook = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editEntry, setEditEntry] = useState(null);
  const [deleteEntry, setDeleteEntry] = useState(null);
  const [entries, setEntries] = useState([
    {
      id: 1,
      reference: "(2565)",
      name: "Electricity Payment",

      description: "	Electricity Bill",
      date: "2024-12-24",
      amount: "500",
      status: "Paid"
    },
    {
      id: 2,
      reference: "(2566)",
      name: "Dictionary Purchase",

      description: "Stationery items for office",
      date: "2024-12-30",
      amount: "50",
      status: "Paid"
    },
    {
      id: 3,
      reference: "(2567)",
      name: "AC Repair Service",

      description: "AC Repair for Office",
      date: "2024-11-27",
      amount: "800",
      status: "Paid"
    },
    {
      id: 4,
      reference: "(2568)",
      name: "Social Media Promotion",

      description: "Social Media Arts Campaign",
      date: "2024-11-18",
      amount: "100",
      status: "Paid"
    },
    {
      id: 5,
      reference: "(2569)",
      name: "Client Meeting",
  
      description: "Travel fee for client meeting",
      date: "2024-11-06",
      amount: "700",
      status: "Paid"
    },
    {
      id: 6,
      reference: "(2564)",
      name: "Team Lunch",

      description: "Team Lunch at Restaurant",
      date: "2024-10-26",
      amount: "1000",
      status: "Paid"
    },
    {
      id: 7,
      reference: "(2561)",
      name: "Business Flight Ticket",
 
      description: "Flight tickets for meetings",
      date: "2024-10-14",
      amount: "1200",
      status: "Paid"
    },
    {
      id: 8,
      reference: "(2562)",
      name: "Chair Purchase",

      description: "Exposure chairs for staff",
      date: "2024-10-03",
      amount: "750",
      status: "Paid"
    },
    
  ]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return "badge bg-success";
      case "Unpaid":
        return "badge bg-warning text-dark";
      case "Overdue":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const handleEdit = (entry) => {
    setEditEntry({...entry});
  };

  const handleDelete = (entry) => {
    setDeleteEntry(entry);
  };

  const confirmDelete = () => {
    setEntries(entries.filter(entry => entry.id !== deleteEntry.id));
    setDeleteEntry(null);
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      id: entries.length + 1,
      reference: `(${Math.floor(1000 + Math.random() * 9000)})`,
      name: form.entryName.value,
      category: form.category.value,
      description: form.description.value,
      date: form.date.value,
      amount: form.amount.value,
      status: form.status.value
    };
    setEntries([...entries, newEntry]);
    form.reset();
    document.getElementById('addEntryModal').querySelector('.btn-close').click();
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedEntry = {
      ...editEntry,
      name: form.entryName.value,
      category: form.category.value,
      description: form.description.value,
      date: form.date.value,
      amount: form.amount.value,
      status: form.status.value
    };
    setEntries(entries.map(entry => entry.id === editEntry.id ? updatedEntry : entry));
    document.getElementById('editEntryModal').querySelector('.btn-close').click();
  };

  return (
    <div className="container-fluid bg-light py-4 px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-4">
        <div>
          <h5 className="fw-bold mb-1">DayBook</h5>
          <p className="text-muted mb-0">Manage Your DayBook</p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button className="btn btn-light border text-danger">
            <FaFilePdf />
          </button>
          <button className="btn btn-light border text-success">
            <FaFileExcel />
          </button>
          <button
            className="btn text-white d-flex align-items-center gap-2"
            style={{ backgroundColor: "#53b2a5 " }}
            data-bs-toggle="modal"
            data-bs-target="#addEntryModal"
          >
            <FaPlusCircle />
            Add DayBook
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 mb-3">
        <div className="input-group flex-grow-1 flex-md-grow-0" style={{ minWidth: "250px" }}>
          
          <input type="text" className="form-control border-start-0" placeholder="Search" />
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2 flex-grow-1 flex-md-grow-0 w-100 w-md-auto">
  

  

        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          <thead className="table-light text-white">
            <tr>
              <th className="px-3 py-3">Reference</th>
              <th>Name</th>

              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-3 py-3">{entry.reference}</td>
                <td>{entry.name}</td>
     
                <td>{entry.description}</td>
                <td>{formatDate(entry.date)}</td>
                <td>${entry.amount}</td>
                <td>
                  <span className={getStatusBadge(entry.status)}>{entry.status}</span>
                </td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn btn-warning btn-sm text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#editEntryModal"
                    onClick={() => handleEdit(entry)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-danger btn-sm text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteEntryModal"
                    onClick={() => handleDelete(entry)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {/* Add Entry Modal - Updated to match your image */}
      <div className="modal fade" id="addEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Add DayBook</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddEntry}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    DayBook Name <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="entryName"
                    required 
                  />
                </div>

                <div className="row mb-3">
               
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Description <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="reference"
                    required 
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="form-control" 
                      name="startDate"
                      required 
                    />
                  </div>
              
                </div>

        
                 <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="reference"
                    required 
                  />
                </div>


              
                <div className="mb-3">
  <label className="form-label fw-semibold">Status</label>
  <input
    type="text"
    className="form-control"
    name="status"
    placeholder="Enter status (e.g. Paid, Unpaid)"
  />
</div>


                <div className="d-flex justify-content-end gap-3 mt-4">
                  <button type="button" className="btn btn-outline-secondary px-4" data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning text-white px-4"      style={{ backgroundColor: "#53b2a5 " }}>
                    Add DayBook
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Entry Modal */}
      <div className="modal fade" id="editEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Edit Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {editEntry && (
                <form onSubmit={handleUpdateEntry}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="entryName"
                      defaultValue={editEntry.name}
                      required 
                    />
                  </div>

                         <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea 
                      className="form-control" 
                      rows="3" 
                      name="description"
                      defaultValue={editEntry.description}
                    ></textarea>
                  </div>


                  <div className="mb-3">
                    <label className="form-label fw-semibold">Category <span className="text-danger">*</span></label>
                    <select className="form-select" name="category" defaultValue={editEntry.category} required>
                      <option value="Volume">Utilities</option>
                      <option value="Office Supplier">Office Suplies</option>
                  
                    </select>
                  </div>

           
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Date <span className="text-danger">*</span></label>
                      <input 
                        type="date" 
                        className="form-control" 
                        name="date"
                        defaultValue={editEntry.date}
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Amount ($) <span className="text-danger">*</span></label>
                      <input 
                        type="number" 
                        className="form-control" 
                        name="amount"
                        defaultValue={editEntry.amount}
                        min="0"
                        step="0.01"
                        required 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Status <span className="text-danger">*</span></label>
                    <select className="form-select" name="status" defaultValue={editEntry.status} required>
                      <option value="Paid">Approved</option>
                      <option value="Unpaid">Pending</option>
                   
                    </select>
                  </div>

                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button type="button" className="btn btn-outline-secondary px-4" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning text-white px-4" style={{ backgroundColor: "#FFA646" }}>
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Entry Modal */}
      <div className="modal fade" id="deleteEntryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0" style={{ borderRadius: "16px" }}>
            <div className="modal-body text-center py-4">
              <div className="mx-auto mb-3 d-flex align-items-center justify-content-center" 
                   style={{ width: "70px", height: "70px", background: "#FFF5F2", borderRadius: "50%" }}>
                <FaTrash size={32} color="#F04438" />
              </div>
              <h4 className="fw-bold mb-2">Delete Entry</h4>
              <p className="mb-4" style={{ color: "#555", fontSize: "1.08rem" }}>
                Are you sure you want to delete this entry?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-dark px-4 py-2" data-bs-dismiss="modal">
                  No, Cancel
                </button>
                <button 
                  className="btn px-4 py-2" 
                  style={{ background: "#FFA646", color: "#fff", fontWeight: "600" }}
                  onClick={confirmDelete}
                  data-bs-dismiss="modal"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daybook;