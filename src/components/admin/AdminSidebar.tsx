// components/AdminSidebar.tsx
import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside style={{ width: '250px', padding: '1rem', background: '#f4f4f4' }}>
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/users">Users</Link>
          </li>
          <li>
            <Link href="/admin/companies">Companies</Link>
          </li>
          <li>
            <Link href="/admin/funding">Funding Applications</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
