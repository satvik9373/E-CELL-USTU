import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { getOrCreateUser, createCertificateRequest } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId: clerkUserId } = getAuth(request);
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const { eventId } = await request.json();
    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    // Get or create user in Supabase
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create certificate request
    const certificateRequest = await createCertificateRequest(user.id, eventId);
    if (!certificateRequest) {
      return NextResponse.json(
        { error: 'Failed to create certificate request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Certificate request created successfully',
      request: certificateRequest
    });
  } catch (error) {
    console.error('Error creating certificate request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
