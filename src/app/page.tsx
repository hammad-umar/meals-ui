'use client';

import { useQueryClient } from '@tanstack/react-query';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/zustand/hooks/use-auth';

const HomePage: NextPage = () => {
  const { logout } = useAuth();

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = (): void => {
    logout();
    destroyCookie({}, 'Authentication');
    queryClient.resetQueries();
    router.push('/login');
    toast.success('Logged out successfully.');
  };

  return (
    <div>
      <div className="flex flex-row my-10 gap-3 items-center justify-center">
        <h1 className="text-red-900 text-4xl text-center">Meal Planner</h1>
        <Button onClick={handleLogout} className="cursor-pointer" variant="destructive" size="sm">
          Logout
        </Button>
      </div>

      <div className="flex flex-row justify-center content-center gap-3">
        <Link className="underline text-md text-blue-700" href="/create-member">
          Create Member
        </Link>
        <Link className="underline text-md text-blue-700" href="/members">
          All Members
        </Link>
        <Link className="underline text-md text-blue-700" href="/testimonials">
          All Testimonials
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
