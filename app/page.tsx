'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VerticalCarousel from './components/VerticalCarousel';
import UserInformation from './components/UserInformation';
import { UserFormData } from '@/app/lib/validations/userForm';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserSubmit = async (data: UserFormData) => {
    try {
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className='h-screen overflow-hidden bg-gradient-to-r from-sky-800 to-sky-500 relative'>
      <div className='flex flex-col md:flex-row h-full'>
        <div className='flex flex-col w-full md:w-1/2 p-4 space-y-4 md:justify-center md:items-center'>
          {/* Mobile Layout (flex-row for logo and social) */}
          <div className="flex flex-row justify-between items-center md:flex-col md:space-y-4 w-full">
            <div className="w-[300px] md:w-[400px] lg:w-[440px]">
              <Image 
                src='/logo_full.png' 
                alt='Finch Logo' 
                width={440} 
                height={440}
                className="w-full h-auto"
              />
            </div>
            <Link 
              href="https://twitter.com/finchmoneyapp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="md:hidden text-black hover:text-gray-800 transition-colors p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
          </div>
          
          <div className="flex justify-center w-full py-4">
            <p className="text-white text-center text-sm md:text-base max-w-md">
              Stay up to date with the latest product developments! Sign up for Birdwatch to receive important updates in your inbox.
            </p>
          </div>

          <div className="flex justify-center w-full pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-[200px] px-6 py-3 bg-yellow-500 text-sky-800 rounded-lg text-base font-medium
              hover:bg-yellow-400 transition-colors whitespace-nowrap md:w-auto md:text-base"
            >
              Sign up to Birdwatch
            </button>
          </div>
        </div>
        
        <div className='w-full md:w-1/2 flex justify-end items-center h-full md:h-full'>
          <div className='w-full h-full bg-gradient-to-b md:bg-gradient-to-br from-sky-200 to-sky-500 rounded-t-[50px] md:rounded-tl-[50px] md:rounded-tr-none shadow-3xl'>
            <VerticalCarousel />
          </div>
        </div>
      </div>
      
      {/* Desktop social button */}
      <Link 
        href="https://twitter.com/finchmoneyapp" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hidden md:block absolute bottom-8 z-10 left-8 text-black hover:text-gray-800 transition-colors p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
      >
        <svg 
          className="w-6 h-6" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Link>

      <UserInformation 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUserSubmit}
      />
    </div>
  );
}
