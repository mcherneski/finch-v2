import { z } from 'zod';

export const userFormSchema = z.object({
  cryptoFamiliarity: z.number().min(1).max(5),
  interests: z.array(z.string()).min(0),
  walletAddress: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email address'),
  honeypot: z.string().max(0, 'Bot detected'),
});

export type UserFormData = z.infer<typeof userFormSchema>; 