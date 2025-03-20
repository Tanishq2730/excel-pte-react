import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

// ✅ Define Types
interface TaskData {
  id: number;
  week: string;
  description: string;
  time: string;
}

const DUMMY_DATA: TaskData[] = [
  {
    id: 1,
    week: "Week 1",
    description: "PTE Online Group Class",
    time: "21:00",
  },
  {
    id: 2,
    week: "Week 2",
    description: "PTE Online Group Class",
    time: "21:00",
  },
];

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

  const [data, setData] = useState<TaskData[]>(DUMMY_DATA);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ Handle Task Change
  const handleTaskChange = (index: number, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].task = value;
    setTasks(updatedTasks);
  };

  // ✅ Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (week && description && time) {
      const newData: TaskData = {
        id: data.length + 1,
        week,
        description,
        time,
      };
      setData((prev) => [...prev, newData]);

      // ✅ Reset Form
      setWeek("");
      setDescription("");
      setTime("");
    }
  };

  // ✅ Handle Edit
  const handleEdit = (record: TaskData) => {
    setWeek(record.week);
    setDescription(record.description);
    setTime(record.time);

    // ✅ Remove from table on edit
    setData((prev) => prev.filter((item) => item.id !== record.id));
  };

  // ✅ Handle Delete
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  // ✅ Confirm Delete from Modal
  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setData((prev) => prev.filter((item) => item.id !== deleteId));
      setDeleteId(null);
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "#",
      dataIndex: "id",
    },
    {
      title: "Week",
      dataIndex: "week",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Actions",
      render: (_: any, record: TaskData) => (
        <>
          {/* ✅ Edit Button */}
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => handleEdit(record)}
          >
            <i className="bi bi-pencil"></i> Edit
          </button>

          {/* ✅ Delete Button */}
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => handleDelete(record.id)}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {/* ✅ Delete Confirmation Modal */}
      <div
        id="deleteModal"
        className="modal fade"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body py-5 text-center">
              <i
                className="fa fa-trash"
                style={{ color: "red", fontSize: "2rem", marginBottom: "1em" }}
              />
              <p>Are you sure you want to delete this task?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{marginRight:'1em'}}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Page Content */}
      <div className="page-wrapper">
        <div className="content">
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
                    <input
                      type="text"
                      className="form-control"
                      value={week}
                      onChange={(e) => setWeek(e.target.value)}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* ✅ Start Time */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Start Time:</label>
                    <input
                      type="time"
                      className="form-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
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
                              <textarea
                                className="form-control"
                                value={task.task}
                                onChange={(e) =>
                                  handleTaskChange(index, e.target.value)
                                }
                              ></textarea>
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
                  SAVE
                </button>
              </div>
            </form>

            {/* ✅ Data Table */}
            <div className="mt-4">
              <Table key={data.length} dataSource={data} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
