// app/admin/layout.tsx

import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="flex min-h-screen font-sans">
      {/* سایدبار */}
      {/* <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">پنل مدیریت</h2>
        <nav className="flex flex-col space-y-3">
          <Link href="/admin" className="hover:text-gray-300">داشبورد</Link>
          <Link href="/admin/users" className="hover:text-gray-300">مدیریت کاربران</Link>
          <Link href="/admin/settings" className="hover:text-gray-300">تنظیمات</Link>
        </nav>
      </aside> */}

      {/* محتوای اصلی */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
