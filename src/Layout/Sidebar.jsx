import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaAngleDown } from "react-icons/fa";

const Sidebar = ({ isMobile, onLinkClick }) => {
  const { pathname } = useLocation();
  const [activePath, setActivePath] = useState(pathname);
  const [role, setRole] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const toggleMenu = (menuKey) => {
    setOpenMenu(openMenu === menuKey ? null : menuKey);
  };

  const handleMenuClick = (path) => {
    setActivePath(path);
    if (isMobile) {
      const offcanvas = window.bootstrap?.Offcanvas.getInstance(document.getElementById("mobileSidebar"));
      offcanvas?.hide();
    }
    onLinkClick?.();
  };

  const navItem = (to, icon, label, isDropdownItem = false) => (
    <div className="nav-item ps-2" key={to}>
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`nav-link d-flex justify-content-between align-items-center sidebar-link px-3 py-2 ${
          activePath === to && isDropdownItem ? "active-link" : ""
        }`}
        style={linkStyle}
      >
        <div className="d-flex align-items-center">
          <i className={`me-3 ${icon}`} style={iconStyle}></i>
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );

  const renderCollapsibleSection = (title, key, items, icon) => (
    <div className="mb-2 ms-2" key={key}>
      <div onClick={() => toggleMenu(key)} className="section-header">
        <span className="d-flex align-items-center">
          <i className={`${icon} me-3`} style={sectionIconStyle}></i>
          {title}
        </span>
        <FaAngleDown
          className={`ms-auto ${openMenu === key ? "rotate-180" : ""}`}
          style={arrowStyle}
        />
      </div>
      {openMenu === key && (
        <ul className="list-unstyled">
          {items.map((item) => navItem(item.to, item.icon, item.label, true))}
        </ul>
      )}
    </div>
  );

  const getMenuItems = () => {
    const menuItems = {
      SuperAdmin: [
        { to: "/dashboard", icon: "fas fa-th-large", label: "Dashboard" },
        { to: "/superadmin/company", icon: "fas fa-store", label: "Company" },
        { to: "/superadmin/planpricing", icon: "fas fa-industry", label: "Plans & Pricing" },
        { to: "/superadmin/requestplan", icon: "fas fa-boxes-stacked", label: "Request Plan" },
        { to: "/superadmin/payments", icon: "fas fa-chart-line", label: "Payments" },
      ],
      Company: [
        {
          to: "/company/dashboard",
          icon: "fas fa-tachometer-alt",
          label: "Dashboard",
        },
        {
          type: "section",
          title: "Sales",
          key: "sales",
          icon: "fas fa-chart-line",
          items: [
            { to: "/company/InvoiceForm", icon: "fas fa-file-invoice", label: "New Sale Add" },
            { to: "/company/Invoice", icon: "fas fa-file-invoice-dollar", label: "Manage Sale" },
          ],
        },
        {
          type: "section",
          title: "Purchases",
          key: "purchases",
          icon: "fas fa-shopping-basket",
          items: [
            { to: "/company/vendors", icon: "fas fa-truck", label: "Vendors" },
            { to: "/company/NewOrders", icon: "fas fa-cart-plus", label: "New Orders" },
            { to: "/company/purchaseorders", icon: "fas fa-clipboard-list", label: "Manage Purchase" },
            { to: "/company/purchasereturn", icon: "fas fa-undo", label: "Purchase Return" },
          ],
        },
        {
          type: "section",
          title: "POS",
          key: "pos",
          icon: "fas fa-cash-register",
          items: [
            { to: "/company/warehouse", icon: "fas fa-warehouse", label: "Warehouse" },
            { to: "/company/stocktranfer", icon: "fas fa-exchange-alt", label: "StockTransfer" },
            // { to: "/company/categories", icon: "fas fa-tags", label: "Categories" },
            // { to: "/company/brands", icon: "fas fa-copyright", label: "Brands" },
            // { to: "/company/device", icon: "fas fa-desktop", label: "Device" },
            // { to: "/company/tax", icon: "fas fa-percentage", label: "Tax" },
            { to: "/company/product", icon: "fas fa-box-open", label: "Product" },
            { to: "/company/ponitofsale", icon: "fas fa-cash-register", label: "POS Screen" },
          ],
        },
        { 
          to: "/company/managestock", 
          icon: "fas fa-boxes", 
          label: "Inventory",
        },
        {
          type: "section",
          title: "GST Filing",
          key: "gst",
          icon: "fas fa-file-alt",
          items: [
            { to: "/company/taxreport", icon: "fas fa-file-invoice-dollar", label: "Tax Report" },
            { to: "/company/gstreturns", icon: "fas fa-file-contract", label: "GST Returns" },
            { to: "/company/tdstcs", icon: "fas fa-file-invoice", label: "TDS/TCS" },
            { to: "/company/itcreport", icon: "fas fa-receipt", label: "ITC Report" },
            { to: "/company/ewaybill", icon: "fas fa-file-export", label: "e-Way Bill" },
          ],
        },
        {
          type: "section",
          title: "Finance & Accounts",
          key: "finance",
          icon: "fas fa-wallet",
          items: [
            { to: "/company/daybook", icon: "fas fa-book", label: "DayBook" },
            { to: "/company/expense", icon: "fas fa-money-bill-wave", label: "Expenses" },
            { to: "/company/journalentries", icon: "fas fa-journal-whills", label: "Journal Entries" },
            { to: "/company/ledger", icon: "fas fa-book-open", label: "Ledger" },
          ],
        },
        {
          type: "section",
          title: "Reports",
          key: "reports",
          icon: "fas fa-chart-pie",
          items: [
            { to: "/company/salesreport", icon: "fas fa-chart-bar", label: "Sales Report" },
            { to: "/company/taxreport", icon: "fas fa-file-invoice-dollar", label: "Tax Report" },
            { to: "/company/product", icon: "fas fa-box-open", label: "Product" },
            { to: "/company/balancesheet", icon: "fas fa-balance-scale", label: "Balance Sheet" },
            { to: "/company/cashflow", icon: "fas fa-money-bill-wave", label: "Cash Flow" },
            { to: "/company/profitloss", icon: "fas fa-chart-line", label: "Profit & Loss" },
          ],
        },
        {
          type: "section",
          title: "User Management",
          key: "users",
          icon: "fas fa-users-cog",
          items: [
            { to: "/company/users", icon: "fas fa-users", label: "Users" },
            { to: "/company/rolespermissions", icon: "fas fa-user-shield", label: "Roles & Permissions" },
            { to: "/company/deleteaccountrequests", icon: "fas fa-user-times", label: "User Request" },
          ],
        },
        {
          type: "section",
          title: "Settings",
          key: "settings",
          icon: "fas fa-cog",
          items: [{ to: "/company/companyinfo", icon: "fas fa-info-circle", label: "Company Info" }],
        },
      ],
      User: []
    };

    return menuItems[role]?.map((item) =>
      item.type === "section"
        ? renderCollapsibleSection(item.title, item.key, item.items, item.icon)
        : navItem(item.to, item.icon, item.label)
    );
  };

  // Styles
  const linkStyle = {
    fontWeight: 500,
    fontSize: "15px",
    color: "#fff",
    paddingLeft: "2.5rem",
  };

  const iconStyle = {
    width: "16px",
    minWidth: "16px",
    textAlign: "center",
    fontSize: "18px",
    color: "#fff",
  };

  const sectionHeaderStyle = {
    cursor: "pointer",
    color: "#fff",
    fontSize: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "600",
    padding: "8px 12px",
    borderRadius: "4px",
  };

  const sectionIconStyle = {
    width: "22px",
    minWidth: "22px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ffffff",
  };

  const arrowStyle = {
    transition: "0.3s",
    color: "#ffffff",
  };

  return (
    <div className="sidebar d-flex flex-column h-100 position-fixed start-0">
      <div className="d-flex justify-content-between align-items-center py-2">
        {isMobile && (
          <div className="d-flex align-items-center ms-3 mt-3">
            <img
              src="https://i.ibb.co/TqtpQyH2/image.png"
              alt="Company Logo"
              style={{ height: "50px", width: "170px" }}
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn-outline-light ms-auto d-lg-none me-2 mt-3"
          onClick={() =>
            window.bootstrap?.Offcanvas.getInstance(document.getElementById("mobileSidebar"))?.hide()
          }
          style={{ padding: "4px 10px", borderRadius: "6px" }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="sidebar-menu-container">
        <div className="p-2">{getMenuItems()}</div>
      </div>

      <div className="p-3">
        <Link to="/" className="text-decoration-none">
          <button
            className="btn btn-outline w-100"
            style={{
              borderColor: "#53b2a5",
              color: "#53b2a5",
              padding: "8px 16px",
              fontSize: "15px",
            }}
          >
            <i className="fas fa-sign-out-alt me-2"></i> Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;