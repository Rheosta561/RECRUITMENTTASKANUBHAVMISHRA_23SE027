'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface Student {
  first_name: string;
  last_name: string;
  email: string;
  roll_no: string;
}

const BRANCHES = ['All', 'CO', 'SE', 'IT', 'MCE', 'ME', 'EP', 'ECE', 'EE', 'ENE'];

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [emailFilter, setEmailFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');

  const params = useSearchParams();
  const shareToken = params.get('shareToken');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//function to extract branch from the roll no. 
  const extractBranch = (roll: string) => roll.split('/')[1] || '';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [loading]);
//fetching the users from the api 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!shareToken) return;
        const response = await axios.get(`${baseUrl}/share?shareToken=${shareToken}`);
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchUsers();
  }, [shareToken, baseUrl]);
//email filtering based on search query 
  const filteredStudents = students.filter((student) => {
    const matchesEmail = student.email.toLowerCase().includes(emailFilter.toLowerCase());
    const matchesBranch = branchFilter === 'All' || extractBranch(student.roll_no) === branchFilter;
    return matchesEmail && matchesBranch;
  });

  const usersPerPage = 5;
  const totalPages = Math.ceil(filteredStudents.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
      <div className="text-2xl font-semibold">NexD</div>
      <div className="text-xs text-muted-foreground">Your Placement Assist</div>
      <br />

      <div className="w-full max-w-4xl space-y-4">
        <h1 className="text-lg font-semibold text-center">Student Details</h1>

        {loading ? (
          <Progress value={progress} />
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <Input
                placeholder="Search by email"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="w-full md:w-1/2"
              />
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-full md:w-1/2">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {BRANCHES.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {filteredStudents.length === 0 ? (
              <p className="text-center text-muted-foreground mt-4">No students match your filter.</p>
            ) : (
              <>
                <Table className="w-full text-center mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Roll No</TableHead>
                      <TableHead className="text-center">Branch</TableHead>
                      <TableHead className="text-center">Full Name</TableHead>
                      <TableHead className="text-center">Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStudents.map((student) => (
                      <TableRow key={student.roll_no}>
                        <TableCell className="text-center">{student.roll_no}</TableCell>
                        <TableCell className="text-center">{extractBranch(student.roll_no)}</TableCell>
                        <TableCell className="text-center">
                          {student.first_name} {student.last_name}
                        </TableCell>
                        <TableCell className="text-center">
                          <a
                            href={`mailto:${student.email}`}
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Mail className="w-4 h-4" />
                            {student.email}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-center items-center gap-4 mt-6">
                  <Button variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button variant="outline" onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
