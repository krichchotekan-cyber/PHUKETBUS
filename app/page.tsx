import { getDatabase } from '@/lib/db';
import OnePageSale from '@/components/OnePageSale';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const data = getDatabase();
  return <OnePageSale initialData={data} />;
}
