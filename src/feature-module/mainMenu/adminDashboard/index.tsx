import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import "bootstrap-daterangepicker/daterangepicker.css";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminDashboardModal from "./adminDashboardModal";

const AdminDashboard = () => {
  const routes = all_routes;
  const [date, setDate] = useState<Nullable<Date>>(null);
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-next"
        style={{ ...style, display: "flex", top: "30%", right: "30%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right" style={{ color: "#677788" }}></i>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-prev"
        style={{ ...style, display: "flex", top: "30%", left: "30%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left" style={{ color: "#677788" }}></i>
      </div>
    );
  }
  const settings = {
    dots: false,
    autoplay: false,
    arrows: false,
    slidesToShow: 2,
    margin: 24,
    speed: 500,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const student = {
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const teacher = {
    dots: false,
    autoplay: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const [studentDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3D5EE1", "#6FCCD8"],
    series: [3610, 44],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  const [teacherDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3D5EE1", "#6FCCD8"],
    series: [346, 54],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  const [staffDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#3D5EE1", "#6FCCD8"],
    series: [620, 80],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  const [classDonutChart] = useState<any>({
    chart: {
      height: 218,
      width: 218,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: ["Good", "Average", "Below Average"],
    legend: { show: false },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        offsetX: -15,
      },
    },
    grid: {
      padding: {
        left: -8,
      },
    },
    colors: ["#3D5EE1", "#EAB300", "#E82646"],
    series: [45, 11, 2],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180,
          },
        },
      },
    ],
  });
  const [feesBar] = useState<any>({
    chart: {
      height: 275,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      horizontalAlign: "left",
      position: "top",
      fontSize: "14px",
      labels: {
        colors: "#5D6369",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
    colors: ["#3D5EE1", "#E9EDF4"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    grid: {
      padding: {
        left: -8,
      },
    },
    series: [
      {
        name: "Collected Fee",
        data: [30, 40, 38, 40, 38, 30, 35, 38, 40],
      },
      {
        name: "Total Fee",
        data: [45, 50, 48, 50, 48, 40, 40, 50, 55],
      },
    ],
    xaxis: {
      categories: [
        "Q1: 2023",
        "Q1: 2023",
        "Q1: 2023",
        "Q1: 2023",
        "Q1: 2023",
        "uQ1: 2023l",
        "Q1: 2023",
        "Q1: 2023",
        "Q1: 2023",
      ],
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        offsetX: -15,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return "$ " + val + " thousands";
        },
      },
    },
  });
  const [totalEarningArea] = useState<any>({
    chart: {
      height: 90,
      type: "area",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#3D5EE1"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    series: [
      {
        name: "Earnings",
        data: [50, 55, 40, 50, 45, 55, 50],
      },
    ],
  });
  const [totalExpenseArea] = useState<any>({
    chart: {
      height: 90,
      type: "area",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#E82646"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    series: [
      {
        name: "Expense",
        data: [40, 30, 60, 55, 50, 55, 40],
      },
    ],
  });

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <>
            {/* Page Header */}
            <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
              <div className="my-auto mb-2">
                <h3 className="page-title mb-1">Admin Dashboard</h3>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to={routes.adminDashboard}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Admin Dashboard
                    </li>
                  </ol>
                </nav>
              </div>

            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                <div className="card bg-dark">
                  <div className="overlay-img">
                    <ImageWithBasePath
                      src="assets/img/bg/shape-04.png"
                      alt="img"
                      className="img-fluid shape-01"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-01.png"
                      alt="img"
                      className="img-fluid shape-02"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-02.png"
                      alt="img"
                      className="img-fluid shape-03"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/shape-03.png"
                      alt="img"
                      className="img-fluid shape-04"
                    />
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-xl-center justify-content-xl-between flex-xl-row flex-column">
                      <div className="mb-3 mb-xl-0">
                        <div className="d-flex align-items-center flex-wrap mb-2">
                          <h1 className="text-white me-2">
                            Welcome Back, Mr. Herald
                          </h1>
                        </div>
                        <p className="text-white">Have a Good day at work</p>
                      </div>
                      <p className="text-white custom-text-white">
                        <i className="ti ti-refresh me-1" />
                        Updated Recently on 15 Jun 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/* Total Students */}
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl bg-danger-transparent me-2 p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon4.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={3654} />
                          </h2>
                          <span className="badge bg-danger">1.2%</span>
                        </div>
                        <p>Total users</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-secondary-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon1.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={284} />
                          </h2>
                          <span className="badge bg-pending">1.2%</span>
                        </div>
                        <p>Online Classes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Teachers */}
              {/* Total Staff */}
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-warning-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon5.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={162} />
                          </h2>
                          <span className="badge bg-warning">1.2%</span>
                        </div>
                        <p>Face to face</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Staff */}
              {/* Total Subjects */}
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon2.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={82} />
                          </h2>
                          <span className="badge bg-success">1.2%</span>
                        </div>
                        <p>Subscription</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon3.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={82} />
                          </h2>
                          <span className="badge bg-success">1.2%</span>
                        </div>
                        <p>Mock Test</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/subject.svg"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={82} />
                          </h2>
                          <span className="badge bg-success">1.2%</span>
                        </div>
                        <p>User Log </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon4.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={82} />
                          </h2>
                          <span className="badge bg-success">1.2%</span>
                        </div>
                        <p>Active User </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon4.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={82} />
                          </h2>
                          <span className="badge bg-success">1.2%</span>
                        </div>
                        <p>Inactive User </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-success-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/icon4.png"
                          alt="img"
                        />
                      </div>
                      <div className="overflow-hidden flex-fill">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="counter">
                            <CountUp end={82} />
                          </h2>
                          <span className="badge bg-success">1.2%</span>
                        </div>
                        <p>Online User </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Subjects */}
            </div>

            <div className="row">
              {/* Schedules */}
              <div className="col-xxl-4 col-xl-6 col-md-12 d-flex">
                <div className="card flex-fill">
                  <div className="card-body ">
                    <h5 className="mb-3">Upcoming Classes</h5>
                    <div className="event-wrapper event-scroll">
                      {/* Event Item */}
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Essay Writing</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            Friday 09:00 pm to 10:30 pm
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <button className="btn btn-primary">Class Link</button>
                          </div>
                        </div>
                      </div>
                      {/* /Event Item */}
                      {/* Event Item */}
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Essay Writing</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            Friday 09:00 pm to 10:30 pm
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <button className="btn btn-primary">Class Link</button>
                          </div>
                        </div>
                      </div>
                      {/* /Event Item */}
                      {/* Event Item */}
                      <div className="border-start border-skyblue border-3 shadow-sm p-3 mb-3">
                        <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                          <span className="avatar p-1 me-2 bg-teal-transparent flex-shrink-0">
                            <i className="ti ti-user-edit text-info fs-20" />
                          </span>
                          <div className="flex-fill">
                            <h6 className="mb-1">Essay Writing</h6>
                            <p className="d-flex align-items-center">
                              <i className="ti ti-calendar me-1" />
                              15 July 2024
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <p className="mb-0">
                            <i className="ti ti-clock me-1" />
                            Friday 09:00 pm to 10:30 pm
                          </p>
                          <div className="avatar-list-stacked avatar-group-sm">
                            <button className="btn btn-primary">Class Link</button>
                          </div>
                        </div>
                      </div>
                      {/* /Event Item */}
                    </div>
                  </div>
                </div>
              </div>
              {/* /Schedules */}
              {/* Attendance */}
              <div className="col-xxl-4 col-xl-6 col-md-12 d-flex flex-column">
                <div className="card">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Student Attendance</h4>
                  </div>
                  <div className="card-body">
                  <div className="tab-pane fade active show" id="students">
                        <div className="row gx-3">
                          <div className="col-sm-4">
                            <div className="card bg-light-300 shadow-none border-0">
                              <div className="card-body p-3 text-center">
                                <h5>28</h5>
                                <p className="fs-12">Emergency</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="card bg-light-300 shadow-none border-0">
                              <div className="card-body p-3 text-center">
                                <h5>01</h5>
                                <p className="fs-12">Absent</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="card bg-light-300 shadow-none border-0">
                              <div className="card-body p-3 text-center">
                                <h5>01</h5>
                                <p className="fs-12">Late</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <ReactApexChart
                            id="student-chart"
                            className="mb-4"
                            options={studentDonutChart}
                            series={studentDonutChart.series}
                            type="donut"
                            height={210}
                          />
                          <Link
                            to={routes.studentAttendance}
                            className="btn btn-light"
                          >
                            <i className="ti ti-calendar-share me-1" />
                            View All
                          </Link>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-1">Total Earnings</h6>
                        <h2>$64,522,24</h2>
                      </div>
                      <span className="avatar avatar-lg bg-primary">
                        <i className="ti ti-user-dollar" />
                      </span>
                    </div>
                  </div>
                  {/* <div id="total-earning" /> */}
                  <ReactApexChart
                    id="total-earning"
                    options={totalEarningArea}
                    series={totalEarningArea.series}
                    type="area"
                    height={90}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {/* Fees Collection */}
              <div className="col-xxl-8 col-xl-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-header  d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Subscription</h4>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="bg-white dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        <i className="ti ti-calendar  me-2" />
                        Last 8 Quater
                      </Link>
                      <ul className="dropdown-menu mt-2 p-3">
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            This Month
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            This Year
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Last 12 Quater
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="dropdown-item rounded-1">
                            Last 16 Quater
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body pb-0">
                    <ReactApexChart
                      id="fees-chart"
                      options={feesBar}
                      series={feesBar.series}
                      type="bar"
                      height={270}
                    />
                  </div>
                </div>
              </div>
              {/* /Fees Collection */}
              {/* Leave Requests */}
              <div className="col-xxl-4 col-xl-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-header  d-flex align-items-center justify-content-between">
                    <h4 className="card-title">Total Time Spent</h4>
                    
                  </div>
                  <div className="card-body fixedtime">
                    {/* <div
                      className="alert alert-success d-flex align-items-center mb-24"
                      role="alert"
                    >
                      <i className="ti ti-info-square-rounded me-2 fs-14" />
                      <div className="fs-14">
                        These Result are obtained from the syllabus completion
                        on the respective Class
                      </div>
                    </div> */}
                    <ul className="list-group">
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Read Aloud</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "20%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Repeat Sentence</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-secondary rounded"
                                role="progressbar"
                                style={{ width: "30%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Describe Image</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-info rounded"
                                role="progressbar"
                                style={{ width: "40%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Re-tell Lecture</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-success rounded"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Answer Short Question</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-warning rounded"
                                role="progressbar"
                                style={{ width: "70%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Summarize Written Text</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-danger rounded"
                                role="progressbar"
                                style={{ width: "80%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Write Essay</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Reading & Writing FB</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Choose Multiple Answer</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Re-order Paraghraphs</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Reading FB</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Choose Multiple Answer</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Summarize Spoken test</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Fill in the Blank</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Highlight Correct Summary</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">MC, Choose Single Answer</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Select Missing Word</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Highlight Incorrect words</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-sm-4">
                            <p className="text-dark">Write From Dictation</p>
                          </div>
                          <div className="col-sm-8">
                            <div className="progress progress-xs flex-grow-1">
                              <div
                                className="progress-bar bg-primary rounded"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={30}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
              {/* /Leave Requests */}
            </div>
          </>
        </div>
      </div>
      {/* /Page Wrapper */}
      <AdminDashboardModal />
    </>
  );
};

export default AdminDashboard;
