import React, { useState, useEffect } from "react";
import { bannerSave, fetchBanner } from "../../api/masterAPI";
import { image_url } from "../../environment";
import AlertComponent from "../../core/common/AlertComponent";

const LoginBanner: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  // ✅ Fetch existing banner on mount
  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await fetchBanner();
        console.log(response, "response");

        if (response.success && response.data) {
          setImage(response.data.image ? `${image_url}${response.data.image}` : null);
        }
      } catch (err) {
        setError("Failed to load banner");
      }
    };

    getBanner();
  }, []);

  // ✅ Handle image selection with validation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!validTypes.includes(file.type)) {
        setImageError("Only JPG, JPEG, and PNG files are allowed.");
        setSelectedFile(null);
        setImage(null);
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setImageError("File size should not exceed 2MB.");
        setSelectedFile(null);
        return;
      }

      setImageError(null); // ✅ Reset error if valid
      setSelectedFile(file);
      setImage(URL.createObjectURL(file)); // Show preview
    }
  };

  // ✅ Handle update
  const handleUpdate = async () => {
    if (imageError) return; // ✅ Prevent upload if invalid image

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      formData.append("status", isActive ? "active" : "inactive");

      const response = await bannerSave(formData);
      if (response.success) {
        setSuccess("Banner updated successfully!");
      } else {
        throw new Error(response.error || "Failed to update banner");
      }
    } catch (err) {
      setError("Failed to update banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container mt-4">
          <div className="heading mb-4">
            <h2>Login Banner Update</h2>
          </div>

          {/* ✅ Show Alerts */}
          {error && <AlertComponent type="danger" message={error} onClose={() => setError(null)} />}
          {success && <AlertComponent type="success" message={success} onClose={() => setSuccess(null)} />}

          <div className="row">
            <div className="col-md-6">
              <div className="card p-4">
                {/* ✅ Active Checkbox */}
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

                {/* ✅ Image Upload */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input type="file" className="form-control" onChange={handleImageChange} />
                  {imageError && <small className="text-danger">{imageError}</small>}
                </div>

                {/* ✅ Update Button */}
                <button className="btn btn-primary w-100" onClick={handleUpdate} disabled={loading || !!imageError}>
                  {loading ? "Updating..." : "UPDATE"}
                </button>
              </div>
            </div>

            {/* ✅ Preview Section */}
            <div className="col-md-6">
              <div className="card p-3">
                {image ? (
                  <img
                    src={image}
                    alt="Banner Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <div className="text-center text-muted">No Banner Available</div>
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
