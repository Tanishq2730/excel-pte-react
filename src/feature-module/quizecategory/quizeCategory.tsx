import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import AlertComponent from "../../core/common/AlertComponent";
import Swal from "sweetalert2";

import {
  fetchAllQuizCategories,
  createQuizCategory,
  updateQuizCategory,
  deleteQuizCategory,
} from "../../api/masterAPI";

interface CategoryData {
  id: number;
  category_name: string;
}

const QuizeCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type?: "success" | "danger"; message: string }>({
    type: undefined,
    message: "",
  });

  // ✅ Fetch categories from API
  const loadCategories = async () => {
    try {
      const response = await fetchAllQuizCategories();
      if (response.success) {       
        setCategories(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch categories" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching categories" });
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      setAlert({ type: "danger", message: "Category name is required" });
      return;
    }

    try {
      if (editId !== null) {
        // ✅ Update existing category
        await updateQuizCategory(editId, { category_name: categoryName });
        setAlert({ type: "success", message: "Category updated successfully!" });
      } else {
        // ✅ Create new category
        await createQuizCategory({ category_name: categoryName });
        setAlert({ type: "success", message: "Category created successfully!" });
      }

      await loadCategories();
      setCategoryName("");
      setEditId(null);
    } catch (error) {
      setAlert({ type: "danger", message: "Error saving category" });
    }
  };

  // ✅ Handle Edit
  const handleEdit = (record: CategoryData) => {
    setCategoryName(record.category_name);
    setEditId(record.id);
  };

  // ✅ Handle Delete
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteQuizCategory(id);
          setAlert({ type: "success", message: "Category deleted successfully!" });
          await loadCategories();
        } catch (error) {
          setAlert({ type: "danger", message: "Error deleting category" });
        }
      }
    });
  };

  // ✅ Table Columns
  const columns = [
    { title: "#", dataIndex: "id", width: 50 },
    { title: "Category Name", dataIndex: "category_name" },
    {
      title: "Actions",
      render: (_: any, record: CategoryData) => (
        <>
          {/* ✅ Edit Button */}
          <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(record)}>
            <i className="fa fa-pencil"></i>
          </button>

          {/* ✅ Delete Button */}
          <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(record.id)}>
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>

      {/* ✅ Page Content */}
      <div className="page-wrapper">
        <div className="content">
          <div className="heading mb-4">
            <h2>Quiz Categories Master</h2>
          </div>

          {/* ✅ Form Section */}
          <div className="card p-4">
            {alert.message && (
              <AlertComponent
                type={alert.type ?? "primary"}
                message={alert.message}
                onClose={() => setAlert({ type: undefined, message: "" })}
              />
            )}
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
              <Table key={categories.length} dataSource={categories} columns={columns} Selection={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizeCategory;
