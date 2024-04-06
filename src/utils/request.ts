import axios, { AxiosInstance } from 'axios';
import { axiosInterceptorsConfig } from '@/utils/common';

export const request: AxiosInstance = axios.create({ baseURL: `/` });
axiosInterceptorsConfig(request);
