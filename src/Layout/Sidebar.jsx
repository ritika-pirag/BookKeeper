import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './Sidebar.css';

const Sidebar = ({ isMobile, onLinkClick }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleCloseSidebar = () => {
    const sidebar = document.getElementById('mobileSidebar');
    const offcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
    if (offcanvas) {
      offcanvas.hide();
    }
  };

  const handleMenuClick = (path) => {
    setActivePath(path);
    if (isMobile) {
      const offcanvasElement = document.getElementById('mobileSidebar');
      const offcanvasInstance = window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      if (offcanvasInstance) offcanvasInstance.hide();
    }

    if (onLinkClick) onLinkClick();
  };

  const navItem = (to, icon, label) => (
    <li className="nav-item" key={to}>
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`nav-link d-flex align-items-center sidebar-link px-3 py-2 ${activePath === to ? "active-link" : ""}`}
      >
        <i className={`me-2 ${icon}`}></i> {label}
      </Link>
    </li>
  );

  // 👇 Role-based menu setup
  const getMenuItems = () => {
    switch (role) {
      case "SuperAdmin":
        return (
          <>
            {navItem("/dashboard", "fas fa-th-large", "Dashboard")}
            {navItem("/superadmin/company", "fas fa-store", "Company")}
            {navItem("/superadmin/companydetails", "fas fa-users-cog", "Company Details")}
            {navItem("/superadmin/planpricing", "fas fa-industry", "Plans & Pricing")}
            {navItem("/superadmin/requestplan", "fas fa-boxes-stacked", "Request Plan")}
            {navItem("/superadmin/payments", "fas fa-chart-line", "payments")}
            {navItem("/superadmin/setting", "fas fa-sliders-h", " System Settings")}
          </>
        );
      case "Company":
        return (
          <>
            {/* Admin Dashboard Section */}
            <h6 className="text-white small fw-bold text-start ">Admin Dashboard</h6>


            <ul className="list-unstyled  ">
              {navItem("/company/dashboard", "fas fa-tachometer-alt", "Dashboard")}
            </ul>

            {/* Inventory Section */}
            <h6 className="text-white small fw-bold text-start">Inventory</h6>

            <ul className="list-unstyled">
              {navItem("/company/productdetails", "fas fa-box-open", "Products Details")}
              {navItem("/company/batchandexpriry", "fas fa-cubes", "Batch&Expiry")}
              {navItem("/company/managestock", "fas fa-warehouse", "Manage Stock")}
              {navItem("/company/lowstock", "fas fa-exclamation-triangle", "Low Stock")}
              {navItem("/company/printbarcode", "fas fa-barcode", "Print Barcode")}
            </ul>

            {/* Sales Section */}
            <h6 className="text-white small fw-bold text-start">Sales</h6>
            <ul className="list-unstyled">
              {navItem("/company/invoice", "fas fa-file-invoice", "Invoices")}
              {navItem("/company/salesreturn", "fas fa-undo", "Sales Return")}
            </ul>

            {/* Payments Section */}
            <h6 className="text-white small fw-bold text-start">Payments</h6>
            <ul className="list-unstyled">
              {navItem("/company/coupons", "fas fa-ticket-alt", "Coupons")}
              {navItem("/company/accountstatement", "fas fa-receipt", "Account Statement")}
            </ul>


            {/* GST Filing */}
            <h6 className="text-white small fw-bold text-start">GST Filing</h6>
            <ul className="list-unstyled">
              {navItem("/company/taxreport", "fas fa-file-alt", "Tax Report")}
              {navItem("/company/qrinvoice", "fas fa-th", "QR Invoice")}
              {navItem("/company/gstreturns", "fas fa-th", "GST Returns")}
              {navItem("/company/tdstcs", "fas fa-th", "TDS/TCS")}
              {navItem("/company/itcreport", "fas fa-th", "ITC Report")}
              {navItem("/company/ewaybill", "fas fa-th", "e-Way Bill")}
            </ul>

            {/* Purchases */}
            <h6 className="text-white small fw-bold text-start">Purchases</h6>
            <ul className="list-unstyled">
              {navItem("/company/purchaseinvoice", "fas fa-file-alt", "Purchase Invoice")}
              {navItem("/company/purchasereturn", "fas fa-file-alt", "Purchase Return")}
            </ul>

            {/* Finance & Accounts */}
            <h6 className="text-white small fw-bold text-start">Finance & Accounts</h6>
            <ul className="list-unstyled">
              {navItem("/company/daybook", "fas fa-book", "DayBook")}
              {navItem("/company/journalentries", "fas fa-clipboard-list", "Journal Entries")}
              {navItem("/company/ledger", "fas fa-book-open", "Ledger")}
              {/* {navItem("/company/trialbalance", "fas fa-info-circle", "Trial Balance")}  */}
            </ul>


            {/* Reports */}
            <h6 className="text-white small fw-bold text-start">Reports</h6>
            <ul className="list-unstyled">
              {navItem("/company/balancesheet", "fas fa-search", "Balance Sheet")}
              {navItem("/company/cashflow", "fas fa-search", "Cash Flow")}
              {navItem("/company/profitloss", "fas fa-stopwatch", "Profit & Loss")}
            </ul>

            {/* User Management */}
            <h6 className="text-white small fw-bold text-start">User Management</h6>
            <ul className="list-unstyled">
              {navItem("/company/users", "fas fa-user-friends", "Users")}
              {navItem("/company/rolespermissions", "fas fa-link", "Roles & Permissions")}
              {navItem("/company/deleteaccountrequests", "fas fa-trash", "Delete Account Request")}
            </ul>

            {/* Settings */}
            <h6 className="text-white small fw-bold text-start">Settings</h6>
            <ul className="list-unstyled">
              {navItem("/company/companyinfo", "fas fa-globe", "Company Info")}

            </ul>

          </>
        );


      case "Salesperson":
        return (
          <>
            {navItem("/salesperson/salespersondashboard", "fas fa-tachometer-alt", "Dashboard")}
            {navItem("/salesperson/salespersonorder", "fas fa-shopping-cart", "Order Management")}
            {navItem("/inventorymanagement", "fas fa-boxes", "logistics")}
            {navItem("/salesperson/salespersoncustomerinfo", "fas fa-user-friends", "Customer Information")}

          </>
        );



      case "User":
        return (
          <>
            {/* Dashboard */}
            <h6 className="text-white small fw-bold text-start mt-3 mb-2">User Dashboard</h6>
            <ul className="list-unstyled mb-3">
              {navItem("/user/dashboard", "fas fa-th-large", "Dashboard")}
            </ul>

            {/* Inventory */}
            <h6 className="text-white small fw-bold text-start mb-2">Inventory</h6>
            <ul className="list-unstyled mb-3">
              {navItem("/user/products", "fas fa-cube", "Products")}
              {navItem("/user/manageproduct", "fas fa-table", "Manage Product")}
            </ul>

            {/* Sales */}
            <h6 className="text-white small fw-bold text-start mb-2">Sales</h6>
            <ul className="list-unstyled mb-3">

              {navItem("/user/invoices", "fas fa-file-alt", "Invoices")}
              {navItem("/user/pos", "fas fa-desktop", "POS")}
              {navItem("/user/onlineorders", "fas fa-shopping-cart", "Online Orders")}
              {/* {navItem("/user/posorders", "fas fa-desktop", "POS Orders")} */}
              {navItem("/user/estimates", "fas fa-file-invoice-dollar", "Estimates")}
              {navItem("/user/deliverychallans", "fas fa-truck", "Delivery Challans")}
            </ul>

        {/* Purchases */}
<h6 className="text-white small fw-bold text-start mb-2">Purchases</h6>
<ul className="list-unstyled mb-3">
  {navItem("/user/purchaseorder", "fas fa-file-alt", "Purchase Order")}
  {navItem("/user/expense", "fas fa-wallet", "Expense")}
  {navItem("/user/invoice", "fas fa-file-invoice", "Invoice")}
  {navItem("/user/paymentmode", "fas fa-credit-card", "Payment Mode")}
</ul>


            {/* Finance & Accounts */}
            <h6 className="text-white small fw-bold text-start mb-2">Finance & Accounts</h6>
            <ul className="list-unstyled mb-3 ">
              {navItem("/user/daybook", "fas fa-book", "DayBook")}
              {navItem("/user/balancesheet", "fas fa-clipboard", "Balance Sheet")}
              {navItem("/user/cashflow", "fas fa-search", "Cash Flow")}
              {navItem("/user/accountstatement", "fas fa-file-alt", "Account Statement")}
            </ul>

            {/* Reports */}
            <h6 className="text-white small fw-bold text-start mb-2">Reports</h6>
            <ul className="list-unstyled">
              {navItem("/user/salesreport", "fas fa-chart-bar", "Sales Report")}
              {navItem("/user/purchasereport", "fas fa-clock", "Purchase Report")}
              {navItem("/user/inventoryreport", "fas fa-tint", "Inventory Report")}
              {navItem("/user/invoicereport", "fas fa-dollar-sign", "Invoice Report")}
              {navItem("/user/taxreport", "fas fa-chart-line", "Tax Report")}
            </ul>
          </>
        );











      default:
        return null;
    }
  };

  return (
    <div className="sidebar d-flex flex-column vh-100 position-fixed start-0">
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center py-2">

        <button
          type="button"
          className="btn btn-outline-light ms-auto d-lg-none"
          onClick={handleCloseSidebar}
          style={{ padding: '4px 10px', borderRadius: '6px' }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Role-specific Navigation */}


      <div className="sidebar-nav ">
        {getMenuItems()}
      </div>


    </div>
  );
};

export default Sidebar;
