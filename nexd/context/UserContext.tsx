
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {

  accessToken: string;
  refreshToken: string;

}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || '';

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();


  // initial useeffct to fetch store access token in session storage and refresh token in local storage 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (typeof window !== 'undefined' && window.location.pathname === '/admin/login') return;

        let accessToken = sessionStorage.getItem('accessToken');
        if(!accessToken){
            const refreshToken= localStorage.getItem('refreshToken');
            if(!refreshToken){
                router.push('/admin/login');
                return ;
            }
                const res = await axios.post(`${baseUrl}/refresh` ,{refreshToken} ); 
                accessToken = res.data.accessToken; 
                sessionStorage.setItem('accessToken', accessToken? accessToken: '');
                setUser({
                    accessToken: accessToken ?accessToken: '',
                    refreshToken: refreshToken ?refreshToken: ''
                })
            
        }
        
      } catch (err) {
        console.error('User fetch failed', err);
        router.push('/admin/login');
        return;
      }
    };

    fetchUser();
  }, [router]);


    
  
    

  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
