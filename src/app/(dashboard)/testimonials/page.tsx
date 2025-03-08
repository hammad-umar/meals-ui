'use client';

import { Plus } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import TestimonialCard from '@/components/testimonial-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetTestimonials } from '@/hooks/useGetTestimonials';

const TestimonialsPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { isLoading, data: testimonials } = useGetTestimonials(searchTerm);

  return (
    <div className="px-7 py-3 bg-[#F0F5FD] w-full min-h-screen">
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

      {/* All Testimonials */}
      <div className="mb-5 flex flex-row items-center justify-between flex-wrap">
        <h2 className="text-[#2B3038] text-base font-semibold">All Testimonials</h2>
        <div>
          <div className="flex flex-row items-center gap-3 flex-wrap">
            <Button variant="outline" className="border border-[#0866FF] rounded-[10px] bg-[#F0F5FD] h-[44px]">
              <Image src="/menu-icon.svg" alt="menu-icon" width={18} height={18} />{' '}
              <span className="text-[#0866FF]">Scan QR</span>
            </Button>
            <Button variant="outline" className="border border-[#0866FF] rounded-[10px] bg-[#F0F5FD] h-[44px]">
              <Image src="/import-icon.svg" alt="import-icon" width={20} height={20} />{' '}
              <span className="text-[#0866FF]">Bulk Import</span>
            </Button>
            <Button className="flex flex-row bg-[#0866FF] rounded-[10px] h-[44px]">
              <Plus /> <span className="text-white">Add Testimonial</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filter and Input */}
      <div className="mb-5 flex flex-col md:flex-row items-center justify-between flex-wrap gap-y-3">
        <div className="w-full md:w-[10rem]">
          <Select
            onValueChange={(value) => {
              console.log({ value });
            }}
          >
            <SelectTrigger className="w-full bg-white border-0 rounded-none shadow-none">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <div className="relative max-w-[25rem] w-full md:w-[25rem]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Image src="/search-icon.svg" height={20} width={20} alt="search-icon" />
            </div>
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg bg-white pl-10 text-gray-700 placeholder-[#8B96A6] placeholder:text-sm placeholder:font-normal focus:ring-0 focus:outline-none border-none shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      {/* List of Testimonials */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : testimonials && testimonials?.length === 0 ? (
        <div>
          <h3 className="italic font-semibold text-base">No Content available</h3>
        </div>
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
              userName={testimonial.userName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
