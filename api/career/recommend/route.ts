import { NextRequest, NextResponse } from 'next/server';
import { recommendCareers } from '@/lib/engines/career-engine';
import { AssessmentResponse } from '@/lib/engines/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const responses: AssessmentResponse = body.assessment_responses;
    if (!responses || !Array.isArray(responses) || responses.length !== 25) {
      return NextResponse.json(
        { error: 'Invalid assessment_responses. Expected a 25-element array.' },
        { status: 400 }
      );
    }
    const recommendations = recommendCareers(responses);
    return NextResponse.json({
      career_recommendations: recommendations.map(r => r.career),
      confidence_scores: recommendations.map(r => r.confidence),
      recommendations,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
