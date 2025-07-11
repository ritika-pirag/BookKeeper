import React from "react";
import { FaRegSmileBeam, FaArrowUp, FaSyncAlt, FaCog, FaCalendarAlt,FaCoins ,FaHandHoldingUsd  } from "react-icons/fa";
import { BsGraphUpArrow, BsBagCheck, BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import './UserDashboard.css';
// import { ReactComponent as SalesOrangeIcon } from "./sales_orange_icon.png";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const bestSellers = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png",
    name: "Lenovo 3rd Generation",
    price: "$4420",
    sales: 6547,
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
    name: "Bold V3.2",
    price: "$1474",
    sales: 3474,
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048930.png",
    name: "Nike Jordan",
    price: "$8784",
    sales: 1478,
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    name: "Apple Series 5 Watch",
    price: "$3240",
    sales: 987,
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048958.png",
    name: "Amazon Echo Dot",
    price: "$597",
    sales: 784,
  },
];

const transactions = [
  {
    id: 1,
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    name: "Lobar Handy",
    time: "15 Mins",
    payment: "Paypal",
    paymentId: "#416645453773",
    status: "Success",
    amount: "$1,099.00",
  },
  {
    id: 2,
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048929.png",
    name: "Red Premium Handy",
    time: "15 Mins",
    payment: "Apple Pay",
    paymentId: "#147784454554",
    status: "Cancelled",
    amount: "$600.55",
  },
  {
    id: 3,
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048932.png",
    name: "Iphone 14 Pro",
    time: "15 Mins",
    payment: "Stripe",
    paymentId: "#147784454554",
    status: "Completed",
    amount: "$1,099.00",
  },
  {
    id: 4,
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    name: "Black Slim 200",
    time: "15 Mins",
    payment: "PayU",
    paymentId: "#147784454554",
    status: "Success",
    amount: "$1,569.00",
  },
  {
    id: 5,
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048927.png",
    name: "Woodcraft Sandal",
    time: "15 Mins",
    payment: "Paytm",
    paymentId: "#147784454554",
    status: "Success",
    amount: "$1,478.00",
  },
];

const statusBadge = (status) => {
  switch (status) {
    case "Success":
      return "badge bg-success-subtle text-success px-3 py-2 fw-semibold userdash-badge";
    case "Completed":
      return "badge bg-info-subtle text-info px-3 py-2 fw-semibold userdash-badge";
    case "Cancelled":
      return "badge bg-danger text-white px-3 py-2 fw-semibold userdash-badge";
    default:
      return "badge bg-secondary px-3 py-2 fw-semibold userdash-badge";
  }
};

const salesData = [
  { month: "Jan", sales: 25 },
  { month: "Feb", sales: 50 },
  { month: "Mar", sales: 55 },
  { month: "Apr", sales: 30 },
  { month: "May", sales: 45 },
  { month: "Jun", sales: 50 },
  { month: "Jul", sales: 30 },
  { month: "Aug", sales: 20 },
  { month: "Sep", sales: 40 },
];

const UserDashboard = () => {
  return (
    <div className=" bg-light py-3 px-2 px-md-4 userdash-main">
      {/* Header */}
      <div className="userdash-header-card bg-white rounded-3 p-3 mb-3 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
        <div>
          <h4 className="fw-bold mb-1 userdash-welcome">
            <span role="img" aria-label="wave" className="me-2">👋</span>
            Hi John Smilga
            <span className="fw-normal text-dark ms-1" style={{ fontWeight: 400 }}>
              , here's what's happening with your store today.
            </span>
          </h4>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="input-group userdash-date-picker">
            <span className="input-group-text bg-white border-end-0">
              <FaCalendarAlt />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              value="07/03/2025 - 07/09/2025"
              readOnly
              style={{ minWidth: 180, background: "#fff" }}
            />
            {/* <button className="btn btn-light border ms-2" title="Refresh">
              <FaSyncAlt />
            </button>
            <button className="btn btn-light border" title="Settings">
              <FaCog />
            </button> */}
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="bg-white rounded-3 p-4 h-100 d-flex flex-row align-items-center justify-content-between userdash-card">
            <div>
              <div className="text-orange fw-semibold mb-1" style={{ fontSize: 18 }}>Weekly Earning</div>
              <div className="fw-bold" style={{ fontSize: 28 }}>$95000.45</div>
              <div className="mt-2 d-flex align-items-center gap-2">
                <span className="text-success fw-semibold">
                  <FaArrowUp /> 48%
                </span>
                <span className="text-muted" style={{ fontSize: 14 }}>increase compare to last week</span>
              </div>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Earning"
              style={{ width: 90, height: 90 }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="bg-orange rounded-3 p-4 h-100 d-flex flex-row align-items-center justify-content-between position-relative userdash-card">
            <div>
              <div className="text-white-50 mb-1" style={{ fontSize: 18 }}>
                <BsGraphUpArrow className="me-2" />
              </div>
              <div className="fw-bold text-white" style={{ fontSize: 28 }}>10000</div>
              <div className="text-white-50" style={{ fontSize: 15 }}>No of Total Orders</div>
            </div>
            <BsBagCheck size={60} color="#fff" />
            <button className="btn btn-link position-absolute top-0 end-0 mt-2 me-2 p-0 text-white-50 userdash-refresh-btn">
              <FaSyncAlt />
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="bg-darkblue rounded-3 p-4 h-100 d-flex flex-row align-items-center justify-content-between position-relative userdash-card">
            <div>
              <div className="mb-1" style={{ fontSize: 32 }}>
                <div className="text-white-50 mb-1" style={{ fontSize: 18 }}>
                <BsGraphUpArrow className="me-2" />
              </div>
                {/* Use the SVG icon here */}
                {/* <SalesOrangeIcon style={{ width: 48, height: 48 }} /> */}
              </div>
              <div className="fw-bold text-white" style={{ fontSize: 28 }}>800</div>
              <div className="text-white-50" style={{ fontSize: 15 }}>No of Total Sales</div>
            </div>
            {/* Remove the old img/icon */}
            <FaHandHoldingUsd size={60} color="#fff" />
            <button className="btn btn-link position-absolute top-0 end-0 mt-2 me-2 p-0 text-white-50 userdash-refresh-btn">
              <FaSyncAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Best Seller & Recent Transactions */}
      <div className="row g-3">
        {/* Best Seller */}
        <div className="col-12 col-lg-4">
          <div className="bg-white rounded-3 p-3 h-100 userdash-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Best Seller</h5>
              <button className="btn btn-light btn-sm border userdash-viewall-btn">View All</button>
            </div>
            <div>
              {bestSellers.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-3 pb-2 border-bottom userdash-bestseller-row" style={{ gap: 16 }}>
                  <img src={item.img} alt={item.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", background: "#F2F4F7" }} />
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{item.name}</div>
                    <div className="text-muted">{item.price}</div>
                  </div>
                  <div className="text-end">
                    <div className="text-muted" style={{ fontSize: 14 }}>Sales</div>
                    <div className="fw-bold">{item.sales}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="col-12 col-lg-8">
          <div className="bg-white rounded-3 p-3 h-100 userdash-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">Recent Transactions</h5>
              <button className="btn btn-light btn-sm border userdash-viewall-btn">View All</button>
            </div>
            <div className="table-responsive">
              <table className="table align-middle userdash-table mb-0">
                <thead>
                  <tr>
                    <th className="userdash-th">#</th>
                    <th className="userdash-th">Order Details</th>
                    <th className="userdash-th">Payment</th>
                    <th className="userdash-th">Status</th>
                    <th className="userdash-th">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr key={tx.id}>
                      <td>{tx.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={tx.img} alt={tx.name} style={{ width: 38, height: 38, borderRadius: 8, objectFit: "cover", background: "#F2F4F7" }} />
                          <div>
                            <div className="fw-semibold">{tx.name}</div>
                            <div className="text-muted" style={{ fontSize: 13 }}>
                              <MdOutlineAccessTime className="me-1" />
                              {tx.time}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div>{tx.payment}</div>
                          <div className="text-primary" style={{ fontSize: 13 }}>{tx.paymentId}</div>
                        </div>
                      </td>
                      <td>
                        <span className={statusBadge(tx.status)}>{tx.status}</span>
                      </td>
                      <td className="fw-bold">{tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- Sales Analytics & Pending Orders Section --- */}
      <div className="row g-3 mt-3">
        {/* Sales Analytics */}
        <div className="col-12 col-lg-8">
          <div className="bg-white rounded-3 p-3 userdash-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Sales Analytics</h5>
              <button className="btn btn-light btn-sm border">
                <FaCalendarAlt className="me-2" />
                2023 <span className="ms-1">&#9662;</span>
              </button>
            </div>
            {/* Recharts AreaChart */}
            <div style={{ width: "100%", height: 260, position: "relative" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFA646" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FFA646" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#eee" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#888" }} />
                  <YAxis
                    tick={{ fill: "#888" }}
                    domain={[0, 60]}
                    ticks={[10, 20, 30, 40, 50, 60]}
                    tickFormatter={(v) => `${v}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #FFA646",
                      background: "#fff",
                      fontWeight: 500,
                    }}
                    labelStyle={{ color: "#FFA646" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#FFA646"
                    strokeWidth={4}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Pending Orders */}
        <div className="col-12 col-lg-4">
          <div className="bg-white rounded-3 p-3 userdash-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-bold mb-0">Pending Orders</h5>
              <button className="btn btn-light btn-sm border">This Week <span className="ms-1">&#9662;</span></button>
            </div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD00123</td>
                    <td>John Traders</td>
                    <td>2025-06-28</td>
                    <td>
                      <span className="badge bg-warning text-dark px-3 py-2 fw-semibold" style={{ borderRadius: 8 }}>Pending</span>
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm text-white px-3 py-1" style={{ borderRadius: 8 }}>View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>#ORD00124</td>
                    <td>FreshMart Pvt Ltd</td>
                    <td>2025-06-28</td>
                    <td>
                      <span className="badge bg-warning text-dark px-3 py-2 fw-semibold" style={{ borderRadius: 8 }}>Pending</span>
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm text-white px-3 py-1" style={{ borderRadius: 8 }}>View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-2 ms-1 text-danger" style={{ fontSize: 15 }}>
              <span className="me-1" style={{ verticalAlign: "middle" }}>▼</span>
              <span className="fw-semibold">12%</span> increase in pending orders since last week
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default UserDashboard;