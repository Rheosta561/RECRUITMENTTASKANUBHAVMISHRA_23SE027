'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Lock } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const {setUser} =  useUser();
  const router = useRouter();


  useEffect(() => {
    const fetchRefreshToken = ()=>{
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if(refreshToken){
          router.push('/admin/Home');
          return;

        }

        
      } catch (error) {
        console.log('Login To Access ');
        
      }
    }
    fetchRefreshToken();

  
    
  }, [])
  



  

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
       const response = await axios.post(`${baseUrl}/login` , {username,password});
    console.log(response.status);
    setUser({
      accessToken:response?.data?.accessToken || '',
      refreshToken:response?.data?.refreshToken || ''

    });
    sessionStorage.setItem('accessToken' , response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    router.push('/admin/Home');
    
      
    } catch (error) {
      console.error(error);
      
    }
   


   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="flex items-center border rounded-md px-3 py-2 gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
