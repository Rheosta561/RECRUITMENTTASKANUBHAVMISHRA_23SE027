'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Nex<span className="text-primary">D</span>
      </h1>
      <p className="text-muted-foreground text-sm">
        Developed by <span className="font-medium">Anubhav Mishra</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link href="/admin/Home">
          <Button>Go to Admin Portal</Button>
        </Link>

        <Link href="https://www.linkedin.com/in/anubhav-mishra-2b8175285/" target="_blank">
          <Button variant="outline">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </Link>

        <Link href="https://github.com/Rheosta561" target="_blank">
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </Link>
      </div>
    </div>
  );
}
