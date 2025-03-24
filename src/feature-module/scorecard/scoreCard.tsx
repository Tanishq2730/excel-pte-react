import React, { useEffect, useState } from "react";
import Table from "../../core/common/dataTable/index";
import Swal from "sweetalert2";
import AlertComponent from "../../core/common/AlertComponent";
import {
  fetchAllScorecards,
  createScorecard,
  updateScorecard,
  deleteScorecard,
  fetchScorecardById,
} from "../../api/masterAPI";

interface ScorecardData {
  id: number;
  name: string;
  image: string;
  pdf: string;
  status: boolean;
  home_show: boolean;
}

const ScoreCard: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<boolean>(true);
  const [homeShow, setHomeShow] = useState<boolean>(false);
  const [scorecards, setScorecards] = useState<ScorecardData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [alert, setAlert] = useState<{ type?: "success" | "danger"; message: string }>({
    type: undefined,
    message: "",
  });

  // ✅ Fetch all scorecards
  const loadScorecards = async () => {
    try {
      const response = await fetchAllScorecards();
      console.log(response,'response');
      
      if (response.success) {
        setScorecards(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch scorecards" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching scorecards" });
    }
  };

  useEffect(() => {
    loadScorecards();
  }, []);

  // ✅ Handle Image Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle PDF Change
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setAlert({ type: "danger", message: "Only PDF files are allowed" });
        return;
      }
      setPdf(file);
      setPdfPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle Form Submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setAlert({ type: "danger", message: "Name is required" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status.toString());
    formData.append("home_show", homeShow.toString());
    if (image) formData.append("image", image);
    if (pdf) formData.append("pdf", pdf);

    try {
      if (editId !== null) {
        await updateScorecard(editId, formData);
        setAlert({ type: "success", message: "Scorecard updated successfully!" });
      } else {
        await createScorecard(formData);
        setAlert({ type: "success", message: "Scorecard created successfully!" });
      }
      await loadScorecards();
      resetForm();
    } catch (error) {
      setAlert({ type: "danger", message: "Error submitting scorecard" });
    }
  };

  // ✅ Handle Edit
  const handleEdit = async (id: number) => {
    try {
      const response = await fetchScorecardById(id);
      if (response.success) {
        const scorecard = response.data;
        setName(scorecard.name);
        setStatus(scorecard.status);
        setHomeShow(scorecard.home_show);
        setImagePreview(scorecard.image);
        setPdfPreview(scorecard.pdf);
        setEditId(id);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch scorecard details" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "Error fetching scorecard details" });
    }
  };

  // ✅ Handle Delete with SweetAlert
  const handleDelete = async (id: number) => {
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
          await deleteScorecard(id);
          Swal.fire("Deleted!", "Scorecard has been deleted.", "success");
          await loadScorecards();
        } catch (error) {
          Swal.fire("Error!", "Error deleting scorecard.", "error");
        }
      }
    });
  };

  // ✅ Reset Form
  const resetForm = () => {
    setName("");
    setImage(null);
    setPdf(null);
    setImagePreview(null);
    setPdfPreview(null);
    setStatus(true);
    setHomeShow(false);
    setEditId(null);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        {alert.message && <AlertComponent type={alert.type ?? "primary"} message={alert.message} onClose={() => setAlert({ type: undefined, message: "" })} />}

        <div className="heading mb-4"><h2>Score Card</h2></div>

        <div className="card p-4">
          {/* ✅ Maintain Existing Form Design */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* ✅ Name */}
              <div className="col-md-6 mb-3">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              {/* ✅ Image */}
              <div className="col-md-6 mb-3">
                <label>Image</label>
                <input type="file" className="form-control" onChange={handleImageChange} />
              </div>

              {/* ✅ PDF */}
              <div className="col-md-6 mb-3">
                <label>PDF</label>
                <input type="file" className="form-control" accept="application/pdf" onChange={handlePdfChange} />
              </div>

              {/* ✅ Status */}
              <div className="col-md-6 mb-3">
                <label>Status</label>
                <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />
              </div>

              {/* ✅ Home Show */}
              <div className="col-md-6 mb-3">
                <label>Home Show</label>
                <input type="checkbox" checked={homeShow} onChange={() => setHomeShow(!homeShow)} />
              </div>
            </div>

            <button type="submit" className="btn btn-info">
              {editId !== null ? "UPDATE" : "SUBMIT"}
            </button>
          </form>

          <div className="mt-4">
          <Table
            key={scorecards.length}
            dataSource={scorecards}
            columns={[
              { title: "Name", dataIndex: "name" },
              {
                title: "Status",
                dataIndex: "status",
                render: (status: boolean) => (status ? "Active" : "Disabled"), // ✅ Explicit Type
              },
              {
                title: "Home Show",
                dataIndex: "home_show",
                render: (home_show: boolean) => (home_show ? "Enabled" : "Disabled"), // ✅ Explicit Type
              },
              {
                title: "Action",
                render: (row: ScorecardData) => (
                  <>
                    {/* ✅ Edit Button */}
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(row.id)}>
                      <i className="fa fa-pencil"></i>
                    </button>
              
                    {/* ✅ Delete Button - Removed Bootstrap Modal Trigger */}
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </>
                ),
              }
            ]}
          />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
