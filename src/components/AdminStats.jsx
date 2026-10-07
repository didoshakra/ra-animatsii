'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Показується тільки після входу через /exclude-me?key=...
// Позначка admin_ui лише вмикає інтерфейс; дані віддаються тільки з правильним admin_token.
export default function AdminStats() {
  const pathname = usePathname();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!document.cookie.includes('admin_ui=1')) return;

    fetch('/api/views')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setStats(data))
      .catch(() => {});
  }, []);

  if (!stats) return null;

  // Підставляємо мову з поточної адреси: /uk/... -> /uk/admin
  const first = (pathname || '/').split('/')[1] || '';
  const adminHref = /^[a-z]{2}$/.test(first) ? `/${first}/admin` : '/admin';

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-xs opacity-60">
      <span>
        👁 {stats.total} переглядів · 👤 {stats.visitors} відвідувачів · сьогодні {stats.today} · 7 днів {stats.week}
      </span>
      <a href={adminHref} className="underline">
        📊 Адмінка
      </a>
    </div>
  );
}
