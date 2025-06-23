import api from "./axiosConfig";

interface RequestOtpPayload {
    mobile: string;
  }
  
  // تعریف تایپ برای بدنه درخواست تأیید OTP
  interface VerifyOtpPayload {
    mobile: string;
    code: string;
  }
  
  // تعریف تایپ برای پاسخ API
  interface ApiResponse {
    success: boolean;
    message: string;
    token?:string
    error?: string;
    data?: any; // برای اطلاعات اضافی مثل توکن
  }
  


  // تابع برای ارسال درخواست OTP
export async function requestOtp(mobile: string): Promise<ApiResponse> {
    try {
      const payload: RequestOtpPayload = { mobile };
      const response: ApiResponse = await api.post('/users/requestOtp', payload);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'خطا در ارسال درخواست OTP');
    }
  }

// تابع برای تأیید OTP
export async function verifyOtp(mobile: string, code: string): Promise<ApiResponse> {
    try {
      const payload: VerifyOtpPayload = { mobile, code };
      const response: ApiResponse = await api.post('/users/verifyOtp', payload);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'خطا در تأیید کد OTP');
    }
  }