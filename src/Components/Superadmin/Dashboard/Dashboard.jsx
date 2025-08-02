import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import axios from "axios";
import { BASE_URL } from "../../../config";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7 Days");
  const [mainChartInstance, setMainChartInstance] = useState(null);
  const [growthChartInstance, setGrowthChartInstance] = useState(null);
  const [companyChartInstance, setCompanyChartInstance] = useState(null);
  const [revenueChartInstance, setRevenueChartInstance] = useState(null);
  const [kpiData, setKpiData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchKpiData();
  }, []);

  const fetchKpiData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}super-admin-dashboard`);
      const data = response.data;

      const kpiList = [
        {
          title: "Total Admin",
          value: data.totalUsers,
          icon: "fas fa-users",
          iconColor: "text-primary",
          changeType: "positive",
        },
        {
          title: "Total Plans",
          value: data.totalPlans,
          icon: "fas fa-clipboard-list",
          iconColor: "text-warning",
          changeType: "positive",
        },
        {
          title: "Today's Plans",
          value: data.todayPlans,
          icon: "fas fa-calendar-day",
          iconColor: "text-success",
          changeType: "negative",
        },
        {
          title: "Total Enquiries",
          value: data.totalEnquiries,
          icon: "fas fa-question-circle",
          iconColor: "text-danger",
          changeType: "positive",
        },
      ];

      setKpiData(kpiList);
      setChartData(data);
    } catch (error) {
      console.error("Error fetching KPI data:", error);
    }
  };

  // Initialize main chart
  useEffect(() => {
    if (chartData) {
      const chartDom = document.getElementById("main-chart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        setMainChartInstance(myChart);

        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: ["Total Admin", "Total Plans", "Today's Plans", "Total Enquiries"],
            axisLabel: {
              interval: 0,
              rotate: 0,
              fontSize: 12,
            },
          },
          yAxis: {
            type: "value",
          },
          series: [ 
            {
              name: "Count",
              type: "bar",
              data: [
                chartData.totalUsers,
                chartData.totalPlans,
                chartData.todayPlans,
                chartData.totalEnquiries,
              ],
              itemStyle: {
                color: function(params) {
                  // Custom colors for each bar
                  const colorList = ['#0856d4ff', 'rgba(203, 194, 22, 1)', '#0f4f3eff', '#a9064dff'];
                  return colorList[params.dataIndex];
                },
                borderRadius: [5, 5, 0, 0],
              },
              label: {
                show: true,
                position: "top",
                formatter: "{c}",
                color: "#333",
                fontSize: 12,
              },
            },
          ],
        };

        myChart.setOption(option);

        const handleResize = () => {
          myChart.resize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          myChart.dispose();
        };
      }
    }
  }, [chartData, selectedPeriod]);

  return (
    <div className="">
      <div className="">
        {/* Header Section */}
        <div className="mb-5 mt-3 p-2">
          <h1 className="h2 mb-1 mb-md-2">Welcome back, Super Admin!</h1>
          <p className="text-muted">
            Here's what's happening with your platform today.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="row mb-4">
          {kpiData.map((kpi, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body justify-content-center">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="d-flex align-items-center">
                      <div className="p-3 me-3">
                        <i className={`${kpi.icon} ${kpi.iconColor} fs-4`}></i>
                      </div>
                      <div>
                        <p className="mb-0 text-muted small">{kpi.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-center">
                    <div>
                      <p className="h4 fw-bold mb-0">{kpi.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Platform Overview</h5>
                  <div className="btn-group">
                    <button
                      className={`btn btn-sm ${
                        selectedPeriod === "7 Days" ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedPeriod("7 Days")}
                    >
                      7 Days
                    </button>
                    <button
                      className={`btn btn-sm ${
                        selectedPeriod === "30 Days" ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedPeriod("30 Days")}
                    >
                      30 Days
                    </button>
                    <button
                      className={`btn btn-sm ${
                        selectedPeriod === "90 Days" ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedPeriod("90 Days")}
                    >
                      90 Days
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div
                  id="main-chart"
                  style={{ width: "100%", height: "400px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;