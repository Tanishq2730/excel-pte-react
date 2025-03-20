import React, { useState } from "react";
import Table from "../../core/common/dataTable/index";

interface CategoryData {
  id: number;
  name: string;
}

const DUMMY_DATA: CategoryData[] = [{ id: 1, name: "Preposition Place" }];

const QuizeCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryData[]>(DUMMY_DATA);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ✅ Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (categoryName.trim()) {
      if (editId !== null) {
        // ✅ Update Existing Category
        setCategories((prev) =>
          prev.map((category) =>
            category.id === editId ? { ...category, name: categoryName } : category
          )
        );
        setEditId(null);
      } else {
        // ✅ Add New Category
        const newCategory: CategoryData = {
          id: categories.length + 1,
          name: categoryName,
        };

        setCategories((prev) => [...prev, newCategory]);
      }

      setCategoryName(""); // ✅ Reset input after submit
    }
  };

  // ✅ Handle Edit
  const handleEdit = (record: CategoryData) => {
    setCategoryName(record.name);
    setEditId(record.id);
  };

  // ✅ Handle Delete
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  // ✅ Confirm Delete from Modal
  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setCategories((prev) => prev.filter((category) => category.id !== deleteId));
      setDeleteId(null);
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      render: (_: any, record: CategoryData) => (
        <>
          {/* ✅ Edit Button with Icon */}
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => handleEdit(record)}
          >
            <i className="bi bi-pencil"></i> Edit
          </button>

          {/* ✅ Delete Button with Icon */}
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
              <p>Are you sure you want to delete this category?</p>
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
            <h2>Quiz Categories Master</h2>
          </div>

          {/* ✅ Form Section */}
          <div className="card p-4">
            <form onSubmit={handleSubmit} className="mb-3">
              <div className="row">
                {/* Input Field */}
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Enter Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary">
                    {editId !== null ? "UPDATE" : "ADD CATEGORY"}
                  </button>
                </div>
              </div>
            </form>

            {/* ✅ Data Table */}
            <div className="mt-4">
              <Table
                key={categories.length}
                dataSource={categories}
                columns={columns}
                Selection={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizeCategory;
