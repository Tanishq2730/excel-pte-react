import React, { useState, useEffect } from "react";
import Table from "../../core/common/dataTable/index";
import {
  fetchAllPredictions,
  createPrediction,
  updatePrediction,
  deletePrediction,
} from "../../api/masterAPI";
import { image_url } from "../../environment";
import AlertComponent from "../../core/common/AlertComponent";

// ✅ Prediction Data Interface
interface PredictionData {
  id: number;
  title: string;
  cover_file: string;
  prediction_file: string;
  status: string;
}

const PredictionFile: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [predictionFile, setPredictionFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("Active");
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

  // ✅ Fetch All Predictions on Component Mount
  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetchAllPredictions();
      if (response.success) {
        setPredictions(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setAlert({ type: "danger", message: "Failed to load predictions" });
    }
    setLoading(false);
  };

  // ✅ Handle File Selection with Validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "cover" | "prediction") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (fileType === "cover") {
        if (!file.type.startsWith("image/")) {
          setAlert({ type: "danger", message: "Only image files are allowed for cover!" });
          return;
        }
        setCoverFile(file);
      } else {
        const validExtensions = [".pdf", ".doc", ".docx", ".xlsx"];
        const fileExt = file.name.slice(file.name.lastIndexOf("."));
        if (!validExtensions.includes(fileExt)) {
          setAlert({ type: "danger", message: "Allowed file types: PDF, DOC, DOCX, XLSX" });
          return;
        }
        setPredictionFile(file);
      }
    }
  };

  // ✅ Handle Form Submission (Create or Update Prediction)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!title) throw new Error("Title is required.");
      if (!editId && (!coverFile || !predictionFile)) throw new Error("Both files are required for a new prediction.");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      if (coverFile) formData.append("cover_file", coverFile);
      if (predictionFile) formData.append("prediction_file", predictionFile);

      let response;
      if (editId) {
        response = await updatePrediction(editId, formData);
      } else {
        response = await createPrediction(formData);
      }

      if (response.success) {
        setAlert({ type: "success", message: editId ? "Prediction updated successfully!" : "Prediction added successfully!" });
        loadPredictions();
        handleReset();
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setAlert({ type: "danger", message: "Prediction not save" });
    }

    setLoading(false);
  };

  // ✅ Handle Edit Prediction
  const handleEdit = (prediction: PredictionData) => {
    setTitle(prediction.title);
    setStatus(prediction.status);
    setEditId(prediction.id);
  };

  // ✅ Handle Reset Form
  const handleReset = () => {
    setTitle("");
    setCoverFile(null);
    setPredictionFile(null);
    setStatus("Active");
    setEditId(null);
  };

  // ✅ Handle Delete
  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    setLoading(true);
    try {
      const response = await deletePrediction(deleteId);
      if (response.success) {
        setAlert({ type: "success", message: "Prediction deleted successfully!" });
        setPredictions((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setAlert({ type: "danger", message: "Failed to delete prediction" });
    }
    setLoading(false);
  };

  // ✅ Table Columns
  const columns = [
    { title: "Prediction Title", dataIndex: "title", key: "title" },
    {
      title: "Prediction Cover",
      dataIndex: "cover_file",
      key: "cover_file",
      render: (coverFile: string) => (coverFile ? <img src={`${image_url}${coverFile}`} alt="Cover" style={{ width: "50px", height: "50px", objectFit: "cover" }} /> : "No File"),
    },
    {
      title: "Prediction File",
      dataIndex: "prediction_file",
      key: "prediction_file",
      render: (predictionFile: string) => (predictionFile ? <a href={`${image_url}${predictionFile}`} target="_blank" rel="noopener noreferrer">Download File</a> : "No File"),
    },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (_: any, row: PredictionData) => (
        <div>
          <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(row)}>Edit</button>
          <button className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setDeleteId(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="heading mb-4">
          <h2>{editId ? "Edit Prediction File" : "Add Prediction File"}</h2>
        </div>

        {/* ✅ Alert Component */}
        {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="card p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Prediction Title</label>
              <input type="text" className="form-control" placeholder="Prediction Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Cover File (image/*)</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => handleFileChange(e, "cover")} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Prediction File (pdf/doc/docx/xlsx)</label>
                <input type="file" className="form-control" accept=".pdf,.doc,.docx,.xlsx" onChange={(e) => handleFileChange(e, "prediction")} />
              </div>
            </div>

            <button type="submit" className="btn btn-info" disabled={loading}>{loading ? "Saving..." : editId ? "UPDATE" : "SAVE"}</button>
          </form>

          {/* ✅ Table Component */}
          <div className="mt-4">
            <Table key={predictions.length} dataSource={predictions} columns={columns} Selection={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionFile;
