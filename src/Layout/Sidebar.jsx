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

  const toggleMenu = (menuKey) => setOpenMenu(openMenu === menuKey ? null : menuKey);

  const handleMenuClick = (path) => {
    setActivePath(path);
    if (isMobile) {
      const offcanvas = window.bootstrap?.Offcanvas.getInstance(document.getElementById("mobileSidebar"));
      offcanvas?.hide();
    }
    onLinkClick?.();
  };

  const navItem = (to, icon, label) => (
    <div className="nav-item ps-2 ">
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`nav-link d-flex align-items-center sidebar-link px-3 py-2 ${activePath === to ? "active-link" : ""}`}
        style={linkStyle}
      >
        <i className={`me-3  ${icon}`} style={iconStyle} ></i>
        <span>{label}</span>
      </Link>
    </div>
  );

  const renderCollapsibleSection = (title, key, items, icon) => (
    <div className="mb-2 ">
      <div onClick={() => toggleMenu(key)} style={sectionHeaderStyle}>
        <span className="d-flex align-items-center">
          <i className={`${icon} me-3`} style={sectionIconStyle}></i>
          {title}
        </span>
        <FaAngleDown className={openMenu === key ? "rotate-180" : ""} style={arrowStyle} />
      </div>
      {openMenu === key && <ul className="list-unstyled">{items.map((item) => navItem(item.to, item.icon, item.label))}</ul>}
    </div>
  );

  const getMenuItems = () => {
    const menuItems = {
      SuperAdmin: [
        { to: "/dashboard", icon: "fas fa-th-large", label: "Dashboard" },
        { to: "/superadmin/company", icon: "fas fa-store", label: "Company" },
        { to: "/superadmin/planpricing", icon: "fas fa-industry", label: "Plans & Pricing" },
        { to: "/superadmin/requestplan", icon: "fas fa-boxes-stacked", label: "Request Plan" },
        { to: "/superadmin/payments", icon: "fas fa-chart-line", label: "payments" },
        // { to: "/superadmin/setting", icon: "fas fa-sliders-h", label: "System Settings" }
      ],
      Company: [
        { type: "item", to: "/company/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
        {
          type: "section",
          title: "Sales",
          key: "sales",
          icon: "fas fa-chart-line",
          items: [
            { to: "/company/InvoiceForm", icon: "fas fa-cash-register", label: "New Invoice" },
            { to: "/company/Invoice", icon: "fas fa-file-invoice", label: "Manage Invoice" }
          ]
        },
        {
          type: "section",
          title: "Purchases",
          key: "purchases",
          icon: "fas fa-shopping-basket",
          items: [
            { to: "/company/vendors", icon: "fas fa-file-alt", label: "Vendors" },
            { to: "/company/NewOrders", icon: "fas fa-cash-register", label: "New orders" },
            { to: "/company/purchaseorders", icon: "fas fa-file-alt", label: "Purchase orders" },
            { to: "/company/purchasereturn", icon: "fas fa-file-alt", label: "Purchase Return" }
          ]
        },
        {
          type: "section",
          title: "POS",
          key: "inventory",
          icon: "fas fa-box",
          items: [
            { to: "/company/warehouse", icon: "fas fa-industry", label: "Warehouse" },
            { to: "/company/stocktranfer", icon: "fas fa-industry", label: "StockTransfer" },
            { to: "/company/categories", icon: "fas fa-tags", label: "Categories" },
            { to: "/company/brands", icon: "fas fa-trademark", label: "Brands" },
            { to: "/company/device", icon: "fas fa-industry", label: "device" },
            { to: "/company/product", icon: "fas fa-box-open", label: "Product" },
            { to: "/company/ponitofsale", icon: "fas fa-file-invoice", label: "POS Screen" }
          ]
        },
        {
          type: "section",
          title: "GST Filing",
          key: "gst",
          icon: "fas fa-file-alt",
          items: [
            { to: "/company/taxreport", icon: "fas fa-circle", label: "Tax Report" },
            { to: "/company/gstreturns", icon: "fas fa-book", label: "GST Returns" },
            { to: "/company/tdstcs", icon: "fas fa-file-alt", label: "TDS/TCS" },
            { to: "/company/itcreport", icon: "fas fa-book-open", label: "ITC Report" },
            { to: "/company/ewaybill", icon: "fas fa-th", label: "e-Way Bill" }
          ]
        },
        {
          type: "section",
          title: "Finance & Accounts",
          key: "finance",
          icon: "fas fa-wallet",
          items: [
            { to: "/company/daybook", icon: "fas fa-book", label: "DayBook" },
            { to: "/company/expense", icon: "fas fa-file-alt", label: "Expenses" },
            { to: "/company/journalentries", icon: "fas fa-clipboard-list", label: "Journal Entries" },
            { to: "/company/ledger", icon: "fas fa-book-open", label: "Ledger" }
          ]
        },
        {
          type: "section",
          title: "Reports",
          key: "reports",
          icon: "fas fa-chart-pie",
          items: [
            { to: "/company/salesreport", icon: "fas fa-search", label: "Sales Report" },
            { to: "/company/taxreport", icon: "fas fa-search", label: "Tax Report" },
            { to: "/company/balancesheet", icon: "fas fa-search", label: "Balance Sheet" },
            { to: "/company/cashflow", icon: "fas fa-search", label: "Cash Flow" },
            { to: "/company/profitloss", icon: "fas fa-stopwatch", label: "Profit & Loss" }
          ]
        },
        {
          type: "section",
          title: "User Management",
          key: "users",
          icon: "fas fa-users-cog",
          items: [
            { to: "/company/users", icon: "fas fa-user-friends", label: "Users" },
            { to: "/company/rolespermissions", icon: "fas fa-link", label: "Roles & Permissions" },
            { to: "/company/deleteaccountrequests", icon: "fas fa-trash", label: "User Request" }
          ]
        },
        {
          type: "section",
          title: "Settings",
          key: "settings",
          icon: "fas fa-cog",
          items: [
            { to: "/company/companyinfo", icon: "fas fa-globe", label: "Company Info" }
          ]
        }
      ],
      User: [
        {
          type: "section",
          title: "User Dashboard",
          key: "userdash",
          icon: "fas fa-th-large",
          items: [
            { to: "/user/dashboard", icon: "fas fa-th-large", label: "Dashboard" }
          ]
        },
        {
          type: "section",
          title: "Inventory",
          key: "userinventory",
          icon: "fas fa-box",
          items: [
            { to: "/user/products", icon: "fas fa-cube", label: "Products" },
            { to: "/user/manageproduct", icon: "fas fa-table", label: "Manage Product" }
          ]
        },
        {
          type: "section",
          title: "Sales",
          key: "usersales",
          icon: "fas fa-shopping-cart",
          items: [
       
            { to: "/user/invoiceforms", icon: "fas fa-file-alt", label: "New Invoice" },
            { to: "/user/invoices", icon: "fas fa-file-alt", label: "Manage Invoice" },
            // { to: "/user/pos", icon: "fas fa-desktop", label: "POS" },
            { to: "/user/onlineorders", icon: "fas fa-shopping-cart", label: "Online Orders" },
            { to: "/user/estimates", icon: "fas fa-file-invoice-dollar", label: "Estimates" },
            { to: "/user/deliverychallans", icon: "fas fa-truck", label: "Delivery Challans" }
          ]
        },
        {
          type: "section",
          title: "Purchases",
          key: "userpurchases",
          icon: "fas fa-shopping-basket",
          items: [
            { to: "/user/purchaseorder", icon: "fas fa-file-alt", label: " New Orders " },
            { to: "/user/invoice", icon: "fas fa-file-invoice", label: "Manage Orders" },
            { to: "/user/expense", icon: "fas fa-wallet", label: "Expense" },
            { to: "/user/paymentmode", icon: "fas fa-credit-card", label: "Payment Mode" }
          ]
        },

        {
          type: "section",
          title: "POS",
          key: "inventory",
          icon: "fas fa-box",
          items: [
            { to: "/user/warehouse", icon: "fas fa-industry", label: "Warehouse" },
            { to: "/user/stocktranfer", icon: "fas fa-industry", label: "StockTransfer" },
            { to: "/user/categories", icon: "fas fa-tags", label: "Categories" },
            // { to: "/user/brands", icon: "fas fa-trademark", label: "Brands" },
            // { to: "/user/device", icon: "fas fa-industry", label: "device" },
            { to: "/user/product", icon: "fas fa-box-open", label: "Product" },
         
          ]
        },



        {
          type: "section",
          title: "Finance & Accounts",
          key: "userfinance",
          icon: "fas fa-wallet",
          items: [
            { to: "/user/daybook", icon: "fas fa-book", label: "DayBook" },
            { to: "/user/balancesheet", icon: "fas fa-clipboard", label: "Balance Sheet" },
            { to: "/user/cashflow", icon: "fas fa-search", label: "Cash Flow" },
            { to: "/user/accountstatement", icon: "fas fa-file-alt", label: "Account Statement" }
          ]
        },

        {
          type: "section",
          title: "GST Filing",
          key: "gst",
          icon: "fas fa-file-alt",
          items: [
            { to: "/user/taxdata", icon: "fas fa-circle", label: "Tax Report" },
       
            { to: "/user/gstdata", icon: "fas fa-search", label: "GST Returns" },
      
            { to: "/user/itcdata", icon: "fas fa-th", label: "ITC Report" },
            { to: "/user/tds", icon: "fas fa-book", label: "TDS/TCS" },
            { to: "/user/eway", icon: "fas fa-th", label: "e-Way Bill" }
          ]
        },
        {
          type: "section",
          title: "Reports",
          key: "userreports",
          icon: "fas fa-chart-pie",
          items: [
            { to: "/user/salesreport", icon: "fas fa-chart-bar", label: "Sales Report" },
            { to: "/user/purchasereport", icon: "fas fa-clock", label: "Purchase Report" },
            { to: "/user/inventoryreport", icon: "fas fa-tint", label: "Inventory Report" },
            { to: "/user/invoicereport", icon: "fas fa-dollar-sign", label: "Invoice Report" },
            { to: "/user/taxreport", icon: "fas fa-chart-line", label: "Tax Report" }
          ]
        }
      ]
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
    paddingLeft: "2.5rem"
  };

  const iconStyle = {
    width: "16px",
    minWidth: "16px",
    textAlign: "center",
    fontSize: "18px",
    color: "#fff"
  };

  const sectionHeaderStyle = {
    cursor: "pointer",
    color: "#fff",
    fontSize: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "semibold",
    padding: "8px 12px",
    borderRadius: "4px"
  };

  const sectionIconStyle = {
    width: "22px",
    minWidth: "22px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ffffff"
  };

  const arrowStyle = {
    transition: "0.3s",
    color: "#ffffff"
  };

  return (
    <div className="sidebar d-flex flex-column h-100 position-fixed start-0">
      <div className="d-flex justify-content-between align-items-center py-2">
        {/* Logo for mobile view only */}
        {isMobile && (
          <div className="d-flex align-items-center ms-3 mt-3">
            <img 
              src="https://i.ibb.co/TqtpQyH2/image.png" 
              alt="Company Logo" 
              style={{ 
                height: "50px",
                width: "170px",
              }}
            />
          </div>
        )}
        <button
          type="button"
          className="btn btn-outline-light ms-auto d-lg-none me-2 mt-3"
          onClick={() => window.bootstrap?.Offcanvas.getInstance(document.getElementById("mobileSidebar"))?.hide()}
          style={{ padding: "4px 10px", borderRadius: "6px" }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
       
      <div className="p-2">{getMenuItems()}</div>
      <div className="p-3">
        <Link to="/" className="text-decoration-none">
          <button 
            className="btn btn-outline w-100" 
            style={{ 
              borderColor: "#53b2a5", 
              color: "#53b2a5",
              padding: "8px 16px",
              fontSize: "15px"
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