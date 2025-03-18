import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";
import CommonSelect from "../../core/common/commonSelect";

interface ReviewData {
  id: number;
  name: string;
  rating: string;
  image: string | null;
  reviewImage: string | null;
  content: string;
  status: string;
  homeShow: string;
}

interface MockDropOption {
  label: string;
  value: string;
}

const Review: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<string>("Active");
  const [homeShow, setHomeShow] = useState<string>("Disabled");
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const mockdrop: MockDropOption[] = [
    { label: "Active", value: "Active" },
    { label: "Disable", value: "Disable" },
  ];

  // ✅ Sample data
  const [reviews, setReviews] = useState<ReviewData[]>([
    {
      id: 1,
      name: "Md Waseem",
      rating: "5 Stars",
      image: null,
      reviewImage: null,
      content:
        "Thank you yasmin madam for helping, guiding and motivating me. The way she motivates and teaches is too good. your strategies really helped me a lot madam. I strongly recommend EXCEL PTE to everyone for achieving your target score.",
      status: "Active",
      homeShow: "Enabled",
    },
  ]);

  // ✅ Handle file change
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      if (type === "image") setImage(e.target.files[0]);
      if (type === "reviewImage") setReviewImage(e.target.files[0]);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      // ✅ Update existing review
      setReviews((prev) =>
        prev.map((rev) =>
          rev.id === editId
            ? {
                ...rev,
                name,
                rating,
                content,
                status,
                homeShow,
                image: image ? URL.createObjectURL(image) : rev.image,
                reviewImage: reviewImage
                  ? URL.createObjectURL(reviewImage)
                  : rev.reviewImage,
              }
            : rev
        )
      );
      setEditId(null);
    } else {
      // ✅ Add new review
      const newReview: ReviewData = {
        id: reviews.length + 1,
        name,
        rating,
        content,
        status,
        homeShow,
        image: image ? URL.createObjectURL(image) : null,
        reviewImage: reviewImage ? URL.createObjectURL(reviewImage) : null,
      };
      setReviews((prev) => [...prev, newReview]);
    }

    // ✅ Reset form
    setName("");
    setRating("");
    setContent("");
    setStatus("Active");
    setHomeShow("Disabled");
    setImage(null);
    setReviewImage(null);
  };

  // ✅ Handle delete row
  const handleDelete = () => {
    if (deleteId !== null) {
      setReviews((prev) => prev.filter((rev) => rev.id !== deleteId));
      setDeleteId(null);
    }
  };

  // ✅ Handle edit row
  const handleEdit = (id: number) => {
    const record = reviews.find((rev) => rev.id === id);
    if (record) {
      setName(record.name);
      setRating(record.rating);
      setContent(record.content);
      setStatus(record.status);
      setHomeShow(record.homeShow);
      setEditId(id);
    }
  };

  // ✅ Table columns
  const columns = [
    {
      title: "S.No.",
      dataIndex: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string | null) =>
        img ? (
          <img src={img} alt="User" width={50} height={50} />
        ) : (
          <img
            src="https://picsum.photos/200/300"
            alt="Placeholder"
            width={50}
            height={50}
          />
        ),
    },
    {
      title: "Review Content / Image",
      dataIndex: "content",
      render: (content: string) => (
        <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Home Show",
      dataIndex: "homeShow",
    },
    {
      title: "Action",
      render: (row: ReviewData) => (
        <div>
          {/* ✅ Edit Button */}
          <button
            className="btn btn-info btn-sm me-2"
            onClick={() => handleEdit(row.id)}
          >
            <i className="fa fa-pencil"></i>
          </button>

          {/* ✅ Delete Button */}
          <button
            className="btn btn-danger btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={() => setDeleteId(row.id)}
          >
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
          {/* ✅ Form */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Rating */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">-- Select Rating --</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>

              {/* Image */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleImageChange(e, "image")}
                />
              </div>

              {/* Review Image */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Review Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleImageChange(e, "reviewImage")}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Review Content</label>
                <textarea className="form-control" rows={4} />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <CommonSelect
                  className="select"
                  options={mockdrop}
                  defaultValue={mockdrop[0]}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Home Show</label>
                <CommonSelect
                  className="select"
                  options={mockdrop}
                  defaultValue={mockdrop[0]}
                />
              </div>
            </div>
          </form>

          {/* ✅ Table */}
          <div className="mt-4">
            <Table dataSource={reviews} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
