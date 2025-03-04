import { useQuery } from '@tanstack/react-query';

import { getAllMembers } from '@/api';

export const useGetMembers = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: () => getAllMembers(),
  });
};
