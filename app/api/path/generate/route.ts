import { NextRequest, NextResponse } from 'next/server';
import { generatePath } from '@/lib/engines/path-engine';
import { CareerCategory } from '@/lib/engines/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const studentId = searchParams.get('studentId') || 's1';
    const career = searchParams.get('career') as CareerCategory;

    if (!career) {
      return NextResponse.json(
        { error: 'career parameter is required.' },
        { status: 400 }
      );
    }

    // Default mock assessment responses (25 dimensions)
    // s1 (Arjun) focuses on Data Science/Software Development.
    // s2 (Priya) focuses on Web Development.
    let responses = [3, 4, 3, 3, 2, 4, 3, 3, 3, 2, 4, 3, 2, 3, 4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3];
    if (studentId === 's2') {
      responses = [2, 3, 4, 2, 3, 2, 5, 2, 4, 3, 3, 2, 3, 2, 4, 5, 3, 4, 3, 3, 4, 3, 4, 4, 4];
    }

    const path = generatePath(career, responses);
    return NextResponse.json({ path });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
