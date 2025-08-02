import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const PlanBilling = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30 Days');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Sample data for different periods
  const monthlyData = [
    { month: 'Jan 2024', revenue: 52480, refunds: 2340, tax: 5248, net: 44892 },
    { month: 'Feb 2024', revenue: 48720, refunds: 1890, tax: 4872, net: 41958 },
    { month: 'Mar 2024', revenue: 55340, refunds: 2680, tax: 5534, net: 47126 },
    { month: 'Apr 2024', revenue: 49860, refunds: 2120, tax: 4986, net: 42754 },
    { month: 'May 2024', revenue: 58920, refunds: 3240, tax: 5892, net: 49788 },
    { month: 'Jun 2024', revenue: 62180, refunds: 2890, tax: 6218, net: 53072 },
    { month: 'Jul 2024', revenue: 56740, refunds: 2560, tax: 5674, net: 48506 },
    { month: 'Aug 2024', revenue: 60230, refunds: 2450, tax: 6023, net: 51757 },
    { month: 'Sep 2024', revenue: 57890, refunds: 2310, tax: 5789, net: 49791 },
    { month: 'Oct 2024', revenue: 61240, refunds: 2980, tax: 6124, net: 52136 },
    { month: 'Nov 2024', revenue: 53450, refunds: 1870, tax: 5345, net: 46235 },
    { month: 'Dec 2024', revenue: 65420, refunds: 3120, tax: 6542, net: 55758 },
  ];

  const quarterlyData = [
    { quarter: 'Q1 2024', revenue: 156540, refunds: 6910, tax: 15654, net: 133976 },
    { quarter: 'Q2 2024', revenue: 170960, refunds: 8250, tax: 17096, net: 145614 },
    { quarter: 'Q3 2024', revenue: 178360, refunds: 7320, tax: 17836, net: 153204 },
    { quarter: 'Q4 2024', revenue: 180110, refunds: 7970, tax: 18011, net: 154129 },
  ];

  const yearlyData = [
    { year: '2022', revenue: 1854320, refunds: 125640, tax: 185432, net: 1543248 },
    { year: '2023', revenue: 2156780, refunds: 98760, tax: 215678, net: 1845342 },
    { year: '2024', revenue: 685970, refunds: 30450, tax: 68597, net: 586923 },
  ];

  // Get current data based on selected period
  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'Quarterly': return quarterlyData;
      case 'Yearly': return yearlyData;
      default: return monthlyData;
    }
  };

  // Get current totals
  const getTotals = () => {
    const data = getCurrentData();
    return data.reduce((acc, curr) => {
      return {
        totalRevenue: acc.totalRevenue + curr.revenue,
        totalRefunds: acc.totalRefunds + curr.refunds,
        totalTax: acc.totalTax + curr.tax,
        totalNet: acc.totalNet + curr.net
      };
    }, { totalRevenue: 0, totalRefunds: 0, totalTax: 0, totalNet: 0 });
  };

  const totals = getTotals();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    let sortableData = [...getCurrentData()];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [selectedPeriod, sortConfig]);

  // Pagination
  const itemsPerPage = 7;
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle sort
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset page when period changes
  useEffect(() => {
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'ascending' });
  }, [selectedPeriod]);

  // Chart setup
  useEffect(() => {
    const chartDom = document.getElementById('revenueChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      
      // Update chart data based on selected time range and period
      let xAxisData, revenueData, refundsData;
      
      if (selectedPeriod === 'Monthly') {
        if (selectedTimeRange === '7 Days') {
          xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          revenueData = [12, 19, 15, 17, 14, 21, 23];
          refundsData = [2, 3, 1, 2, 1, 4, 3];
        } else if (selectedTimeRange === '30 Days') {
          xAxisData = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          revenueData = [120, 135, 125, 140];
          refundsData = [12, 15, 10, 13];
        } else { // 90 Days
          xAxisData = ['Month 1', 'Month 2', 'Month 3'];
          revenueData = [380, 420, 400];
          refundsData = [35, 40, 38];
        }
      } else if (selectedPeriod === 'Quarterly') {
        if (selectedTimeRange === '7 Days') {
          xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          revenueData = [42, 49, 45, 47, 44, 51, 53];
          refundsData = [5, 6, 4, 5, 4, 7, 6];
        } else if (selectedTimeRange === '30 Days') {
          xAxisData = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          revenueData = [320, 335, 325, 340];
          refundsData = [22, 25, 20, 23];
        } else { // 90 Days
          xAxisData = ['Month 1', 'Month 2', 'Month 3'];
          revenueData = [980, 1020, 1000];
          refundsData = [85, 90, 88];
        }
      } else { // Yearly
        if (selectedTimeRange === '7 Days') {
          xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          revenueData = [142, 149, 145, 147, 144, 151, 153];
          refundsData = [15, 16, 14, 15, 14, 17, 16];
        } else if (selectedTimeRange === '30 Days') {
          xAxisData = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          revenueData = [1320, 1335, 1325, 1340];
          refundsData = [92, 95, 90, 93];
        } else { // 90 Days
          xAxisData = ['Q1', 'Q2', 'Q3', 'Q4'];
          revenueData = [1980, 2020, 2000, 2050];
          refundsData = [125, 130, 128, 132];
        }
      }

      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: ['Revenue', 'Refunds'],
          top: 20
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Revenue ($)',
            position: 'left',
            axisLabel: {
              formatter: selectedPeriod === 'Yearly' ? '${value}M' : '${value}K'
            }
          },
          {
            type: 'value',
            name: 'Refunds ($)',
            position: 'right',
            axisLabel: {
              formatter: selectedPeriod === 'Yearly' ? '${value}M' : '${value}K'
            }
          }
        ],
        series: [
          {
            name: 'Revenue',
            type: 'bar',
            data: revenueData,
            itemStyle: {
              color: '#10b981'
            }
          },
          {
            name: 'Refunds',
            type: 'line',
            yAxisIndex: 1,
            data: refundsData,
            itemStyle: {
              color: '#3b82f6'
            },
            lineStyle: {
              color: '#3b82f6'
            }
          }
        ]
      };
      
      myChart.setOption(option);
      
      const handleResize = () => {
        myChart.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        myChart.dispose();
      };
    }
  }, [selectedTimeRange, selectedPeriod]);

  // Get column headers based on period
  const getColumnHeaders = () => {
    switch (selectedPeriod) {
      case 'Quarterly':
        return [
          { key: 'quarter', label: 'Quarter' },
          { key: 'revenue', label: 'Revenue' },
          { key: 'refunds', label: 'Refunds' },
          { key: 'tax', label: 'Tax' },
          { key: 'net', label: 'Net' }
        ];
      case 'Yearly':
        return [
          { key: 'year', label: 'Year' },
          { key: 'revenue', label: 'Revenue' },
          { key: 'refunds', label: 'Refunds' },
          { key: 'tax', label: 'Tax' },
          { key: 'net', label: 'Net' }
        ];
      default:
        return [
          { key: 'month', label: 'Month' },
          { key: 'revenue', label: 'Revenue' },
          { key: 'refunds', label: 'Refunds' },
          { key: 'tax', label: 'Tax' },
          { key: 'net', label: 'Net' }
        ];
    }
  };

  // Get row data based on period
  const getRowData = (row) => {
    switch (selectedPeriod) {
      case 'Quarterly':
        return [
          row.quarter,
          formatCurrency(row.revenue),
          formatCurrency(row.refunds),
          formatCurrency(row.tax),
          formatCurrency(row.net)
        ];
      case 'Yearly':
        return [
          row.year,
          formatCurrency(row.revenue),
          formatCurrency(row.refunds),
          formatCurrency(row.tax),
          formatCurrency(row.net)
        ];
      default:
        return [
          row.month,
          formatCurrency(row.revenue),
          formatCurrency(row.refunds),
          formatCurrency(row.tax),
          formatCurrency(row.net)
        ];
    }
  };

  return (
    <div className="">
      <div className="">
        {/* Header Section */}
        <div className="mb-5">
          <h1 className="h2 mb-1 mb-md-2">Platform Billing</h1>
          <p className="text-muted">Monitor your platform's financial performance and billing metrics.</p>
          
          {/* Time Period Selector */}
          <div className="mt-4 btn-group" role="group">
            {['Monthly', 'Quarterly', 'Yearly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`btn ${selectedPeriod === period ? 'btn-white bg-white shadow-sm' : 'btn-light'}`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="row mb-5 g-4">
          <div className="col-md-4">
            <div className="card h-100 border-light shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">Total Revenue</p>
                    <h3 className="mb-0">{formatCurrency(totals.totalRevenue)}</h3>
                    <div className="d-flex align-items-center mt-2">
                      <i className="fas fa-arrow-up text-success me-1 small"></i>
                      <span className="small text-success fw-medium">+12.5%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary bg-opacity-10 rounded-circle">
                    <i className="fas fa-dollar-sign text-primary fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-light shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">Total Refunds</p>
                    <h3 className="mb-0">{formatCurrency(totals.totalRefunds)}</h3>
                    <div className="d-flex align-items-center mt-2">
                      <i className="fas fa-arrow-down text-danger me-1 small"></i>
                      <span className="small text-danger fw-medium">-3.2%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-danger bg-opacity-10 rounded-circle">
                    <i className="fas fa-undo text-danger fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-light shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="text-muted small mb-1">Net Income</p>
                    <h3 className="mb-0">{formatCurrency(totals.totalNet)}</h3>
                    <div className="d-flex align-items-center mt-2">
                      <i className="fas fa-arrow-up text-success me-1 small"></i>
                      <span className="small text-success fw-medium">+8.7%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-success bg-opacity-10 rounded-circle">
                    <i className="fas fa-chart-line text-success fs-5"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Graph Section */}
        <div className="card mb-5 border-light shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
              <h2 className="h5 fw-semibold text-dark mb-3 mb-md-0">Revenue Trends</h2>
              <div className="btn-group" role="group">
                {['7 Days', '30 Days', '90 Days'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedTimeRange(range)}
                    className={`btn btn-sm ${selectedTimeRange === range ? 'btn-primary' : 'btn-outline-secondary'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div id="revenueChart" style={{ width: '100%', height: '400px' }}></div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="card border-light shadow-sm">
          <div className="card-header bg-white border-bottom">
            <h2 className="h5 fw-semibold mb-0">
              {selectedPeriod === 'Quarterly' ? 'Quarterly' : selectedPeriod === 'Yearly' ? 'Yearly' : 'Monthly'} Billing Summary
            </h2>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  {getColumnHeaders().map((header) => (
                    <th 
                      key={header.key}
                      scope="col" 
                      className="text-muted small fw-normal cursor-pointer"
                      onClick={() => requestSort(header.key)}
                    >
                      {header.label} 
                      <i className={`fas fa-sort ms-1 ${
                        sortConfig.key === header.key ? (sortConfig.direction === 'ascending' ? 'text-primary' : 'text-primary') : 'text-muted'
                      }`}></i>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index}>
                    {getRowData(row).map((cell, cellIndex) => (
                      <td 
                        key={cellIndex} 
                        className={`
                          ${cellIndex === 0 ? 'fw-medium' : ''}
                          ${cellIndex === 2 ? 'text-danger fw-medium' : ''}
                          ${cellIndex === 4 ? 'text-success fw-semibold' : ''}
                          ${cellIndex === 3 ? 'text-muted' : ''}
                          ${cellIndex === 1 ? 'fw-semibold' : ''}
                        `}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white border-top d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="text-muted small mb-2 mb-md-0">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
            </div>
            <div className="btn-group">
              <button 
                className="btn btn-sm btn-outline-secondary"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button 
                className="btn btn-sm btn-outline-secondary"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanBilling;