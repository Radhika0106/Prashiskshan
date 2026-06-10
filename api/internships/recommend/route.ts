import { NextRequest, NextResponse } from 'next/server';
import { rankInternships, StudentMatchProfile, InternshipProfile } from '@/lib/engines/matching-engine';
import { MOCK_STUDENTS, MOCK_INTERNSHIPS } from '@/lib/mock/mockData';
import { CareerCategory } from '@/lib/engines/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const studentId = searchParams.get('studentId') || 's1';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 20;

    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    if (!student) {
      return NextResponse.json(
        { error: `Student with ID '${studentId}' not found.` },
        { status: 404 }
      );
    }

    // Prepare student match profile
    const studentProfile: StudentMatchProfile = {
      skills: student.skills.map(s => s.name),
      preferredLocation: student.preferredLocation || 'Pune',
      willingLocations: student.willingLocations || [],
      readiness: student.readinessBreakdown || {
        skillsScore: 50,
        learningPathScore: 50,
        peerLearningScore: 50,
        projectsScore: 50,
        certificationsScore: 50,
        total: student.readinessScore || 50,
      },
      selectedCareer: (student.selectedCareer || 'Software Development') as CareerCategory,
    };

    // Prepare internship profiles from mock internships
    const internshipProfiles: InternshipProfile[] = MOCK_INTERNSHIPS.map(internship => ({
      id: internship.id,
      title: internship.title,
      skillsRequired: internship.skillsRequired,
      skillsText: internship.skillsText || '',
      location: internship.location,
      workMode: internship.workMode,
      minReadiness: internship.minReadiness,
      careerCategory: internship.careerCategory,
      relatedCategories: internship.relatedCategories,
    }));

    const recommendations = rankInternships(studentProfile, internshipProfiles);
    const slicedRecs = recommendations.slice(0, limit);

    return NextResponse.json({
      recommendations: slicedRecs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
