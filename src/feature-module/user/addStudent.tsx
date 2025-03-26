import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../../core/common/AlertComponent";
import { createUsers } from "../../api/masterAPI"; // ✅ Import role API
import { getStudentRoles } from "../../api/commonAPI";
import { fetchAllCountries, fetchStatesByCountryCode } from "../../api/commonAPI";
import { all_routes } from "../router/all_routes";

const AddStudent = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // ✅ Form state
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    mobileNo: string;
    country_id: string;
    state_id: string;
    pincode: string;
    roleIds: number[]; // ✅ Explicitly define as a number array
  }>({
    name: "",
    email: "",
    mobileNo: "",
    country_id: "",
    state_id: "",
    pincode: "",
    roleIds: [], // ✅ Ensure it's an array of numbers
  });

  const [countries, setCountries] = useState<{ id: number; name: string; cca2: string }[]>([]);
  const [states, setStates] = useState<{ id: number; name: string }[]>([]);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]); // ✅ Role list
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

  // ✅ Fetch countries and roles on component mount
  useEffect(() => {
    loadCountries();
    loadRoles();
  }, []);

  const loadCountries = async () => {
    try {
      const response = await fetchAllCountries();
      if (response.success) {
        setCountries(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch countries" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while fetching countries." });
    }
  };

  // ✅ Fetch states when a country is selected
  const loadStates = async (countryCode: string) => {
    try {
      const response = await fetchStatesByCountryCode(countryCode);
      if (response.success && Array.isArray(response.data)) {
        setStates(response.data);
      } else {
        setStates([]);
        setAlert({ type: "danger", message: response.message || "No states found for this country." });
      }
    } catch (error) {
      setStates([]);
      setAlert({ type: "danger", message: "An error occurred while fetching states." });
    }
  };

  // ✅ Fetch roles from API
  const loadRoles = async () => {
    try {
      const response = await getStudentRoles();
      if (response.success) {
        setRoles(response.data);
      } else {
        setAlert({ type: "danger", message: "Failed to fetch roles" });
      }
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while fetching roles." });
    }
  };

  // ✅ Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✅ If country is changed, fetch its states
    if (name === "country_id") {
      const selectedCountry = countries.find((c) => c.id.toString() === value);
      if (selectedCountry) {
        loadStates(selectedCountry.cca2);
      }
      setFormData({ ...formData, country_id: value, state_id: "" });
    }
  };

  // ✅ Handle role selection
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, roleIds: [parseInt(e.target.value)] }); // ✅ Store selected role ID in array
  };
 
  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const response = await createUsers(formData); // ✅ Call API

      if (!response.success) {
        if (response.errors) {
          setAlert({ type: "danger", message: response.errors.join(", ") }); // ✅ Show all validation errors
        } else {
          setAlert({ type: "danger", message: response.error || "Failed to add user" });
        }
        return;
      }

      setAlert({ type: "success", message: "User added successfully!" });
      setTimeout(() => navigate(routes.userManage), 2000);
    } catch (error) {
      setAlert({ type: "danger", message: "An error occurred while adding the user." });
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content content-two">
          {alert && <AlertComponent type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
          
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3">
            <div className="my-auto mb-2">
              <h3 className="mb-1">{isEdit ? "Edit" : "Add"} User</h3>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={routes.userManage}>Users</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {isEdit ? "Edit" : "Add"} User
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header bg-light">
                    <h4 className="text-dark">User Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Mobile No.</label>
                          <input type="number" className="form-control" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Role</label>
                          <select className="form-control" name="role" onChange={handleRoleChange} required>
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <select className="form-control" name="country_id" value={formData.country_id} onChange={handleChange} required>
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <select className="form-control" name="state_id" value={formData.state_id} onChange={handleChange} required>
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state.id} value={state.id}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <Link to={routes.userManage} className="btn btn-light me-3">
                    Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    {isEdit ? "Update" : "Add"} User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
