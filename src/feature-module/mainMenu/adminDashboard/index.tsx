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
              {/* <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                  <div className="mb-2">
                    <Link
                      to={routes.addStudent}
                      className="btn btn-primary d-flex align-items-center me-3"
                    >
                      <i className="ti ti-square-rounded-plus me-2" />
                      Add New Student
                    </Link>
                  </div>
                  <div className="mb-2">
                    <Link
                      to={routes.collectFees}
                      className="btn btn-light d-flex align-items-center"
                    >
                      Fees Details
                    </Link>
                  </div>
                </div> */}
            </div>
            {/* /Page Header */}
            {/* <div className="row">
              <div className="col-md-12">
                <div className="alert-message">
                  <div
                    className="alert alert-success rounded-pill d-flex align-items-center justify-content-between border-success mb-4"
                    role="alert"
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-1 avatar avatar-sm flex-shrink-0">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-27.jpg"
                          alt="Img"
                          className="img-fluid rounded-circle"
                        />
                      </span>
                      <p>
                        Fahed III,C has paid Fees for the{" "}
                        <strong className="mx-1">“Term1”</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close p-0"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    >
                      <span>
                        <i className="ti ti-x" />
                      </span>
                    </button>
                  </div>
                </div>
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
                          <Link
                            to="profile"
                            className="avatar avatar-sm img-rounded bg-gray-800 dark-hover"
                          >
                            <i className="ti ti-edit text-white" />
                          </Link>
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
            </div> */}
            <div className="row">
              {/* Total Students */}
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl bg-danger-transparent me-2 p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/student.svg"
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
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">3643</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">11</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Students */}
              {/* Total Teachers */}
              <div className="col-xxl-3 col-sm-3 d-flex">
                <div className="card flex-fill animate-card border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-xl me-2 bg-secondary-transparent p-1">
                        <ImageWithBasePath
                          src="assets/img/icons/teacher.svg"
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
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">254</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">30</span>
                      </p>
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
                          src="assets/img/icons/staff.svg"
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
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">161</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">02</span>
                      </p>
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
                        <p>Subscription</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">81</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">01</span>
                      </p>
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
                        <p>Mock Test</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">81</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">01</span>
                      </p>
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
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">81</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">01</span>
                      </p>
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
                        <p>Active User </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">81</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">01</span>
                      </p>
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
                        <p>Inactive User </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top mt-3 pt-3">
                      <p className="mb-0">
                        Active :{" "}
                        <span className="text-dark fw-semibold">81</span>
                      </p>
                      <span className="text-light">|</span>
                      <p>
                        Inactive :{" "}
                        <span className="text-dark fw-semibold">01</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Subjects */}
            </div>
            <div className="row">
              {/* Total Earnings */}
              <div className="col-xxl-4 col-xl-6">
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
              <div className="col-xxl-4 col-xl-6">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-1">Total Expenses</h6>
                        <h2>$60,522,24</h2>
                      </div>
                      <span className="avatar avatar-lg bg-danger">
                        <i className="ti ti-user-dollar" />
                      </span>
                    </div>
                  </div>
                  <div id="total-expenses" />
                  <ReactApexChart
                    id="total-expenses"
                    options={totalExpenseArea}
                    series={totalExpenseArea.series}
                    type="area"
                    height={90}
                  />
                </div>
              </div>
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
