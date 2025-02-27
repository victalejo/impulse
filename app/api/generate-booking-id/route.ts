// app/api/generate-booking-id/route.ts
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET() {
    const bookingId = new ObjectId().toString();
    return NextResponse.json({ bookingId });
}