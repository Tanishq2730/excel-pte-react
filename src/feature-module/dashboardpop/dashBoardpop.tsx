import React, { useState } from "react";
import CommonSelect from "../../core/common/commonSelect";

const DashBoardPop: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("web");
  const [image, setImage] = useState<string | null>(null);

  // Static data for dropdown
  const bannerUpdate = [
    { label: "Web Banner", value: "web" },
    { label: "Mobile Banner", value: "mobile" }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container mt-4">
          <div className="heading mb-4">
            <h2>Advertisement Update</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card p-4">
                <h3 className="mb-3 text-primary">Dashboard Banner Update</h3>

                {/* Dropdown */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Select Type</label>
                  <CommonSelect
                    className="select"
                    options={bannerUpdate}
                    defaultValue={bannerUpdate[0]}
                    // onChange={(selected) => setSelectedType(selected?.value)}
                  />
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Update Button */}
                <button className="btn btn-primary w-100">UPDATE</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3">
                {image && (
                  <img
                    src={image}
                    alt="Banner Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPop;
