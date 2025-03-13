import React, { useState } from "react";

const DashBoardPop: React.FC = () => {
  const [webImage, setWebImage] = useState<string | null>(null);
  const [mobileImage, setMobileImage] = useState<string | null>(null);
  const [webActive, setWebActive] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  const handleWebImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setWebImage(URL.createObjectURL(file));
    }
  };

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMobileImage(URL.createObjectURL(file));
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
            {/* Web Banner Section */}
            <div className="col-md-6">
              <div className="card p-4">
                <h3 className="mb-3 text-primary">Web Banner Dashboard Update</h3>
                {/* <div className="mb-3">
                  <label className="form-label fw-bold">Active</label>
                  <input
                    type="checkbox"
                    checked={webActive}
                    onChange={() => setWebActive(!webActive)}
                    className="ms-2"
                  />
                </div> */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleWebImageChange}
                  />
                  {webImage && (
                    <img
                      src={webImage}
                      alt="Web Banner Preview"
                      className="mt-3"
                      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    />
                  )}
                </div>
                <button className="btn btn-primary w-100">UPDATE</button>
              </div>
            </div>

            {/* Mobile Banner Section */}
            <div className="col-md-6">
              <div className="card p-4">
                <h3 className="mb-3 text-primary">Mobile Banner Dashboard Update</h3>
                {/* <div className="mb-3">
                  <label className="form-label fw-bold">Active</label>
                  <input
                    type="checkbox"
                    checked={mobileActive}
                    onChange={() => setMobileActive(!mobileActive)}
                    className="ms-2"
                  />
                </div> */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleMobileImageChange}
                  />
                  {mobileImage && (
                    <img
                      src={mobileImage}
                      alt="Mobile Banner Preview"
                      className="mt-3"
                      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                    />
                  )}
                </div>
                <button className="btn btn-primary w-100">UPDATE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPop;
