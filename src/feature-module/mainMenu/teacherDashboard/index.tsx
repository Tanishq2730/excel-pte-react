import React, { useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import AdminDashboardModal from "../adminDashboard/adminDashboardModal";
import ReactApexChart from "react-apexcharts";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dayjs from "dayjs";
import { DatePicker } from "antd";

const TeacherDashboard = () => {
  const routes = all_routes;
  const [date, setDate] = useState<Nullable<Date>>(null);
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-next class-slides"
        style={{ ...style, display: "flex", top: "-72%", left: "22%" }}
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
        style={{ ...style, display: "flex", top: "-72%", left: "17%" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left" style={{ fontSize: "12px" }}></i>
      </div>
    );
  }
  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 4,
    margin: 24,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
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
  const Syllabus = {
    dots: false,
    autoplay: false,
    arrows: false,
    slidesToShow: 4,
    margin: 24,
    speed: 500,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
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
  const [studentDonutChart] = useState<any>({
    chart: {
      height: 90,
      type: "donut",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
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

    series: [95, 5],
    labels: ["Completed", "Pending"],
    legend: { show: false },
    colors: ["#1ABE17", "#E82646"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [attendance_chart] = useState<any>({
    chart: {
      height: 290,
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
            position: "left",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
  });
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${month}-${day}-${year}`;
  const defaultValue = dayjs(formattedDate);

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="page-title mb-1">Teacher Dashboard</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-12 col-xl-12">
              <div className="row">
                <div className="col-xxl-6 col-xl-6">
                  <div className="card bg-dark position-relative flex-fill">
                    <div className="card-body pb-1">
                      <div className="align-items-center justify-content-between row-gap-3">
                        <div className="d-flex align-items-center overflow-hidden mb-3">
                          <div className="avatar avatar-xxl rounded flex-shrink-0 border border-2 border-white me-3">
                            <ImageWithBasePath
                              src="assets/img/teachers/teacher-05.jpg"
                              alt="Img"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <span className="badge bg-transparent-primary text-primary mb-1">
                              Active
                            </span>
                            <h3 className="text-white mb-1 text-truncate">
                              Meera Jain
                            </h3>
                            <div className="d-flex align-items-center flex-wrap text-light row-gap-2">
                              <span className="me-2">meera@gmail.com |</span>
                              <span className="d-flex align-items-center">
                                8376573756
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="innerdata">
                          <p className="text-white mb-1"><b>Date of Joining :- </b>23/4/2024</p>
                          <p className="text-white mb-1"><b>Last Login :- </b>23/4/2024</p>
                          <p className="text-white mb-2"><b>Permission :- </b>Teacher</p>
                        </div>
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
                <div className="col-xxl-6 col-xl-6 col-md-6">
                  <div className="card flex-fill">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h4 className="card-title">Attendance</h4>
                    </div>
                    <div className="card-body pb-0">
                      <div className="bg-light-300 rounde border p-3 mb-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <h6 className="mb-2">Last 7 Days </h6>
                          <p className="mb-2">14 May 2024 - 21 May 2024</p>
                        </div>
                        <div className="d-flex align-items-center gap-1 flex-wrap">
                          <Link to="#" className="badge badge-lg bg-success">
                            M
                          </Link>
                          <Link to="#" className="badge badge-lg bg-success">
                            T
                          </Link>
                          <Link to="#" className="badge badge-lg bg-success">
                            W
                          </Link>
                          <Link to="#" className="badge badge-lg bg-success">
                            T
                          </Link>
                          <Link to="#" className="badge badge-lg bg-danger">
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
                          <div className="col text-center border-end">
                            <p className="mb-1">Halfday</p>
                            <h5>0</h5>
                          </div>
                          <div className="col text-center">
                            <p className="mb-1">Late</p>
                            <h5>1</h5>
                          </div>
                        </div>
                      </div>
                      <div className="attendance-chart text-center">
                        {/* <div id="attendance_chart" /> */}
                        <ReactApexChart
                          id="attendance_chart"
                          className="mb-3 mb-sm-0 text-center text-sm-start"
                          options={attendance_chart}
                          series={attendance_chart.series}
                          type="donut"
                          height={250}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default TeacherDashboard;
