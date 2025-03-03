import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { register } from '@/api';
import { RegisterRequest } from '@/types';

export const useRegister = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (vars: RegisterRequest) => register(vars),
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push('/login');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { mutate, isLoading: isPending };
};
