import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const { cryptoFamiliarity, interests, walletAddress, email } = await req.json();
      console.log('Received data:', { cryptoFamiliarity, interests, walletAddress, email });

      // Save the data to the database
      const newUser = await prisma.user.create({
        data: {
          cryptoFamiliarity,
          interests: { set: interests }, // Assuming interests is a string array
          walletAddress,
          email,
        },
      });
      console.log(`New user created: ${newUser}`);
      return NextResponse.json(
         {message: 'User information saved successfully', data: newUser},
         {status: 200}
      )
    } catch (error) {
      console.error('Error saving user information:', error);
      return NextResponse.json(
         {message: 'Failed to save user information'},
         {status: 500}
      )
    }
  } else {
    return NextResponse.json(
      {message: 'Method not allowed'},
      {status: 405}
    )
  }
} 