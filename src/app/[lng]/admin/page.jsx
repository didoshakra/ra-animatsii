// scr/[lng]/admin/page.jsx
import AdminDashboard from '../../../components/AdminDashboard';

export const metadata = {
  title: 'Адмінка',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
