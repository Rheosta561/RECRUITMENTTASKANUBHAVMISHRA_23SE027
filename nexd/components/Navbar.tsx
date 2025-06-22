'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { useEffect } from 'react';

export default function Navbar() {
  const { user, setUser } = useUser();
  const router = useRouter();
  console.log(user);
// fetching the user from localStorage to display login or logged in conditionally 
  useEffect(() => {
    const fetchUserFromLocalStorage = async()=>{
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if(user){
                setUser({ ...user, refreshToken: refreshToken ? refreshToken : '' })
            }else{
                setUser({accessToken:'' , refreshToken: refreshToken ? refreshToken : ''});
            }

            
        } catch (error) {
            console.error(error);
            
            
        }
    }
    fetchUserFromLocalStorage();
  
   
  }, [])
  

// logging out , removes access token and refresh token from the browser 
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <header className="w-full border-b shadow-sm bg-background fixed z-10">
      <nav className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">

        <Link href="/" className="text-lg font-semibold">
          Nex<span className="text-primary">D</span>
        </Link>


        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <Link href="/admin/Home" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/students" className="hover:text-primary transition-colors">Students</Link>
          </li>
          <li>
            <Link href="/companies" className="hover:text-primary transition-colors">Companies</Link>
          </li>
          <li>
            <Link href="/notice" className="hover:text-primary transition-colors">Notice</Link>
          </li>
        </ul>


        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {user?.refreshToken ? (
            <>
            
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Logged in as Admin</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>

             
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push('/')}>Home</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/')}>Students</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/')}>Companies</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/')}>Notice</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push('/admin/login')}
            >
              Login
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
