import React, { useState } from "react";

const LoginBanner: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

  // Handle image change
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
            <h2>Login Banner Update</h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card p-4">
                {/* Active Checkbox */}
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="activeCheckbox"
                      checked={isActive}
                      onChange={() => setIsActive(!isActive)}
                    />
                    <label className="form-check-label fw-bold" htmlFor="activeCheckbox">
                      Active
                    </label>
                  </div>
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

export default LoginBanner;
