'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import TestimonialCard from '@/components/testimonial-card';
import { useGetTestimonials } from '@/hooks/useGetTestimonials';

const TestimonialsPage: NextPage = () => {
  const [searchTerm] = useState<string>('');

  const { isLoading, data: testimonials } = useGetTestimonials(searchTerm);

  return (
    <div className="px-7 py-5 bg-[#F0F5FD] h-screen">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-5">
        <h1 className="text-[#2B3038] font-semibold text-2xl">Testimonials</h1>

        <div className="flex gap-3">
          <div className="flex flex-col">
            <h3 className="text-base text-[#2B3038] font-medium">Hammad Umar</h3>
            <p className="text-xs text-[#8B96A6] font-normal self-end">Admin</p>
          </div>

          <div>
            <Image src="/user-img.png" height={33} width={33} alt="user-image" />
          </div>
        </div>
      </div>

      {/* List of Testimonials */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {testimonials?.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              age={testimonial.age}
              date={testimonial.createdAt}
              ethnicity={testimonial.ethnicity}
              gender={testimonial.gender}
              projectDescription={testimonial.projectDescription}
              projectName={testimonial.projectName}
              userName={testimonial.projectName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
