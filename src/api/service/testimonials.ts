import { Testimonial } from '@/types';
import { axiosClient } from '../base';

export const getAllTestimonials = async (searchTerm?: string): Promise<Testimonial[]> => {
  try {
    let url = `/testimonials`;

    if (searchTerm) {
      url += `?searchTerm=${searchTerm}`;
    }

    const response = await axiosClient.get<Testimonial[]>(url);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
