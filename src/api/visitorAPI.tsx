import { apiHandler } from './apiHandler';
import { api_url } from '../environment';

// GET request
export const fetchVisitors = async () => {
  return await apiHandler(`${api_url}visitors`, 'GET');
};