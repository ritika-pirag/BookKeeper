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

  const navItem = (to, icon, label) => (
    <div className="nav-item ps-2" key={to}>
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`nav-link d-flex justify-content-between align-items-center sidebar-link px-3 py-2 ${activePath === to ? "active-link" : ""}`}
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
      <div onClick={() => toggleMenu(key)} style={sectionHeaderStyle}>
        <span className="d-flex align-items-center">
          <i className={`${icon} me-3`} style={sectionIconStyle}></i>
          {title}
        </span>
        <FaAngleDown
          className={`ms-auto ${openMenu === key ? "rotate-180" : ""}`}
          style={arrowStyle}
        />
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
            { to: "/company/Customer", label: "Customer" },
            { to: "/company/Invoice", label: "Invoice" },
          ],
        },
        {
          type: "section",
          title: "Purchases",
          key: "purchases",
          icon: "fas fa-shopping-basket",
          items: [
            { to: "/company/vendors", label: "Vendors" },
            { to: "/company/NewOrders", label: "New Orders" },
            { to: "/company/purchaseorders", label: "Manage Purchase" },
            { to: "/company/purchasereturn",  label: "Purchase Return" },
          ],
        },
        {
          type: "section",
          title: "POS",
          key: "inventory",
          icon: "fas fa-box",
          items: [
            { to: "/company/warehouse",  label: "Warehouse" },
            { to: "/company/stocktranfer",  label: "StockTransfer" },
            { to: "/company/categories", label: "Categories" },
            { to: "/company/brands", label: "Brands" },
            { to: "/company/device", label: "Device" },
            { to: "/company/tax",  label: "Tax" },
            { to: "/company/product",  label: "Product" },
            { to: "/company/ponitofsale",  label: "POS Screen" },
          ],
        },
        { to: "/company/managestock", icon: "fas fa-table", label: "Inventory" },
        {
          type: "section",
          title: "GST Filing",
          key: "gst",
          icon: "fas fa-file-alt",
          items: [
            { to: "/company/taxreport", label: "Tax Report" },
            { to: "/company/gstreturns", label: "GST Returns" },
            { to: "/company/tdstcs",  label: "TDS/TCS" },
            { to: "/company/itcreport",  label: "ITC Report" },
            { to: "/company/ewaybill", label: "e-Way Bill" },
          ],
        },
        {
          type: "section",
          title: "Finance & Accounts",
          key: "finance",
          icon: "fas fa-wallet",
          items: [
            { to: "/company/daybook", label: "DayBook" },
            { to: "/company/expense",label: "Expenses" },
            { to: "/company/journalentries", label: "Journal Entries" },
            { to: "/company/ledger",  label: "Ledger" },
          ],
        },
        {
          type: "section",
          title: "Reports",
          key: "reports",
          icon: "fas fa-chart-pie",
          items: [
            { to: "/company/salesreport",  label: "Sales Report" },
            { to: "/company/taxreport",  label: "Tax Report" },
            { to: "/company/product", label: "Product" },
            { to: "/company/balancesheet", label: "Balance Sheet" },
            { to: "/company/cashflow",label: "Cash Flow" },
            { to: "/company/profitloss", label: "Profit & Loss" },
          ],
        },
        {
          type: "section",
          title: "User Management",
          key: "users",
          icon: "fas fa-users-cog",
          items: [
            { to: "/company/users",  label: "Users" },
            { to: "/company/rolespermissions",  label: "Roles & Permissions" },
            { to: "/company/deleteaccountrequests",  label: "User Request" },
          ],
        },
        {
          type: "section",
          title: "Settings",
          key: "settings",
          icon: "fas fa-cog",
          items: [{ to: "/company/companyinfo",  label: "Company Info" }],
        },
      ],
      User: [  {
          to: "/company/dashboard",
          icon: "fas fa-tachometer-alt",
          label: "Dashboard",
        },
 
        {
          type: "section",
          title: "Sales",
          key: "usersales",
          icon: "fas fa-shopping-cart",
          items: [
       
            { to: "/user/invoiceforms",  label: "New Invoice" },
            { to: "/user/invoices", label: "Manage Invoice" },
            // { to: "/user/pos", icon: "fas fa-desktop", label: "POS" },
            { to: "/user/onlineorders",  label: "Online Orders" },
            { to: "/user/estimates", label: "Estimates" },
            { to: "/user/deliverychallans", label: "Delivery Challans" }
          ]
        },
        {
          type: "section",
          title: "Purchases",
          key: "userpurchases",
          icon: "fas fa-shopping-basket",
          items: [
            { to: "/user/purchaseorder",  label: " New Orders " },
            { to: "/user/invoice",  label: "Manage Orders" },
            { to: "/user/expense",  label: "Expense" },
            { to: "/user/paymentmode",  label: "Payment Mode" }
          ]
        },

        {
          type: "section",
          title: "POS",
          key: "inventory",
          icon: "fas fa-box",
          items: [
            { to: "/user/warehouse",  label: "Warehouse" },
            { to: "/user/stocktranfer",  label: "StockTransfer" },
            { to: "/user/categories", label: "Categories" },
            // { to: "/user/brands", icon: "fas fa-trademark", label: "Brands" },
            // { to: "/user/device", icon: "fas fa-industry", label: "device" },
            { to: "/user/product",  label: "Product" },
         
          ]
        },

        {
          type: "section",
          title: "Inventory",
          key: "userinventory",
          icon: "fas fa-box",
          items: [
            // { to: "/user/products", icon: "fas fa-cube", label: "Products" },
            { to: "/user/manageproduct",  label: "Manage Product" }
          ]
        },

        {
          type: "section",
          title: "Finance & Accounts",
          key: "userfinance",
          icon: "fas fa-wallet",
          items: [
            { to: "/user/daybook", label: "DayBook" },
            { to: "/user/balancesheet",  label: "Balance Sheet" },
            { to: "/user/cashflow",  label: "Cash Flow" },
            { to: "/user/accountstatement",  label: "Account Statement" }
          ]
        },

        {
          type: "section",
          title: "GST Filing",
          key: "gst",
          icon: "fas fa-file-alt",
          items: [
            { to: "/user/taxdata", label: "Tax Report" },
       
            { to: "/user/gstdata", label: "GST Returns" },
      
            { to: "/user/itcdata",  label: "ITC Report" },
            { to: "/user/tds",  label: "TDS/TCS" },
            { to: "/user/eway",  label: "e-Way Bill" }
          ]
        },
        {
          type: "section",
          title: "Reports",
          key: "userreports",
          icon: "fas fa-chart-pie",
          items: [
            { to: "/user/salesreport",  label: "Sales Report" },
            { to: "/user/purchasereport",  label: "Purchase Report" },
            { to: "/user/inventoryreport",  label: "Inventory Report" },
            { to: "/user/invoicereport",  label: "Invoice Report" },
            { to: "/user/taxreport", label: "Tax Report" }
          ]
        }]
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

      {/* Added scrollable container */}
      <div className="overflow-auto   flex-grow-2 " style={{ minHeight: 0, }}>
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