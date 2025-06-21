'use client';

import { useState } from 'react';

export default function UserLoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!/^09\d{9}$/.test(phone)) {
      setError('شماره موبایل معتبر نیست.');
      return;
    }
    setError('');
    setStep('otp');
    // ارسال OTP فرضی
    alert('کد تایید ارسال شد (مثلاً 1234)');
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      alert('ورود موفقیت‌آمیز!');
      // Redirect یا ذخیره توکن
    } else {
      setError('کد وارد شده اشتباه است.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 text-right">
        <h2 className="text-xl font-bold mb-4 text-center">ورود کاربران</h2>

        {step === 'phone' ? (
          <>
            <label className="block mb-2 text-sm font-medium">شماره موبایل</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="مثلاً 09123456789"
              className="w-full border rounded px-4 py-2 text-right mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              ارسال کد تایید
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium">
              کد تایید ارسال‌شده به {phone}
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="کد ۴ رقمی"
              maxLength={4}
              className="w-full border rounded px-4 py-2 text-center tracking-widest mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              ورود
            </button>

            <button
              onClick={() => {
                setStep('phone');
                setOtp('');
                setError('');
              }}
              className="mt-4 w-full text-blue-600 text-sm hover:underline"
            >
              تغییر شماره
            </button>
          </>
        )}
      </div>
    </div>
  );
}
