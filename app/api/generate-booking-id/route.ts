// app/api/generate-booking-id/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    const bookingId = uuidv4();
    return NextResponse.json({ bookingId });
}