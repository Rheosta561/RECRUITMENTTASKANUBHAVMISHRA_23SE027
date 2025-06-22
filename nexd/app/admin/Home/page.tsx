'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Link as LinkIcon, Sparkles , User, User2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { headers } from 'next/headers';
import { sign } from 'crypto';
import { signPayload } from '@/lib/signToken';

export default function Page() {
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const {user , setUser}= useUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log( 'Session Active ' ,user?true : false);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
// fetching the access from session storage if not present then get refresh token , if not refresh token then redirect to login 
  useEffect(() => {
      const fetchUser = async()=>{
    try {
        if(sessionStorage.getItem('accessToken')){
            return ;
        }
        const refreshToken = localStorage.getItem('refreshToken');
        if(!refreshToken){
            router.push('/admin/login');
            return;
        }
        const response = await axios.post(`${baseUrl}/refresh` , {refreshToken});
        console.log(response.status , 'Fetched Via refresh Token' )
        setUser({accessToken:response?.data?.accessToken || '' ,
            refreshToken :response?.data?.refreshToken || ''
        });
        
    } catch (error) {
        console.error(error);
        router.push(`/admin/login`);
        
    }
  }

    fetchUser();

  
    
  }, [])
  



//generating link function , first it fetches the share token from access token , if access token is not present or expired , then fetch the access token using refresh token 
  const handleGenerate = async () => {
  try {
    let accessToken = user?.accessToken;

    if (!accessToken) {
      const tokenResponse = await axios.post(`${backendUrl}/refresh`, {
        refreshToken: user?.refreshToken,
      });

      console.log('session active ' , tokenResponse.status)

      const newAccessToken = tokenResponse?.data?.accessToken || '';
      const newRefreshToken = tokenResponse?.data?.refreshToken || '';
      
      setUser({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      sessionStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      accessToken = newAccessToken;


    }

    const response = await axios.post(
      `${backendUrl}/share`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Share token status ' , response.status);
    const shareToken = response.data.shareToken;

 
    const shareTokenResponse = await axios.get(`${baseUrl}/share?shareToken=${shareToken}`);
    console.log(shareTokenResponse);

  

    const res = await axios.post('/api/signToken',{data:shareToken});
    console.log('response');

    const {token} = await res.data;
    const generatedUrl = `https://anubhavmishra-recruitment.vercel.app/share?shareToken=${token}`;
    setGeneratedLink(generatedUrl);
  } catch (error) {
    console.error('Failed to generate link:', error);
  }
};


  const handleCopy = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 justify-center px-4 ">
        <User2 className='scale-125' />
        <div className='text-lg -mt-2 font-medium '>Admin Portal</div>
        
        
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle>Generate Shareable URL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={handleGenerate}>
            <LinkIcon className="mr-2 w-4 h-4" />
            Generate Link
          </Button>

          {generatedLink && (
            <div className="flex items-center gap-2">
              <Input value={generatedLink} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="w-4 h-4" />
              </Button>
              {copied && <span className="text-sm text-muted-foreground">Copied!</span>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
