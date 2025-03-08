import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface TestimonialCardProps {
  date: string;
  userName: string;
  gender: string;
  age: number;
  ethnicity: string;
  projectName: string;
  projectDescription: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  date,
  userName,
  gender,
  age,
  ethnicity,
  projectName,
  projectDescription,
}) => {
  const images = ['/caro-img.png', '/caro-2-img.png', '/caro-3-img.png'];

  return (
    <div className="bg-white rounded-2xl p-5 w-full max-w-md">
      {/* Header */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <span className="text-[#8B96A6] text-sm font-normal">{new Date(date).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <Trash2 size={18} className="cursor-pointer hover:text-red-500" />
        </div>
      </div>

      {/* User Info */}
      <div className="mt-2">
        <h3 className="text-base font-semibold text-[#2B3038]">{userName}</h3>
        <p className="text-xs text-[#8B96A6] font-medium">
          {gender}, {age}, {ethnicity}
        </p>
      </div>

      {/* Project Name */}
      <div className="mt-2">
        <span className="bg-[#C7DEFF] text-[#2B3038] text-xs font-normal px-3 py-1 rounded-lg">{projectName}</span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-[#2B3038] leading-relaxed font-normal">
        {projectDescription.length > 100 ? (
          <>
            {projectDescription.substring(0, 100)} <span className="text-blue-600 cursor-pointer">Read more...</span>
          </>
        ) : (
          projectDescription
        )}
      </p>

      {/* Carousel */}
      {images.length > 0 && (
        <div className="mt-4 flex gap-2">
          {images.map((src, index) => (
            <Image key={index} src={src} alt={`image-${index}`} width={70} height={70} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
