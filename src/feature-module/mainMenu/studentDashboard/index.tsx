import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import CircleProgress from "./circleProgress";
import ReactApexChart from "react-apexcharts";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dayjs from "dayjs";
import { DatePicker } from "antd";

const StudentDasboard = () => {
  const routes = all_routes;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${month}-${day}-${year}`;
  const defaultValue = dayjs(formattedDate);
  const [date, setDate] = useState<Nullable<Date>>(null);

  const [attendance_chart] = useState<any>({
    chart: {
      height: 255,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },

    series: [60, 5, 15, 20],
    labels: ["Present", "Late", "Half Day", "Absent"],
    colors: ["#1ABE17", "#1170E4", "#E9EDF4", "#E82646"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
  });
  const [performance_chart] = useState<any>({
    chart: {
      type: "area",
      height: 355,
    },
    series: [
      {
        name: "Avg. Exam Score",
        data: [75, 68, 65, 68, 75], // Sample data
      },
      {
        name: "Avg. Attendance",
        data: [85, 78, 75, 78, 85], // Sample data
      },
    ],
    xaxis: {
      categories: [
        "Quarter 1",
        "Quarter 2",
        "Half yearly",
        "Model",
        "Final Exam",
      ],
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + "%";
        },
      },
      shared: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        return `<div class="apexcharts-tooltip">${w.globals.labels[dataPointIndex]}<br>Exam Score: <span style="color: #1E90FF;">${series[0][dataPointIndex]}%</span><br>Attendance: <span style="color: #00BFFF;">${series[1][dataPointIndex]}%</span></div>`;
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      yaxis: {
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "#78909C",
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
      },
    },
    markers: {
      size: 5,
      colors: ["#1E90FF", "#00BFFF"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    colors: ["#3D5EE1", "#6FCCD8"], // Color for the lines
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  });
  const [exam_result_chart] = useState<any>({
    chart: {
      type: "bar",
      height: 310,
    },
    series: [
      {
        name: "Marks",
        data: [100, 92, 90, 82, 90], // Corresponding scores for Maths, Physics, Chemistry, English, Spanish
      },
    ],
    xaxis: {
      categories: ["Mat", "Phy", "Che", "Eng", "Sci"],
    },
    plotOptions: {
      bar: {
        distributed: true,
        columnWidth: "50%",
        colors: {
          backgroundBarColors: ["#E9EDF4", "#fff"],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 5,
        },
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#E9EDF4", "#3D5EE1", "#E9EDF4", "#E9EDF4", "#E9EDF4"], // Set specific colors for each bar
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val + "%";
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "14px",
        colors: ["#304758"],
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },

    legend: {
      show: false,
    },
  });
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-next class-slides"
        style={{ ...style, display: "flex", top: "-60px", right: "0" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right" style={{ fontSize: "12px" }}></i>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-prev class-slides"
        style={{ ...style, display: "flex", top: "-60px", right: "30px" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left" style={{ fontSize: "12px" }}></i>
      </div>
    );
  }
  const profile = {
    dots: false,
    autoplay: false,
    slidesToShow: 5,
    margin: 24,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
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
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Student Dashboard</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Student Dashboard
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-xxl-12 d-flex">
              <div className="row flex-fill">
                {/* Profile */}
                <div className="col-xl-4">
                  <div className="flex-fill">
                    <div className="card bg-dark position-relative">
                      <div className="card-body">
                        <div className="d-flex align-items-center row-gap-3 mb-3">
                          <div className="avatar avatar-xxl rounded flex-shrink-0 me-3">
                            <ImageWithBasePath
                              src="assets/img/students/student-13.jpg"
                              alt="Img"
                            />
                          </div>
                          <div className="d-block">
                            <span className="badge bg-transparent-primary text-primary mb-1">
                              #ST1234546
                            </span>
                            <h3 className="text-truncate text-white mb-1">
                              Angelo Riana
                            </h3>
                            <div className="d-flex align-items-center flex-wrap row-gap-2 text-gray-2">
                              <span className="border-end me-2 pe-2">
                                Class : III, C
                              </span>
                              <span>Roll No : 36545</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between profile-footer flex-wrap row-gap-3 pt-4">
                          <div className="d-flex align-items-center">
                            <h6 className="text-white">1st Quarterly</h6>
                            <span className="badge bg-success d-inline-flex align-items-center ms-2">
                              <i className="ti ti-circle-filled fs-5 me-1" />
                              Pass
                            </span>
                          </div>
                          <Link to={routes.editStudent} className="btn btn-primary">
                            Edit Profile
                          </Link>
                        </div>
                        <div className="student-card-bg">
                          <ImageWithBasePath
                            src="assets/img/bg/circle-shape.png"
                            alt="Bg"
                          />
                          <ImageWithBasePath
                            src="assets/img/bg/shape-02.png"
                            alt="Bg"
                          />
                          <ImageWithBasePath
                            src="assets/img/bg/shape-04.png"
                            alt="Bg"
                          />
                          <ImageWithBasePath
                            src="assets/img/bg/blue-polygon.png"
                            alt="Bg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="card flex-fill">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <h4 className="card-titile">Fees Reminder</h4>
                        <Link to={routes.feesAssign} className="link-primary fw-medium">
                          View All
                        </Link>
                      </div>
                      <div className="card-body py-1">
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <div className="d-flex align-items-center overflow-hidden me-2">
                            <span className="bg-info-transparent avatar avatar-lg me-2 rounded-circle flex-shrink-0">
                              <i className="ti ti-bus-stop fs-16" />
                            </span>
                            <div className="overflow-hidden">
                              <h6 className="text-truncate mb-1">Transport Fees</h6>
                              <p>$2500</p>
                            </div>
                          </div>
                          <div className="text-end">
                            <h6 className="mb-1">Last Date</h6>
                            <p>25 May 2024</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <div className="d-flex align-items-center overflow-hidden me-2">
                            <span className="bg-success-transparent avatar avatar-lg me-2 rounded-circle flex-shrink-0">
                              <i className="ti ti-books fs-16" />
                            </span>
                            <div className="overflow-hidden">
                              <h6 className="text-truncate mb-1">Book Fees</h6>
                              <p>$2500</p>
                            </div>
                          </div>
                          <div className="text-end">
                            <h6 className="mb-1">Last Date</h6>
                            <p>25 May 2024</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <div className="d-flex align-items-center overflow-hidden me-2">
                            <span className="bg-info-transparent avatar avatar-lg me-2 rounded-circle flex-shrink-0">
                              <i className="ti ti-report-money fs-16" />
                            </span>
                            <div className="overflow-hidden">
                              <h6 className="text-truncate mb-1">Exam Fees</h6>
                              <p>$2500</p>
                            </div>
                          </div>
                          <div className="text-end">
                            <h6 className="mb-1">Last Date</h6>
                            <p>25 May 2024</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <div className="d-flex align-items-center overflow-hidden me-2">
                            <span className="bg-skyblue-transparent avatar avatar-lg me-2 rounded-circle flex-shrink-0">
                              <i className="ti ti-meat fs-16" />
                            </span>
                            <div className="overflow-hidden">
                              <h6 className="text-truncate mb-1">
                                Mess Fees{" "}
                                <span className="d-inline-flex align-items-center badge badge-soft-danger">
                                  <i className="ti ti-circle-filled me-1 fs-5" />
                                  Due
                                </span>
                              </h6>
                              <p className="text-danger">$2500 + $150</p>
                            </div>
                          </div>
                          <div className="text-end">
                            <h6 className="mb-1">Last Date</h6>
                            <p>27 May 2024</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <div className="d-flex align-items-center overflow-hidden me-2">
                            <span className="bg-danger-transparent avatar avatar-lg me-2 rounded-circle flex-shrink-0">
                              <i className="ti ti-report-money fs-16" />
                            </span>
                            <div className="overflow-hidden">
                              <h6 className="text-truncate mb-1">Hostel</h6>
                              <p>$2500</p>
                            </div>
                          </div>
                          <div className="text-end">
                            <h6 className="mb-1">Last Date</h6>
                            <p>25 May 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Profile */}
                {/* Attendance */}
                <div className="col-xl-4 d-flex">
                  <div className="card flex-fill">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h4 className="card-title">Attendance</h4>
                      <div className="card-dropdown">
                        <Link
                          to="#"
                          className="dropdown-toggle p-2"
                          data-bs-toggle="dropdown"
                        >
                          <span>
                            <i className="ti ti-calendar-due" />
                          </span>
                          This Week
                        </Link>
                        <div className="dropdown-menu  dropdown-menu-end">
                          <ul>
                            <li>
                              <Link to="#">This Week</Link>
                            </li>
                            <li>
                              <Link to="#">Last Week</Link>
                            </li>
                            <li>
                              <Link to="#">Last Month</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="attendance-chart">
                        <p className="mb-3">
                          <i className="ti ti-calendar-heart text-primary me-2" />
                          No of total working days{" "}
                          <span className="fw-medium text-dark"> 28 Days</span>
                        </p>
                        <div className="border rounded p-3">
                          <div className="row">
                            <div className="col text-center border-end">
                              <p className="mb-1">Present</p>
                              <h5>25</h5>
                            </div>
                            <div className="col text-center border-end">
                              <p className="mb-1">Absent</p>
                              <h5>2</h5>
                            </div>
                            <div className="col text-center">
                              <p className="mb-1">Halfday</p>
                              <h5>0</h5>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div id="attendance_chart" />
                          <ReactApexChart
                            id="attendance_chart"
                            options={attendance_chart}
                            series={attendance_chart.series}
                            type="donut"
                            height={255}
                          />
                        </div>
                        <div className="bg-light-300 rounded border p-3 mb-0">
                          <div className="d-flex align-items-center justify-content-between flex-wrap mb-1">
                            <h6 className="mb-2">Last 7 Days </h6>
                            <p className="fs-12 mb-2">
                              14 May 2024 - 21 May 2024
                            </p>
                          </div>
                          <div className="d-flex align-items-center rounded gap-1 flex-wrap">
                            <Link
                              to="#"
                              className="badge badge-lg bg-success text-white"
                            >
                              M
                            </Link>
                            <Link
                              to="#"
                              className="badge badge-lg bg-success text-white"
                            >
                              T
                            </Link>
                            <Link
                              to="#"
                              className="badge badge-lg bg-success text-white"
                            >
                              W
                            </Link>
                            <Link
                              to="#"
                              className="badge badge-lg bg-success text-white"
                            >
                              T
                            </Link>
                            <Link
                              to="#"
                              className="badge badge-lg bg-danger text-white"
                            >
                              F
                            </Link>
                            <Link
                              to="#"
                              className="badge badge-lg bg-white border text-default"
                            >
                              S
                            </Link>
                            <Link
                              to="#"
                              className="badge badge-lg  bg-white border text-gray-1"
                            >
                              S
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 d-flex">
                  <div className="card flex-fill">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h4 className="card-titile">Home Works</h4>
                      <div className="dropdown">
                        <Link
                          to="#"
                          className="bg-white dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <i className="ti ti-book-2 me-2" />
                          All Subject
                        </Link>
                        <ul className="dropdown-menu mt-2 p-3">
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              Physics
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              Chemistry
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item rounded-1">
                              Maths
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body py-1">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item py-3 px-0 pb-0">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center overflow-hidden mb-3">
                              <Link
                                to="#"
                                className="avatar avatar-xl flex-shrink-0 me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/home-work/home-work-01.jpg"
                                  alt="img"
                                />
                              </Link>
                              <div className="overflow-hidden">
                                <p className="d-flex align-items-center text-info mb-1">
                                  <i className="ti ti-tag me-2" />
                                  Physics
                                </p>
                                <h6 className="text-truncate mb-1">
                                  <Link to={routes.classHomeWork}>
                                    Write about Theory of Pendulum
                                  </Link>
                                </h6>
                                <div className="d-flex align-items-center flex-wrap">
                                  <div className="d-flex align-items-center border-end me-1 pe-1">
                                    <Link
                                      to={routes.teacherDetails}
                                      className="avatar avatar-xs flex-shrink-0 me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/teachers/teacher-01.jpg"
                                        className="rounded-circle"
                                        alt="teacher"
                                      />
                                    </Link>
                                    <p className="text-dark">Aaron</p>
                                  </div>
                                  <p>Due by : 16 Jun 2024</p>
                                </div>
                              </div>
                            </div>
                            <CircleProgress value={80} />
                          </div>
                        </li>
                        <li className="list-group-item py-3 px-0 pb-0">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center overflow-hidden mb-3">
                              <Link
                                to="#"
                                className="avatar avatar-xl flex-shrink-0 me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/home-work/home-work-02.jpg"
                                  alt="img"
                                />
                              </Link>
                              <div className="overflow-hidden">
                                <p className="d-flex align-items-center text-success mb-1">
                                  <i className="ti ti-tag me-2" />
                                  Chemistry
                                </p>
                                <h6 className="text-truncate mb-1">
                                  <Link to={routes.classHomeWork}>
                                    Chemistry - Change of Elements
                                  </Link>
                                </h6>
                                <div className="d-flex align-items-center flex-wrap">
                                  <div className="d-flex align-items-center border-end me-1 pe-1">
                                    <Link
                                      to={routes.teacherDetails}
                                      className="avatar avatar-xs flex-shrink-0 me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/teachers/teacher-01.jpg"
                                        className="rounded-circle"
                                        alt="teacher"
                                      />
                                    </Link>
                                    <p className="text-dark">Hellana</p>
                                  </div>
                                  <p>Due by : 16 Jun 2024</p>
                                </div>
                              </div>
                            </div>

                            <CircleProgress value={65} />
                          </div>
                        </li>
                        <li className="list-group-item py-3 px-0 pb-0">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center overflow-hidden mb-3">
                              <Link
                                to="#"
                                className="avatar avatar-xl flex-shrink-0 me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/home-work/home-work-03.jpg"
                                  alt="img"
                                />
                              </Link>
                              <div className="overflow-hidden">
                                <p className="d-flex align-items-center text-danger mb-1">
                                  <i className="ti ti-tag me-2" />
                                  Maths
                                </p>
                                <h6 className="text-truncate mb-1">
                                  <Link to={routes.classHomeWork}>
                                    Maths - Problems to Solve Page 21
                                  </Link>
                                </h6>
                                <div className="d-flex align-items-center flex-wrap">
                                  <div className="d-flex align-items-center border-end me-1 pe-1">
                                    <Link
                                      to={routes.teacherDetails}
                                      className="avatar avatar-xs flex-shrink-0 me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/teachers/teacher-01.jpg"
                                        className="rounded-circle"
                                        alt="teacher"
                                      />
                                    </Link>
                                    <p className="text-dark">Morgan</p>
                                  </div>
                                  <p>Due by : 21 Jun 2024</p>
                                </div>
                              </div>
                            </div>
                            <CircleProgress value={30} />
                          </div>
                        </li>
                        <li className="list-group-item py-3 px-0 pb-0">
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div className="d-flex align-items-center overflow-hidden mb-3">
                              <Link
                                to="#"
                                className="avatar avatar-xl flex-shrink-0 me-2"
                              >
                                <ImageWithBasePath
                                  src="assets/img/home-work/home-work-04.jpg"
                                  alt="img"
                                />
                              </Link>
                              <div className="overflow-hidden">
                                <p className="d-flex align-items-center text-skyblue mb-1">
                                  <i className="ti ti-tag me-2" />
                                  Engish
                                </p>
                                <h6 className="text-truncate mb-1">
                                  <Link to={routes.classHomeWork}>
                                    English - Vocabulary Introduction
                                  </Link>
                                </h6>
                                <div className="d-flex align-items-center flex-wrap">
                                  <div className="d-flex align-items-center border-end me-1 pe-1">
                                    <Link
                                      to={routes.teacherDetails}
                                      className="avatar avatar-xs flex-shrink-0 me-2"
                                    >
                                      <ImageWithBasePath
                                        src="assets/img/teachers/teacher-01.jpg"
                                        className="rounded-circle"
                                        alt="teacher"
                                      />
                                    </Link>
                                    <p className="text-dark">Daniel Josua</p>
                                  </div>
                                  <p>Due by : 21 Jun 2024</p>
                                </div>
                              </div>
                            </div>
                            <CircleProgress value={10} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Home Works */}

            {/* /Home Works */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default StudentDasboard;
