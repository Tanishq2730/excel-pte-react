import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import DefaultEditor from "react-simple-wysiwyg";
import AlertComponent from "../../core/common/AlertComponent";
import {
  fetchAllReviews,
  createReview,
  updateReview,
  deleteReview,
  fetchReviewById,
} from "../../api/masterAPI"; // ✅ Import API functions
import { image_url } from "../../environment";

interface ReviewData {
  id: number;
  name: string;
  rating: string;
  image: string | null;
  review_image: string | null;
  review_content: string;
  status: string;
  home_show: string;
}

const Review: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [homeShow, setHomeShow] = useState<string>("Disabled");
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [alert, setAlert] = useState<{ type?: "success" | "danger" | "primary" | "secondary" | "warning"; message: string }>({ type: undefined, message: "" });
  // ✅ Fetch reviews from API
   // ✅ Fetch reviews from API
   const loadReviews = async () => {
    try {
      const response = await fetchAllReviews();
      if (response.success) {
        setReviews(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch reviews" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching reviews" });
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // ✅ Handle file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "image") setImage(e.target.files[0]);
      if (type === "reviewImage") setReviewImage(e.target.files[0]);
    }
  };

  // ✅ Handle form submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rating", rating);
    formData.append("review_content", reviewContent);
    formData.append("status", status);
    formData.append("home_show", homeShow);
    if (image) formData.append("image", image);
    if (reviewImage) formData.append("review_image", reviewImage);

    try {
      if (editId !== null) {
        await updateReview(editId, formData);
        setAlert({ type: "success", message: "Review updated successfully!" });
      } else {
        await createReview(formData);
        setAlert({ type: "success", message: "Review created successfully!" });
      }
      await loadReviews();// ✅ Refresh data
      resetForm();
    } catch (error) {
      setAlert({ type: "danger", message: "Error submitting review" });
      console.error("Error submitting review:", error);
    }
  };

  // ✅ Handle edit
  const handleEdit = async (id: number) => {
    try {
      const response = await fetchReviewById(id);
      if (response.success) {
        const review = response.data;
        setName(review.name);
        setRating(review.rating);
        setReviewContent(review.review_content);
        setStatus(review.status === true ? 'Active' : 'Disabled');
        setHomeShow(review.home_show === true ? 'Enabled' : 'Disabled');
        setEditId(id);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch review details" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching review details" });
      console.error("Error fetching review:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteReview(deleteId);
        setAlert({ type: "success", message: "Review deleted successfully!" });
        loadReviews();
      } catch (error) {
        setAlert({ type: "danger", message: "Error deleting review" });
      }
      setDeleteId(null);
    }
  };

  // ✅ Reset form
  const resetForm = () => {
    setName("");
    setRating("");
    setReviewContent("");
    setStatus("Active");
    setHomeShow("Disabled");
    setImage(null);
    setReviewImage(null);
    setEditId(null);
  };

  // ✅ Table columns
  const columns = [
    { title: "S.No.", dataIndex: "id", render: (_: any, __: any, index: number) => index + 1 },
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string | null) => img ? <img src={`${image_url}${img}`} alt="User" width={50} height={50} /> : "-",
    },
    {
      title: "Review Content / Image",
      dataIndex: "review_content",
      render: (content: string) => <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>,
    },
    { title: "Status", dataIndex: "status" },
    { title: "Home Show", dataIndex: "home_show" },
    {
      title: "Action",
      render: (row: ReviewData) => (
        <div>
          <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(row.id)}>
            <i className="fa fa-pencil"></i>
          </button>
          <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setDeleteId(row.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>{editId !== null ? "Edit Review" : "Add Review"}</h2>
        </div>
        <div className="card p-4">
        {alert.message && <AlertComponent type={alert.type ?? "primary"} message={alert.message} onClose={() => setAlert({ type: undefined, message: "" })} />}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Rating</label>
                <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="">-- Select Rating --</option>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>{star} Star{star > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Image</label>
                <input type="file" className="form-control" onChange={(e) => handleImageChange(e, "image")} />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Review Image</label>
                <input type="file" className="form-control" onChange={(e) => handleImageChange(e, "reviewImage")} />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Review Content</label>
                <DefaultEditor value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} />
              </div>

              {/* ✅ Status (Radio Buttons) */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <div>
                  {["Active", "Disabled"].map((s) => (
                    <label key={s} className="me-3">
                      <input type="radio" name="status" value={s} checked={status === s} onChange={(e) => setStatus(e.target.value)} /> {s}
                    </label>
                  ))}
                </div>
              </div>

              {/* ✅ Home Show (Radio Buttons) */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Home Show</label>
                <div>
                  {["Enabled", "Disabled"].map((hs) => (
                    <label key={hs} className="me-3">
                      <input type="radio" name="homeShow" value={hs} checked={homeShow === hs} onChange={(e) => setHomeShow(e.target.value)} /> {hs}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

          <div className="mt-4">
            <Table key={reviews.length}  dataSource={reviews} columns={columns} Selection={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
