import { useQuery } from '@tanstack/react-query';

import { getMealDetails } from '@/api';

export const useGetMeal = (memberId: string) => {
  return useQuery({
    queryKey: ['meal', memberId],
    queryFn: () => getMealDetails(memberId),
    enabled: !!memberId,
    refetchOnWindowFocus: false,
  });
};
