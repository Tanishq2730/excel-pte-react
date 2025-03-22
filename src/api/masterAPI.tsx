import { apiHandler } from './apiHandler';
import { api_url } from '../environment';

// GET request
export const fetchVisitors = async () => {
  return await apiHandler(`${api_url}visitors`, 'GET');
};

export const bannerSave = async (formData: FormData) => {
  return await apiHandler(`${api_url}master-login-banner`, "POST", formData, true);
};

export const fetchBanner = async () => {
  return await apiHandler(`${api_url}master-login-banner`, 'GET');
};

export const fetchAllAds = async () => {
  return await apiHandler(`${api_url}dashboard-ads`, "GET");
};

// ✅ Fetch a single ad by ID
export const fetchAdById = async (id: number) => {
  return await apiHandler(`${api_url}dashboard-ads/${id}`, "GET");
};

// ✅ Create a new ad
export const createAd = async (formData: FormData) => {
  return await apiHandler(`${api_url}dashboard-ads`, "POST", formData, true);
};

// ✅ Update an existing ad
export const updateAd = async (id: number, formData: FormData) => {
  return await apiHandler(`${api_url}dashboard-ads/${id}`, "PUT", formData, true);
};

// ✅ Delete an ad
export const deleteAd = async (id: number) => {
  return await apiHandler(`${api_url}dashboard-ads/${id}`, "DELETE");
};

export const fetchAllRecordings = async () => {
  return await apiHandler(`${api_url}master-class-recordings`, "GET");
};

// ✅ Fetch Single Recording
export const fetchRecordingById = async (id: number) => {
  return await apiHandler(`${api_url}master-class-recordings/${id}`, "GET");
};

// ✅ Create a Recording
export const createRecording = async (data: { title: string; description: string; url: string }) => {
  return await apiHandler(`${api_url}master-class-recordings`, "POST", data);
};

// ✅ Update a Recording
export const updateRecording = async (id: number, data: { title: string; description: string; url: string }) => {
  return await apiHandler(`${api_url}master-class-recordings/${id}`, "PUT", data);
};

// ✅ Delete a Recording (Soft Delete)
export const deleteRecording = async (id: number) => {
  return await apiHandler(`${api_url}master-class-recordings/${id}`, "DELETE");
}

// ✅ Fetch All Upcoming Classes
export const fetchAllClasses = async () => {
  return await apiHandler(`${api_url}upcoming-classes`, "GET");
};

// ✅ Fetch Single Class by ID
export const fetchClassById = async (id: number) => {
  return await apiHandler(`${api_url}upcoming-classes/${id}`, "GET");
};

// ✅ Create a New Upcoming Class
export const createClass = async (data: { title: string; date: string; time: string; type: string; link: string }) => {
  return await apiHandler(`${api_url}upcoming-classes`, "POST", data);
};

// ✅ Update an Existing Upcoming Class
export const updateClass = async (id: number, data: { title: string; date: string; time: string; type: string; link: string }) => {
  return await apiHandler(`${api_url}upcoming-classes/${id}`, "PUT", data);
};

// ✅ Delete an Upcoming Class
export const deleteClass = async (id: number) => {
  return await apiHandler(`${api_url}upcoming-classes/${id}`, "DELETE");
};

// ✅ Video Management APIs
export const fetchAllVideos = async () => {
  return await apiHandler(`${api_url}master-video-pte`, "GET");
};

export const fetchVideoById = async (id: number) => {
  return await apiHandler(`${api_url}master-video-pte/${id}`, "GET");
};

export const createVideo = async (formData: FormData) => {
  return await apiHandler(`${api_url}master-video-pte`, "POST", formData, true);
};

export const updateVideo = async (id: number, formData: FormData) => {
  return await apiHandler(`${api_url}master-video-pte/${id}`, "PUT", formData, true);
};

export const deleteVideo = async (id: number) => {
  return await apiHandler(`${api_url}master-video-pte/${id}`, "DELETE");
};

// ✅ Prediction Management APIs
export const fetchAllPredictions = async () => {
  return await apiHandler(`${api_url}master-predictions`, "GET");
};

export const fetchPredictionById = async (id: number) => {
  return await apiHandler(`${api_url}master-predictions/${id}`, "GET");
};

export const createPrediction = async (formData: FormData) => {
  return await apiHandler(`${api_url}master-predictions`, "POST", formData, true);
};

export const updatePrediction = async (id: number, formData: FormData) => {
  return await apiHandler(`${api_url}master-predictions/${id}`, "PUT", formData, true);
};

export const deletePrediction = async (id: number) => {
  return await apiHandler(`${api_url}master-predictions/${id}`, "DELETE");
};

// ✅ Fetch All Templates
export const fetchAllTemplates = async () => {
  return await apiHandler(`${api_url}master-templates`, "GET");
};

// ✅ Fetch Single Template by ID
export const fetchTemplateById = async (id: number) => {
  return await apiHandler(`${api_url}master-templates/${id}`, "GET");
};

// ✅ Create a New Template
export const createTemplate = async (formData: FormData) => {
  return await apiHandler(`${api_url}master-templates`, "POST", formData, true);
};

// ✅ Update an Existing Template
export const updateTemplate = async (id: number, formData: FormData) => {
  return await apiHandler(`${api_url}master-templates/${id}`, "PUT", formData, true);
};

// ✅ Delete a Template (Soft Delete)
export const deleteTemplate = async (id: number) => {
  return await apiHandler(`${api_url}master-templates/${id}`, "DELETE");
};

// ✅ Fetch All Topics
export const fetchAllTopics = async () => {
  return await apiHandler(`${api_url}common/topics`, "GET");
};

// ✅ Fetch All Question Types
export const fetchAllQuestionTypes = async () => {
  return await apiHandler(`${api_url}common/question-types`, "GET");
};

// ✅ Fetch All Types with Subtypes
export const fetchAllTypes = async () => {
  return await apiHandler(`${api_url}common/types`, "GET");
};

// ✅ Fetch Subtypes by Type ID
export const fetchSubtypesByType = async (typeId: number) => {
  return await apiHandler(`${api_url}common/types/${typeId}/subtypes`, "GET");
};

// ✅ Fetch All Image Type Categories
export const fetchAllImageTypes = async () => {
  return await apiHandler(`${api_url}common/image-types`, "GET");
};

// ✅ Fetch States by Country Code
export const fetchStatesByCountryCode = async (countryCode: string) => {
  return await apiHandler(`${api_url}common/states/${countryCode}`, "GET");
};