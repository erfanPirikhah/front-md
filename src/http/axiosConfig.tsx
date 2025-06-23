import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// تعریف تایپ برای خطاهای سفارشی
interface CustomError {
  message: string;
  [key: string]: any;
}

// ایجاد یک نمونه از Axios با تنظیمات اولیه
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3090/api/v1', // URL پایه API
  timeout: 10000, // تایم‌اوت درخواست‌ها (10 ثانیه)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// افزودن Interceptor برای درخواست‌ها
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // می‌توانید توکن احراز هویت را اینجا اضافه کنید
    const token: string | null = localStorage.getItem('token'); // مثال: گرفتن توکن از localStorage
    if (token) {
      // اطمینان از وجود headers
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// افزودن Interceptor برای پاسخ‌ها
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // پاسخ موفق را مستقیماً برمی‌گرداند
    return response.data;
  },
  (error: AxiosError<CustomError>) => {
    // مدیریت خطاها
    if (error.response) {
      // خطای سمت سرور (مثل 404، 500)
      const { status, data } = error.response;
      console.error(`Error ${status}:`, data.message || 'خطایی رخ داده است');
      return Promise.reject(data);
    } else if (error.request) {
      // خطای عدم دریافت پاسخ
      console.error('No response received:', error.request);
      return Promise.reject({ message: 'سرور در دسترس نیست' } as CustomError);
    } else {
      // خطای تنظیمات درخواست
      console.error('Request setup error:', error.message);
      return Promise.reject({ message: 'خطای ناشناخته' } as CustomError);
    }
  }
);

export default api;