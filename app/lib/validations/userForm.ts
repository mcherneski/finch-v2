import { z } from 'zod';

// Regular expressions for different blockchain addresses
const ethereumRegex = /^0x[a-fA-F0-9]{40}$/;
const ensRegex = /^[a-zA-Z0-9-]+\.eth$/;
const bnbRegex = /^bnb1[0-9a-z]{38}$/; // Example for BNB Chain
const btcRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/; // Example for BTC
const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/; // Example for Solana

export const userFormSchema = z.object({
  cryptoFamiliarity: z.number().min(1, 'Please select your familiarity with crypto').max(5),
  interests: z.array(z.string()).min(0),
  walletAddress: z.string()
    .refine((value) => 
      ethereumRegex.test(value) || 
      ensRegex.test(value) || 
      bnbRegex.test(value) || 
      btcRegex.test(value) || 
      solanaRegex.test(value), {
      message: 'Invalid address. Please enter a valid Ethereum, ENS, BNB, BTC, or Solana address.',
    })
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email address'),
  honeypot: z.string().max(0, 'Bot detected'),
});

export type UserFormData = z.infer<typeof userFormSchema>; 