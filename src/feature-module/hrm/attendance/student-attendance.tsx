import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import AttandanceDatatable from "../../../core/common/dataTable/AttandanceDatatable";
import { all_routes } from "../../router/all_routes";
import { fetchAllStudents, createAttendance } from "../../../api/masterAPI";
import { image_url } from "../../../environment";

interface Student {
  id: number;
  name: string;
  mobileNo: string;
  profile_image?: string;
}

const StudentAttendance = () => {
  const routes = all_routes;

  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceData, setAttendanceData] = useState<
    { status: string; remarks: string }[]
  >([]);
  const [attendanceDate, setAttendanceDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetchAllStudents();
      if (response.success) {
        setStudents(response.data);
        setAttendanceData(
          response.data.map(() => ({ status: "Present", remarks: "" }))
        );
      } else {
        setAlert({ type: "danger", message: "Failed to fetch students" });
      }
    } catch {
      setAlert({
        type: "danger",
        message: "An error occurred while fetching students",
      });
    }
  };

  const handleStatusChange = (index: number, value: string) => {
    const updated = [...attendanceData];
    updated[index].status = value;
    setAttendanceData(updated);
  };

  const handleRemarksChange = (index: number, value: string) => {
    const updated = [...attendanceData];
    updated[index].remarks = value;
    setAttendanceData(updated);
  };

  const handleSubmit = async () => {
    const payload = students.map((student, index) => {
      const data: any = {
        user_id: student.id,
        institute_id: 1, // Replace if dynamic
        date: attendanceDate,
        status: attendanceData[index].status,
      };

      if (attendanceData[index].status === "Present") {
        data.check_in_time = "09:00:00";
        data.check_out_time = "16:30:00";
      } else {
        data.remarks = attendanceData[index].remarks;
      }

      return data;
    });

    try {
      const response = await createAttendance(payload);
      if (response.success) {
        setAlert({ type: "success", message: "Attendance submitted successfully." });
      } else {
        setAlert({ type: "danger", message: "Submission failed." });
      }
    } catch (error) {
      setAlert({
        type: "danger",
        message: "An error occurred during submission.",
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: Student) => (
        <div className="d-flex align-items-center">
          <ImageWithBasePath
            src={record.profile_image ?? ""}
            className="img-fluid rounded-circle"
            alt="img"
          />
          <div className="ms-2">
            <p className="text-dark mb-0">
              <Link to="#">{text}</Link>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      render: (_: any, record: Student, index: number) => (
        <div className="d-flex align-items-center check-radio-group flex-nowrap">
          {["Present", "Absent", "Leave"].map((status) => (
            <label key={status} className="custom-radio me-2">
              <input
                type="radio"
                name={`attendance_${record.id}`}
                value={status}
                checked={attendanceData[index]?.status === status}
                onChange={() => handleStatusChange(index, status)}
              />
              <span className="checkmark" />
              {status}
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      render: (_: any, __: Student, index: number) => (
        <input
          type="text"
          className="form-control"
          placeholder="Enter remarks"
          value={attendanceData[index]?.remarks}
          onChange={(e) => handleRemarksChange(index, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
          <div className="my-auto mb-2">
            <h3 className="page-title mb-1">Student Attendance</h3>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to={routes.adminDashboard}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Report</Link>
                </li>
                <li className="breadcrumb-item active">Student Attendance</li>
              </ol>
            </nav>

            <div className="mt-3">
              <label className="form-label mb-1">Select Date:</label>
              <input
                type="date"
                className="form-control"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
          </div>

          <button className="btn btn-primary mt-3 mt-md-0" onClick={handleSubmit}>
            Submit Attendance
          </button>
        </div>

        {alert && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}

        <div className="card">
          <div className="card-body p-0 py-3">
            <AttandanceDatatable
              key={students.length}
              dataSource={students}
              columns={columns}
              Selection={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
