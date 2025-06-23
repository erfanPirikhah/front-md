'use client';

import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-r from-emerald-100 to-blue-100 shadow-inner py-10 px-6 sm:px-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-700">
        <div>
          <h4 className="font-semibold text-lg mb-4 text-emerald-700">درباره ما</h4>
          <p className="text-sm leading-relaxed">
            ما مجموعه‌ای از خدمات گردشگری با کیفیت هستیم که تلاش می‌کنیم بهترین تجربه را برای شما فراهم کنیم.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4 text-emerald-700">راه‌های ارتباطی</h4>
          <ul className="text-sm space-y-2">
            <li>ایمیل: info@example.com</li>
            <li>آدرس: تهران، خیابان مثال، پلاک ۱۲۳</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4 text-emerald-700">تماس با ما</h4>
          <p className="text-sm">۰۲۱-۱۲۳۴۵۶۷۸</p>
          <p className="text-sm mt-2">۰۹۱۲-۱۲۳۴۵۶۷۸</p>
          <div className="flex gap-4 mt-4">
            <Link href="#" aria-label="فیسبوک" className="text-blue-500 hover:text-emerald-500 transition">📘</Link>
            <Link href="#" aria-label="توییتر" className="text-blue-500 hover:text-emerald-500 transition">🐦</Link>
            <Link href="#" aria-label="اینستاگرام" className="text-blue-500 hover:text-emerald-500 transition">📸</Link>
          </div>
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-10">© تمامی حقوق محفوظ است. ۱۴۰۴</p>
    </footer>
  );
}