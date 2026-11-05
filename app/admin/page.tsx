import { isAuthenticated } from '@/lib/auth';
import { getDatabase } from '@/lib/db';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  if (!isAuthenticated()) {
    redirect('/admin/login');
  }

  const data = getDatabase();
  return <AdminDashboard initialData={data} />;
}
