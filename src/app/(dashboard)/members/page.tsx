'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetMeal } from '@/hooks/useGetMeal';
import { useGetMembers } from '@/hooks/useGetMembers';

const MembersPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [memberId, setMemberId] = useState<string>('');

  const { data: members, isLoading } = useGetMembers();
  const { data: mealDetails, refetch, isFetching: isMealsLoading } = useGetMeal(memberId);

  useEffect(() => {
    if (isModalOpen && memberId) {
      refetch();
    }
  }, [isModalOpen, memberId, refetch]);

  if (isLoading) {
    return (
      <div className="flex flex-row items-center justify-center">
        <h2 className="text-5xl text-amber-700 my-40">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meal Details</DialogTitle>
          </DialogHeader>

          {isMealsLoading ? (
            <div className="text-center py-4">
              <h1>Loading...</h1>
            </div>
          ) : mealDetails && mealDetails.meals.length > 0 ? (
            <div className="flex flex-col gap-2">
              {mealDetails.meals.map((meal, index) => (
                <div key={index} className="bg-amber-600 p-2 rounded-md cursor-pointer hover:bg-amber-500 duration-300">
                  <h1>{meal}</h1>
                </div>
              ))}
              <h3 className="text-md text-blue-700 mt-3">
                Last Updated: {new Date(mealDetails.updatedAt).toLocaleDateString()}
              </h3>
            </div>
          ) : (
            <div className="text-center py-4">
              <h1>No meals available</h1>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="px-10">
        <div className="flex flex-row items-center justify-center my-10 bg-amber-900 p-7 mx-10 border rounded-3xl">
          <h1 className="text-white text-2xl">All Members</h1>
        </div>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          {members?.map((member) => (
            <div className="bg-amber-500 p-3 rounded-md hover:bg-amber-300 duration-150" key={member._id}>
              <div className="mb-3">
                <h3>Name: {member.name}</h3>
                <h4>Email: {member.email}</h4>
                <p>Dietary Restrictions: {member.dietaryRestrictions || 'None'}</p>
              </div>
              <Button
                className="cursor-pointer"
                size="sm"
                onClick={() => {
                  setMemberId(member._id);
                  setIsModalOpen(true);
                }}
              >
                View Meals
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MembersPage;
