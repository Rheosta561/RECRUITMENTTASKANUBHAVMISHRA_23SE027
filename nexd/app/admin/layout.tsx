'use client';
import Navbar from '@/components/Navbar';
import { UserProvider } from '@/context/UserContext'; 



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
        <Navbar/>
      {children}
    </UserProvider>
  );
}
