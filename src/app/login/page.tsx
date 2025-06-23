'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone, Shield, ArrowRight, Check, X } from 'lucide-react';
import { requestOtp, verifyOtp } from '@/http/authAPi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function UserLoginPage() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(phone)) {
      setError('شماره موبایل معتبر نیست.');
      return;
    }

    try {
      const response = await requestOtp(phone);
      if (response.success) {
        setError('');
        setStep('otp');
        toast.success(response.message);
      } else {
        setError('خطایی رخ داده است.');
        toast.error('خطایی رخ داده است.');
      }
    } catch (error: any) {
      setError('خطا در ارسال کد تایید.');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(otp)) {
      setError('کد باید 5 رقم باشد.');
      return;
    }

    try {
      const response = await verifyOtp(phone, otp);
      if (response.success) {
        localStorage.setItem('TOKEN', response.token || '');
        router.push('/user');
      } else {
        setError('کد وارد شده اشتباه است.');
        toast.error('کد وارد شده اشتباه است.');
      }
    } catch (error: any) {
      setError('خطا در تأیید کد.');
      toast.error('خطا در تأیید کد.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-grid-16"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div
          dir="rtl"
          className="bg-green-100/10 backdrop-blur-xl border border-green-200/20 rounded-3xl shadow-2xl w-full max-w-md p-8 transition-all duration-500 hover:shadow-emerald-500/20"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
              {step === 'phone' ? (
                <Smartphone className="w-8 h-8 text-white" />
              ) : (
                <Shield className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 'phone' ? 'ورود به حساب کاربری' : 'تأیید کد'}
            </h2>
            <p className="text-gray-300 text-sm">
              {step === 'phone'
                ? 'برای ورود، شماره موبایل خود را وارد کنید'
                : 'کد 5 رقمی ارسال شده را وارد نمایید'}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${step === 'phone' ? 'bg-green-500' : 'bg-teal-500'} transition-colors duration-300`}></div>
              <div className="w-8 h-0.5 bg-gray-600 relative overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-green-500 to-teal-500 transition-transform duration-500 ${step === 'otp' ? 'translate-x-0' : '-translate-x-full'}`}></div>
              </div>
              <div className={`w-3 h-3 rounded-full ${step === 'otp' ? 'bg-teal-500' : 'bg-gray-600'} transition-colors duration-300`}></div>
            </div>
          </div>

          {/* Forms */}
          {step === 'phone' ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
                  شماره موبایل
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-green-100/10 border-green-200/20 text-white placeholder:text-gray-400 h-12 text-right pr-12 focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-xl"
                  />
                  <Smartphone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {error && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <X className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <Button
                onClick={handlePhoneSubmit}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2"></div>
                    <span>در حال ارسال...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>ارسال کد تایید</span>
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium text-gray-200">
                  کد تایید ارسال‌شده به
                </Label>
                <div className="text-center text-green-400 font-medium mb-4">
                  {phone}
                </div>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    placeholder="- - - - -"
                    maxLength={5}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-green-100/10 border-green-200/20 text-white placeholder:text-gray-400 h-12 text-center tracking-[0.5em] text-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-xl"
                  />
                </div>
                {error && (
                  <div className="flex items-center justify-center space-x-2 text-red-600 text-sm">
                    <X className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <Button
                onClick={handleOtpSubmit}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2"></div>
                    <span>در حال تأیید...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>ورود</span>
                    <Check className="w-5 h-5 mr-2" />
                  </div>
                )}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setError('');
                }}
                className="w-full text-sm text-green-400 hover:text-green-300 transition-colors duration-200 text-center py-2"
              >
                تغییر شماره موبایل
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              با ورود به سایت، شما{' '}
              <span className="text-green-400 hover:text-green-300 cursor-pointer">
                قوانین و مقررات
              </span>{' '}
              را می‌پذیرید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
