import { GetMealDetailsResponse, Member } from '@/types';
import { axiosClient } from '../base';

export const createMember = async (
  request: Pick<Member, 'name' | 'email' | 'dietaryRestrictions'>
): Promise<Member> => {
  try {
    const response = await axiosClient.post<Member>('/meals-plan/create-member', request);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMembers = async (): Promise<Member[]> => {
  try {
    const response = await axiosClient.get<Member[]>('/meals-plan/members');
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getMealDetails = async (memberId: string): Promise<GetMealDetailsResponse> => {
  try {
    const response = await axiosClient.get<GetMealDetailsResponse>(`/meals-plan/members/${memberId}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
