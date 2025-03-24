import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import Swal from "sweetalert2";
import AlertComponent from "../../core/common/AlertComponent";
import {
  fetchAllTimetables,
  createTimetable,
  updateTimetable,
  deleteTimetable,
  fetchTimetableById,
} from "../../api/masterAPI";

// ✅ Define Types
interface TaskData {
  id: number;
  week: string;
  description: string;
  time: string;
  days: { day: string; task: string }[];
}

const TimeTable: React.FC = () => {
  const [week, setWeek] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [tasks, setTasks] = useState<{ day: string; task: string }[]>([
    { day: "Monday", task: "" },
    { day: "Tuesday", task: "" },
    { day: "Wednesday", task: "" },
    { day: "Thursday", task: "" },
    { day: "Friday", task: "" },
  ]);
  const [timetables, setTimetables] = useState<TaskData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type?: "success" | "danger"; message: string }>({ type: undefined, message: "" });

  // ✅ Fetch Timetables from API
  const loadTimetables = async () => {
    try {
      const response = await fetchAllTimetables();
     
      if (response.success) {
        setTimetables(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch timetables" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching timetables" });
    }
  };

  useEffect(() => {
    loadTimetables();
  }, []);

  // ✅ Handle Task Change
  const handleTaskChange = (index: number, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].task = value;
    setTasks(updatedTasks);
  };

  // ✅ Handle Form Submit (Add/Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!week || !description || !time) {
      setAlert({ type: "danger", message: "All fields are required" });
      return;
    }

    const timetableData = { week, description, time, days: tasks };

    try {
      if (editId !== null) {
        await updateTimetable(editId, timetableData);
        setAlert({ type: "success", message: "Timetable updated successfully!" });
      } else {
        await createTimetable(timetableData);
        setAlert({ type: "success", message: "Timetable created successfully!" });
      }

      await loadTimetables();
      resetForm();
    } catch (error) {
      setAlert({ type: "danger", message: "Error submitting timetable" });
    }
  };

  // ✅ Handle Edit
  const handleEdit = async (id: number) => {
    try {
      const response = await fetchTimetableById(id);
      if (response.success) {
        const timetable = response.data;
        setWeek(timetable.week);
        setDescription(timetable.description);
        setTime(timetable.time);
        setTasks(timetable.days);
        setEditId(id);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch timetable details" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching timetable details" });
    }
  };

  // ✅ Handle Delete with SweetAlert
  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTimetable(id);
          Swal.fire("Deleted!", "Timetable has been deleted.", "success");
          await loadTimetables();
        } catch (error) {
          Swal.fire("Error!", "Error deleting timetable.", "error");
        }
      }
    });
  };

  // ✅ Reset Form
  const resetForm = () => {
    setWeek("");
    setDescription("");
    setTime("");
    setTasks([
      { day: "Monday", task: "" },
      { day: "Tuesday", task: "" },
      { day: "Wednesday", task: "" },
      { day: "Thursday", task: "" },
      { day: "Friday", task: "" },
    ]);
    setEditId(null);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        {alert.message && <AlertComponent type={alert.type ?? "primary"} message={alert.message} onClose={() => setAlert({ type: undefined, message: "" })} />}

        <div className="heading mb-4">
          <h2>Study Plan</h2>
        </div>

        <div className="card p-4">
          {/* ✅ Form Section */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Week */}
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-bold">Week:</label>
                  <input type="text" className="form-control" value={week} onChange={(e) => setWeek(e.target.value)} required />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Description:</label>
                  <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                {/* Time */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Time:</label>
                  <input type="text" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
              </div>

              {/* ✅ Timetable Section */}
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label fw-bold">Timetable:</label>
                  <table className="table table-bordered">
                    <thead>
                      <tr style={{ backgroundColor: "#33b5e5", color: "#fff" }}>
                        <th style={{ width: "30%" }}>Day</th>
                        <th>Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={index}>
                          <td>
                            <strong>{task.day}</strong>
                          </td>
                          <td>
                            <textarea className="form-control" value={task.task} onChange={(e) => handleTaskChange(index, e.target.value)}></textarea>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ✅ Save Button */}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                {editId !== null ? "UPDATE" : "SUBMIT"}
              </button>
            </div>
          </form>

          {/* ✅ Data Table */}
          <div className="mt-4">
            <Table key={timetables.length} dataSource={timetables} columns={[
              { title: "Week", dataIndex: "week" },
              { title: "Description", dataIndex: "description" },
              { title: "Time", dataIndex: "time" },
              { title: "Actions", render: (row: TaskData) => 
              
                <>
                {/* ✅ Edit Button */}
                <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(row.id)}>
                  <i className="fa fa-pencil"></i>
                </button>
          
                {/* ✅ Delete Button - Removed Bootstrap Modal Trigger */}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </>
            
            }
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
