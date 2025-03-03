import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { createMember } from '@/api';
import { Member } from '@/types';

export const useCreateMember = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: Pick<Member, 'name' | 'email' | 'dietaryRestrictions'>) => createMember(vars),
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { mutate, isLoading: isPending };
};
