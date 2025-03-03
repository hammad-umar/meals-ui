'use client';

import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { toast } from 'react-toastify';

import { signIn } from '@/api';
import { LoginRequest } from '@/types';
import { useAuth } from '../zustand/hooks/use-auth';

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: (vars: LoginRequest) => signIn(vars),
    onSuccess: ({ message, user, accessToken }) => {
      login(accessToken, user);
      setCookie(null, 'Authentication', accessToken, {
        expires: new Date(jwtDecode(accessToken).exp! * 1000),
        path: '/',
      });

      toast.success(message);
      router.push('/');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { mutate, isLoading: isPending };
};
