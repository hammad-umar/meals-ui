import { useQuery } from '@tanstack/react-query';

import { getAllTestimonials } from '@/api/service/testimonials';

export const useGetTestimonials = (searchTerm?: string) => {
  return useQuery({
    queryKey: ['testimonials', searchTerm],
    queryFn: () => getAllTestimonials(searchTerm),
    enabled: searchTerm !== undefined,
  });
};
