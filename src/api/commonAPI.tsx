import { apiHandler } from './apiHandler';
import { api_url } from '../environment';


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
  return await apiHandler(`${api_url}common/subtypes/${typeId}`, "GET");
};

// ✅ Fetch All Image Type Categories
export const fetchAllImageTypes = async () => {
  return await apiHandler(`${api_url}common/image-types`, "GET");
};

// ✅ Fetch States by Country Code
export const fetchStatesByCountryCode = async (countryCode: string) => {
    return await apiHandler(`${api_url}common/by-country/${countryCode}`, "GET");
};

export const fetchAllCountries = async () => {
    return await apiHandler(`${api_url}location/countries`, "GET");
};

export const getUserPermissions = async () => {
  return await apiHandler(`${api_url}common/user/permissions`, "GET");
};

export const getStudentRoles = async () => {
  return await apiHandler(`${api_url}common/student-roles`, "GET");
};

export const getCourseTypes = async () => {
  return await apiHandler(`${api_url}common/course-types`, "GET");
};

export const getQuestionsByTypeAndSubtype = async (typeId: number,subTypeId: number) => {
  return await apiHandler(`${api_url}common/get-question/${typeId}/${subTypeId}`, "GET");
};

export const getAIclicks = async () => {
  return await apiHandler(`${api_url}common/aiclicks`, "GET");
};
export const saveAIclicks = async (data:any) => {
  return await apiHandler(`${api_url}common/aiclicks/save`, "POST",data);
};