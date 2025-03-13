import React, { useState } from "react";

const UpComingClass: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>Add Upcoming Classes</h2>
        </div>
        <div className="card p-4 mt-4">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              {/* Title */}
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date */}
              <div className="col-md-6">
                <label className="form-label">Dates:</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              {/* Time */}
              <div className="col-md-6">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Type */}
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  placeholder="Enter type (e.g., Live Class)"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Link */}
            <div className="mb-3">
              <label className="form-label">Link</label>
              <input
                type="url"
                className="form-control"
                name="link"
                placeholder="Enter link"
                value={formData.link}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" className="btn btn-info text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpComingClass;
