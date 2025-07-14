import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaAngleDown } from "react-icons/fa";

const Sidebar = ({ isMobile, onLinkClick }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [role, setRole] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const toggleMenu = (menuKey) => {
    setOpenMenu(openMenu === menuKey ? null : menuKey);
  };

  const handleCloseSidebar = () => {
    const sidebar = document.getElementById("mobileSidebar");
    const offcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
    if (offcanvas) {
      offcanvas.hide();
    }
  };

  const handleMenuClick = (path) => {
    setActivePath(path);
    if (isMobile) {
      const offcanvasElement = document.getElementById("mobileSidebar");
      const offcanvasInstance =
        window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
      if (offcanvasInstance) offcanvasInstance.hide();
    }

    if (onLinkClick) onLinkClick();
  };

  const navItem = (to, icon, label) => (
    <li className="nav-item" key={to}>
      <Link
        to={to}
        onClick={() => handleMenuClick(to)}
        className={`nav-link d-flex align-items-center sidebar-link px-3 py-2 ${
          activePath === to ? "active-link" : ""
        }`}
        style={{ fontWeight: 500, fontSize: "15px", color: "#fff" }}
      >
        <i
          className={`me-3 ${icon}`}
          style={{
            width: "20px",
            minWidth: "20px",
            textAlign: "center",
            fontSize: "16px",
          }}
        ></i>
        <span>{label}</span>
      </Link>
    </li>
  );
  
  
  const renderCollapsibleSection = (title, key, items, icon) => (
    <div className="mb-2">
      <div
        onClick={() => toggleMenu(key)}
        className="d-flex justify-content-between align-items-center fw-semibold py-2 px-3 rounded pointer"
        style={{
          cursor: "pointer",
          color: "#fff",
          fontSize: "15px",
        }}
      >
        {/* Title + Icon alignment */}
        <span className="d-flex align-items-center">
          <i
            className={`${icon} me-3`}
            style={{
              width: "20px",
              minWidth: "20px",
              textAlign: "center",
              fontSize: "16px",
            }}
          ></i>
          {title}
        </span>
  
        <FaAngleDown className={openMenu === key ? "rotate-180" : ""} />
      </div>
  
      {openMenu === key && (
        <ul className="list-unstyled ps-3 pt-1">
          {items.map((item) => navItem(item.to, item.icon, item.label))}
        </ul>
      )}
    </div>
  );
  

  const getMenuItems = () => {
    switch (role) {
      case "SuperAdmin":
        return (
          <>
            {navItem("/dashboard", "fas fa-th-large", "Dashboard")}
            {navItem("/superadmin/company", "fas fa-store", "Company")}
            {navItem(
              "/superadmin/planpricing",
              "fas fa-industry",
              "Plans & Pricing"
            )}
            {navItem(
              "/superadmin/requestplan",
              "fas fa-boxes-stacked",
              "Request Plan"
            )}
            {navItem("/superadmin/payments", "fas fa-chart-line", "payments")}
            {navItem(
              "/superadmin/setting",
              "fas fa-sliders-h",
              " System Settings"
            )}
          </>
        );
      case "Company":
        return (
          <>
{navItem("/company/dashboard", "fas fa-tachometer-alt", "Dashboard")}



            {renderCollapsibleSection(
              "POS",
              "inventory",
              [
                {
                  to: "/company/warehouse",
                  icon: "fas fa-industry",
                  label: "Warehouse",
                },
                {
                  to: "/company/categories",
                  icon: "fas fa-tags",
                  label: "Categories",
                },
                {
                  to: "/company/brands",
                  icon: "fas fa-trademark",
                  label: "Brands",
                },

                {
                  to: "/company/device",
                  icon: "fas fa-industry",
                  label: "device",
                },

                {
                  to: "/company/product",
                  icon: "fas fa-box-open",
                  label: "Product",
                },
                // {
                //   to: "/company/productdetails",
                //   icon: "fas fa-box-open",
                //   label: "Products Details",
                // },
                // {
                //   to: "/company/batchandexpriry",
                //   icon: "fas fa-cubes",
                //   label: "Batch&Expiry",
                // },
                // {
                //   to: "/company/managestock",
                //   icon: "fas fa-warehouse",
                //   label: "Manage Stock",
                // },
                // {
                //   to: "/company/lowstock",
                //   icon: "fas fa-exclamation-triangle",
                //   label: "Low Stock",
                // },
                // {
                //   to: "/company/printbarcode",
                //   icon: "fas fa-barcode",
                //   label: "Print Barcode",
                // },
              ],
              "fas fa-box"
            )}

            {/* {renderCollapsibleSection(
              "Sales",
              "sales",
              [
                {
                  to: "/company/invoice",
                  icon: "fas fa-file-invoice",
                  label: "Invoices",
                },
                {
                  to: "/company/salesreturn",
                  icon: "fas fa-undo",
                  label: "Sales Return",
                },
              ],
              "fas fa-shopping-cart"
            )} */}

            {/* {renderCollapsibleSection(
              "Payments",
              "payments",
              [
                {
                  to: "/company/coupons",
                  icon: "fas fa-ticket-alt",
                  label: "Coupons",
                },
                {
                  to: "/company/accountstatement",
                  icon: "fas fa-receipt",
                  label: "Account Statement",
                },
              ],
              "fas fa-credit-card"
            )} */}

            {renderCollapsibleSection(
              "GST Filing",
              "gst",
              [
                {
                  to: "/company/taxreport",
                  icon: "fas fa-file-alt",
                  label: "Tax Report",
                },
                {
                  to: "/company/qrinvoice",
                  icon: "fas fa-th",
                  label: "QR Invoice",
                },
                {
                  to: "/company/gstreturns",
                  icon: "fas fa-th",
                  label: "GST Returns",
                },
                { to: "/company/tdstcs", icon: "fas fa-th", label: "TDS/TCS" },
                {
                  to: "/company/itcreport",
                  icon: "fas fa-th",
                  label: "ITC Report",
                },
                {
                  to: "/company/ewaybill",
                  icon: "fas fa-th",
                  label: "e-Way Bill",
                },
              ],
              "fas fa-file-alt"
            )}

            {renderCollapsibleSection(
              "Purchases",
              "purchases",
              [
                {
                  to: "/company/purchaseinvoice",
                  icon: "fas fa-file-alt",
                  label: "Purchase Invoice",
                },
                {
                  to: "/company/purchasereturn",
                  icon: "fas fa-file-alt",
                  label: "Purchase Return",
                },
              ],
              "fas fa-shopping-basket"
            )}

            {renderCollapsibleSection(
              "Finance & Accounts",
              "finance",
              [
                {
                  to: "/company/daybook",
                  icon: "fas fa-book",
                  label: "DayBook",
                },
                {
                  to: "/company/journalentries",
                  icon: "fas fa-clipboard-list",
                  label: "Journal Entries",
                },
                {
                  to: "/company/ledger",
                  icon: "fas fa-book-open",
                  label: "Ledger",
                },
              ],
              "fas fa-wallet"
            )}

            {renderCollapsibleSection(
              "Reports",
              "reports",
              [
                {
                  to: "/company/balancesheet",
                  icon: "fas fa-search",
                  label: "Balance Sheet",
                },
                {
                  to: "/company/cashflow",
                  icon: "fas fa-search",
                  label: "Cash Flow",
                },
                {
                  to: "/company/profitloss",
                  icon: "fas fa-stopwatch",
                  label: "Profit & Loss",
                },
              ],
              "fas fa-chart-pie"
            )}

            {renderCollapsibleSection(
              "User Management",
              "users",
              [
                {
                  to: "/company/users",
                  icon: "fas fa-user-friends",
                  label: "Users",
                },
                {
                  to: "/company/rolespermissions",
                  icon: "fas fa-link",
                  label: "Roles & Permissions",
                },
                {
                  to: "/company/deleteaccountrequests",
                  icon: "fas fa-trash",
                  label: "Delete Account Request",
                },
              ],
              "fas fa-users-cog"
            )}

            {renderCollapsibleSection(
              "Settings",
              "settings",
              [
                {
                  to: "/company/companyinfo",
                  icon: "fas fa-globe",
                  label: "Company Info",
                },
              ],
              "fas fa-cog"
            )}
          </>
        );
      case "User":
        return (
          <>
            {renderCollapsibleSection(
              "User Dashboard",
              "userdash",
              [
                {
                  to: "/user/dashboard",
                  icon: "fas fa-th-large",
                  label: "Dashboard",
                },
              ],
              "fas fa-th-large"
            )}

            {renderCollapsibleSection(
              "Inventory",
              "userinventory",
              [
                {
                  to: "/user/products",
                  icon: "fas fa-cube",
                  label: "Products",
                },
                {
                  to: "/user/manageproduct",
                  icon: "fas fa-table",
                  label: "Manage Product",
                },
              ],
              "fas fa-box"
            )}

            {renderCollapsibleSection(
              "Sales",
              "usersales",
              [
                {
                  to: "/user/invoices",
                  icon: "fas fa-file-alt",
                  label: "Invoices",
                },
                { to: "/user/pos", icon: "fas fa-desktop", label: "POS" },
                {
                  to: "/user/onlineorders",
                  icon: "fas fa-shopping-cart",
                  label: "Online Orders",
                },
                {
                  to: "/user/estimates",
                  icon: "fas fa-file-invoice-dollar",
                  label: "Estimates",
                },
                {
                  to: "/user/deliverychallans",
                  icon: "fas fa-truck",
                  label: "Delivery Challans",
                },
              ],
              "fas fa-shopping-cart"
            )}

            {renderCollapsibleSection(
              "Purchases",
              "userpurchases",
              [
                {
                  to: "/user/purchaseorder",
                  icon: "fas fa-file-alt",
                  label: "Purchase Order",
                },
                {
                  to: "/user/expense",
                  icon: "fas fa-wallet",
                  label: "Expense",
                },
                {
                  to: "/user/invoice",
                  icon: "fas fa-file-invoice",
                  label: "Invoice",
                },
                {
                  to: "/user/paymentmode",
                  icon: "fas fa-credit-card",
                  label: "Payment Mode",
                },
              ],
              "fas fa-shopping-basket"
            )}

            {renderCollapsibleSection(
              "Finance & Accounts",
              "userfinance",
              [
                { to: "/user/daybook", icon: "fas fa-book", label: "DayBook" },
                {
                  to: "/user/balancesheet",
                  icon: "fas fa-clipboard",
                  label: "Balance Sheet",
                },
                {
                  to: "/user/cashflow",
                  icon: "fas fa-search",
                  label: "Cash Flow",
                },
                {
                  to: "/user/accountstatement",
                  icon: "fas fa-file-alt",
                  label: "Account Statement",
                },
              ],
              "fas fa-wallet"
            )}

            {renderCollapsibleSection(
              "Reports",
              "userreports",
              [
                {
                  to: "/user/salesreport",
                  icon: "fas fa-chart-bar",
                  label: "Sales Report",
                },
                {
                  to: "/user/purchasereport",
                  icon: "fas fa-clock",
                  label: "Purchase Report",
                },
                {
                  to: "/user/inventoryreport",
                  icon: "fas fa-tint",
                  label: "Inventory Report",
                },
                {
                  to: "/user/invoicereport",
                  icon: "fas fa-dollar-sign",
                  label: "Invoice Report",
                },
                {
                  to: "/user/taxreport",
                  icon: "fas fa-chart-line",
                  label: "Tax Report",
                },
              ],
              "fas fa-chart-pie"
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="sidebar d-flex flex-column vh-100 position-fixed start-0">
      <div className="d-flex justify-content-between align-items-center py-2">
        <button
          type="button"
          className="btn btn-outline-light ms-auto d-lg-none"
          onClick={handleCloseSidebar}
          style={{ padding: "4px 10px", borderRadius: "6px" }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="sidebar-nav ">{getMenuItems()}</div>
    </div>
  );
};

export default Sidebar;
