// import React, { useState } from "react";
// import { FaEye, FaPrint } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// const Ledger = () => {
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [searchText, setSearchText] = useState("");

//   const transactions = [
//     {
//       date: "2025-06-20",
//       voucherType: "Invoice",
//       voucherNo: "INV-2025-001",
//       particulars: "Sales to ABC Ltd",
//       debit: "",
//       credit: "50000",
//       balance: "50000 Cr",
//       narration: "Invoice raised for sale of goods",
//     },
//     {
//       date: "2025-06-15",
//       voucherType: "Payment",
//       voucherNo: "PAY-2025-001",
//       particulars: "Payment received from ABC Ltd",
//       debit: "20000",
//       credit: "",
//       balance: "30000 Cr",
//       narration: "Partial payment received",
//     },
//     {
//       date: "2025-06-10",
//       voucherType: "Credit Note",
//       voucherNo: "CN-2025-001",
//       particulars: "Credit note issued for return",
//       debit: "5000",
//       credit: "",
//       balance: "25000 Cr",
//       narration: "Goods returned by customer",
//     },
//     {
//       date: "2025-06-01",
//       voucherType: "Invoice",
//       voucherNo: "INV-2025-002",
//       particulars: "Sales to XYZ Pvt Ltd",
//       debit: "",
//       credit: "40000",
//       balance: "65000 Cr",
//       narration: "Invoice for bulk sales",
//     },
//   ];

//   const filtered = transactions.filter((t) => {
//     const tDate = new Date(t.date);
//     const from = fromDate ? new Date(fromDate) : null;
//     const to = toDate ? new Date(toDate) : null;
//     const matchDate = (!from || tDate >= from) && (!to || tDate <= to);

//     const s = searchText.toLowerCase();
//     const matchSearch =
//       t.voucherNo.toLowerCase().includes(s) ||
//       t.particulars.toLowerCase().includes(s) ||
//       t.voucherType.toLowerCase().includes(s) ||
//       t.narration.toLowerCase().includes(s);

//     return matchDate && matchSearch;
//   });

//   return (
//     <div className="mt-3 p-2">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 mb-3">
//         <div>
//           <h5 className="fw-bold mb-1">Ledger Summary</h5>
//           <p className="text-muted mb-0">Tally-style Debit/Credit Ledger View</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
//         <div>
//           <label className="form-label mb-1">From Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="form-label mb-1">To Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </div>
//         <div className="flex-grow-1">
//           <label className="form-label mb-1">Search</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by voucher no, type, narration..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Ledger Table */}
//       <div className="table-responsive">
//         <table className="table table-bordered text-center align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Date</th>
//               <th>Voucher Type</th>
//               <th>Voucher No</th>
//               <th>Particulars</th>
//               <th>Debit (₹)</th>
//               <th>Credit (₹)</th>
//               <th>Balance</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length > 0 ? (
//               filtered.map((t, i) => (
//                 <tr key={i}>
//                   <td>{t.date}</td>
//                   <td>{t.voucherType}</td>
//                   <td>{t.voucherNo}</td>
//                   <td className="text-start">{t.particulars}</td>
//                   <td className="text-danger">{t.debit}</td>
//                   <td className="text-success">{t.credit}</td>
//                   <td>{t.balance}</td>
//                   <td className="d-flex justify-content-center gap-1">
//                     <button
//                       className="btn btn-sm btn-outline-info"
//                       data-bs-toggle="modal"
//                       data-bs-target="#ledgerDetailModal"
//                       onClick={() => setSelectedTransaction(t)}
//                     >
//                       <FaEye />
//                     </button>
//                     <button className="btn btn-sm btn-outline-warning">
//                       <FaPrint />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center text-muted py-3">
//                   No entries found for the selected filter.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="d-flex justify-content-between align-items-center mt-3 px-3">
//         <span className="small text-muted">
//           Showing {filtered.length} entries
//         </span>
//         <ul className="pagination pagination-sm mb-0">
//           <li className="page-item disabled">
//             <button className="page-link">&laquo;</button>
//           </li>
//           <li className="page-item active">
//             <button className="page-link">1</button>
//           </li>
//           <li className="page-item">
//             <button className="page-link">2</button>
//           </li>
//           <li className="page-item">
//             <button className="page-link">&raquo;</button>
//           </li>
//         </ul>
//       </div>

//       {/* Modal: Ledger Detail */}
//       <div
//         className="modal fade"
//         id="ledgerDetailModal"
//         tabIndex="-1"
//         aria-labelledby="ledgerDetailModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title fw-bold">Voucher Details</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               {selectedTransaction && (
//                 <table className="table table-bordered">
//                   <tbody>
//                     <tr>
//                       <td className="fw-semibold">Date</td>
//                       <td>{selectedTransaction.date}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Voucher Type</td>
//                       <td>{selectedTransaction.voucherType}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Voucher No</td>
//                       <td>{selectedTransaction.voucherNo}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Particulars</td>
//                       <td>{selectedTransaction.particulars}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Narration</td>
//                       <td>{selectedTransaction.narration}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Debit</td>
//                       <td className="text-danger">{selectedTransaction.debit}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Credit</td>
//                       <td className="text-success">{selectedTransaction.credit}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Balance</td>
//                       <td>{selectedTransaction.balance}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Ledger;




import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";

const parties = [
  { id: "cust123", name: "ABC Ltd", type: "Customer" },
  { id: "supp456", name: "Supply One", type: "Supplier" },
  { id: "cust789", name: "XYZ Pvt Ltd", type: "Customer" }
];

const Ledger = () => {
  const [selectedParty, setSelectedParty] = useState(null);
  const [ledgerData, setLedgerData] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: ""
  });

  const handlePartyChange = (e) => {
    const id = e.target.value;
    const party = parties.find((p) => p.id === id);
    setSelectedParty(party || null);
  };

  const fetchLedger = () => {
    if (!selectedParty || !dateRange.from || !dateRange.to) return;

    // 🔁 Replace with API call
    const dummyLedger = [
      { date: "2024-01-01", voucher: "Sale #1001", debit: 500, credit: 0 },
      { date: "2024-01-05", voucher: "Payment", debit: 0, credit: 300 },
      { date: "2024-01-10", voucher: "Sale #1002", debit: 400, credit: 0 }
    ];
    setLedgerData(dummyLedger);
  };

  const getBalance = () => {
    let totalDr = 0, totalCr = 0;
    ledgerData.forEach((entry) => {
      totalDr += entry.debit;
      totalCr += entry.credit;
    });
    const closing = totalDr - totalCr;
    return {
      totalDr,
      totalCr,
      closing
    };
  };

  const { totalDr, totalCr, closing } = getBalance();

  return (
    <div className="py-4 px-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Card className="p-4 w-100" style={{ backgroundColor: "#fff", borderRadius: 8 }}>
        <h5 style={{ color: "#002d4d", marginBottom: 24 }}>Ledger Report</h5>

        {/* 🔎 Filter Section */}
        <Row className="mb-3">
          <Form.Label column sm={2}>Party</Form.Label>
          <Col sm={4}>
            <Form.Select onChange={handlePartyChange}>
              <option value="">Select Customer/Supplier</option>
              {parties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.type})
                </option>
              ))}
            </Form.Select>
          </Col>

          <Form.Label column sm={1}>From</Form.Label>
          <Col sm={2}>
            <Form.Control
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            />
          </Col>

          <Form.Label column sm={1}>To</Form.Label>
          <Col sm={2}>
            <Form.Control
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            />
          </Col>
        </Row>

        {/* 🔘 Load Report */}
        <div className="text-end mb-3">
          <Button variant="primary" onClick={fetchLedger}>
            Load Ledger
          </Button>
        </div>

        {/* 📊 Table */}
        {selectedParty && ledgerData.length > 0 && (
          <>
            <h6 style={{ marginBottom: 12, color: "#444" }}>
              Ledger Report for: <strong>{selectedParty.name}</strong> ({selectedParty.type})
            </h6>

            <Table bordered striped hover responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Voucher</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {ledgerData.map((entry, index) => {
                  const balance = ledgerData
                    .slice(0, index + 1)
                    .reduce((acc, val) => acc + val.debit - val.credit, 0);
                  return (
                    <tr key={index}>
                      <td>{entry.date}</td>
                      <td>{entry.voucher}</td>
                      <td>{entry.debit || "-"}</td>
                      <td>{entry.credit || "-"}</td>
                      <td>{balance}</td>
                    </tr>
                  );
                })}
                <tr style={{ backgroundColor: "#eef" }}>
                  <td colSpan={2}><strong>Total</strong></td>
                  <td><strong>{totalDr}</strong></td>
                  <td><strong>{totalCr}</strong></td>
                  <td><strong>{closing}</strong></td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Card>
    </div>
  );
};

export default Ledger;
