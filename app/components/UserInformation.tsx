'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { userFormSchema, type UserFormData } from '@/app/lib/validations/userForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import ErrorModal from './ErrorModal';

interface UserInformationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

export default function UserInformation({ isOpen, onClose, onSubmit }: UserInformationProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      cryptoFamiliarity: 0,
      interests: [],
      walletAddress: '',
      email: '',
      honeypot: '',
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardVisible(window.innerHeight < screen.height - 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const interestOptions = [
    { id: 'easy-earning', label: 'Easy Earning' },
    { id: 'simple-defi', label: 'Simplified DeFi' },
    { id: 'consolidated-finance', label: 'Consolidated finance experience' }
  ];

  const handleInterestToggle = (interest: string) => {
    const currentInterests = watch('interests');
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    setValue('interests', newInterests);
  };

  const onFormSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/submitUserForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted:', result);
      onSubmit(data);
      reset(); // Clear the form fields after submission
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Submission error:', error);
      setError('There was an issue submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isKeyboardVisible ? 'pb-20' : ''}`}
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-sky-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto relative"
            >
              <div className="absolute inset-0 bg-sky-500 opacity-20 blur-lg rounded-xl"></div>
              <div className="relative z-10">
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-4">Tell us about yourself</h2>
                  
                  {/* Honeypot Field */}
                  <input
                    type="text"
                    {...register('honeypot')}
                    className="hidden"
                    autoComplete="off"
                    tabIndex={-1}
                  />

                  {/* Crypto Familiarity */}
                  <div className="space-y-1">
                    <label className="block text-white text-sm">How familiar are you with crypto? <span className="text-yellow-500">*</span></label>
                    <div className="relative">
                      <div className="flex gap-2 justify-between">
                        <div className="flex flex-col items-center">
                          <span className="text-white/70 text-xs mb-1">Low</span>
                          <button
                            type="button"
                            onClick={() => setValue('cryptoFamiliarity', 1)}
                            className={`w-8 h-8 rounded-full ${
                              watch('cryptoFamiliarity') === 1
                                ? 'bg-yellow-500 text-sky-800'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            } transition-colors text-sm`}
                          >
                            1
                          </button>
                        </div>
                        {[2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setValue('cryptoFamiliarity', num)}
                            className={`w-8 h-8 rounded-full ${
                              watch('cryptoFamiliarity') === num
                                ? 'bg-yellow-500 text-sky-800'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            } transition-colors text-sm mt-5`}
                          >
                            {num}
                          </button>
                        ))}
                        <div className="flex flex-col items-center">
                          <span className="text-white/70 text-xs mb-1">High</span>
                          <button
                            type="button"
                            onClick={() => setValue('cryptoFamiliarity', 5)}
                            className={`w-8 h-8 rounded-full ${
                              watch('cryptoFamiliarity') === 5
                                ? 'bg-yellow-500 text-sky-800'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            } transition-colors text-sm`}
                          >
                            5
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-1">
                    <label className="block text-white text-sm">Why are you interested in Finch?</label>
                    <span className="text-white/70 text-xs">Select all which apply</span>
                    <div className="space-y-1">
                      {interestOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleInterestToggle(option.id)}
                          className={`w-full p-2 rounded-lg text-left text-sm ${
                            watch('interests').includes(option.id)
                              ? 'bg-yellow-500 text-sky-800'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          } transition-colors`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="space-y-1">
                    <label className="block text-white text-sm">Wallet Address</label>
                    <input
                      {...register('walletAddress')}
                      type="text"
                      placeholder="Ethereum, ENS, BNB, BTC, or Solana address"
                      className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm 
                        border border-white/20 text-white placeholder-white/70 text-base
                        focus:outline-none focus:ring-2 focus:ring-white/30
                        hover:bg-white/20 transition-all"
                    />
                    {errors.walletAddress && (
                      <p className="text-red-400 text-xs">{errors.walletAddress.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-white text-sm">Email Address <span className="text-yellow-500">*</span></label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Email Address"
                      required
                      className="w-full px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm 
                        border border-white/20 text-white placeholder-white/70 text-base
                        focus:outline-none focus:ring-2 focus:ring-white/30
                        hover:bg-white/20 transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-1/2 px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium
                        hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-1/2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isLoading ? 'bg-gray-400 text-gray-700' : 'bg-yellow-500 text-sky-800 hover:bg-yellow-400'
                      }`}
                    >
                      {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                  </div>
                  
                  <p className="text-white/70 text-xs text-center">
                    * Required field
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error Modal */}
      <ErrorModal 
        isOpen={!!error} 
        onClose={() => setError(null)} 
        message={error || ''} 
      />
    </>
  );
} 