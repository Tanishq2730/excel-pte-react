import React, { useState, useEffect } from "react";
import CommonSelect from "../../core/common/commonSelect";
import { fetchAllAds, createAd, updateAd } from "../../api/masterAPI";
import { image_url } from "../../environment";
import AlertComponent from "../../core/common/AlertComponent";

// ✅ Define Type for Ads
interface Ad {
  id: number;
  type: string;
  image_url: string | null;
}

const DashBoardPop: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("web");
  const [images, setImages] = useState<{ web: string | null; mobile: string | null }>({
    web: null,
    mobile: null,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [adIds, setAdIds] = useState<{ web: number | null; mobile: number | null }>({
    web: null,
    mobile: null,
  });
  const [adsData, setAdsData] = useState<Ad[]>([]); // ✅ Store all ads

  // ✅ Banner options
  const bannerUpdate = [
    { label: "Web Banner", value: "web" },
    { label: "Mobile Banner", value: "mobile" }
  ];

  // ✅ Fetch existing ads on mount
  useEffect(() => {
    const loadAds = async () => {
      try {
        const response = await fetchAllAds();
        if (response.success && response.data.length > 0) {
          setAdsData(response.data as Ad[]); // ✅ Ensure correct type

          const webAd: Ad | undefined = response.data.find((ad: Ad) => ad.type === "web");
          const mobileAd: Ad | undefined = response.data.find((ad: Ad) => ad.type === "mobile");

          setAdIds({
            web: webAd ? webAd.id : null,
            mobile: mobileAd ? mobileAd.id : null,
          });

          setImages({
            web: webAd ? `${image_url}${webAd.image_url}` : null,
            mobile: mobileAd ? `${image_url}${mobileAd.image_url}` : null,
          });
        }
      } catch (err) {
        setError("Failed to load advertisements");
      }
    };

    loadAds();
  }, []);

  // ✅ Update Image when type changes
  useEffect(() => {
    if (adsData.length > 0) {
      updateImageForType(selectedType, adsData);
    }
  }, [selectedType]);

  // ✅ Function to update image when type changes
  const updateImageForType = (type: string, ads: Ad[]) => {
    const matchingAd = ads.find((ad: Ad) => ad.type === type);
    if (matchingAd) {
      setAdIds((prev) => ({ ...prev, [type]: matchingAd.id }));
      setImages((prev) => ({ ...prev, [type]: matchingAd.image_url ? `${image_url}${matchingAd.image_url}` : null }));
    } else {
      setAdIds((prev) => ({ ...prev, [type]: null }));
      setImages((prev) => ({ ...prev, [type]: null }));
    }
  };

  // ✅ Handle image selection with validation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setError("Only JPG, JPEG, and PNG files are allowed.");
        setSelectedFile(null);
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("File size should not exceed 2MB.");
        setSelectedFile(null);
        return;
      }

      setError(null);
      setSelectedFile(file);
      setImages((prev) => ({ ...prev, [selectedType]: URL.createObjectURL(file) }));
    }
  };

  // ✅ Handle ad update or creation
  const handleUpdate = async () => {
    if (!selectedFile && !images[selectedType as keyof typeof images]) {
      setError("Please select an image before updating.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      formData.append("type", selectedType);
      formData.append("active", "true");

      let response;
      if (adIds[selectedType as keyof typeof adIds]) {
        response = await updateAd(adIds[selectedType as keyof typeof adIds]!, formData);
      } else {
        response = await createAd(formData);
      }

      if (response.success) {
        setSuccess("Advertisement updated successfully!");
      } else {
        throw new Error(response.error || "Failed to update advertisement");
      }
    } catch (err) {
      setError("Failed to update advertisement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container mt-4">
          <div className="heading mb-4">
            <h2>Advertisement Update</h2>
          </div>

          {/* ✅ Show Alerts */}
          {error && <AlertComponent type="danger" message={error} onClose={() => setError(null)} />}
          {success && <AlertComponent type="success" message={success} onClose={() => setSuccess(null)} />}

          <div className="row">
            <div className="col-md-6">
              <div className="card p-4">
                <h3 className="mb-3 text-primary">Dashboard Banner Update</h3>

                {/* ✅ Dropdown for selecting ad type */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Select Type</label>
                  <CommonSelect
                    className="select"
                    options={bannerUpdate}
                    defaultValue={bannerUpdate.find(option => option.value === selectedType)}
                    onChange={(option) => setSelectedType(option?.value || "web")}
                  />
                </div>

                {/* ✅ Image Upload */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input type="file" className="form-control" onChange={handleImageChange} />
                </div>

                {/* ✅ Update Button */}
                <button className="btn btn-primary w-100" onClick={handleUpdate} disabled={loading}>
                  {loading ? "Updating..." : "UPDATE"}
                </button>
              </div>
            </div>

            {/* ✅ Preview Section */}
            <div className="col-md-6">
              <div className="card p-3">
                {images[selectedType as keyof typeof images] ? (
                  <img
                    src={images[selectedType as keyof typeof images]!}
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

export default DashBoardPop;
