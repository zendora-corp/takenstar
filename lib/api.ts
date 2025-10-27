const API_BASE_URL = 'https://takenstar-ms.vercel.app/api/public';
// const API_BASE_URL = 'http://localhost:3001/api/public';

export interface ExamYear {
  id: string;
  year: number;
  registrationOpenDate: string;
  registrationCloseDate: string;
  examDate: string;
  resultDate: string;
  status: string;
}

export interface District {
  id: string;
  name: string;
}

export interface School {
  id: string;
  name: string;
  districtId: string;
  districtName: string;
}

export interface StudentResult {
  student: {
    fullName: string;
    class: number;
    medium: string;
    districtName: string;
    schoolName: string;
    schoolRollNo: string;
  };
  marks: {
    gk: number;
    science: number;
    mathematics: number;
    logicalReasoning: number;
    currentAffairs: number;
  };
  totalMarks: number;
  percentage: number;
  rank: number;
  resultStatus: string;
}

export interface TopperResult {
  registrationId: string;
  student: {
    fullName: string;
    class: number;
    medium: string;
    districtName: string;
    schoolName: string;
    schoolRollNo: string;
  };
  totalMarks: number;
  percentage: number;
  rank: number;
}

export interface GroupToppers {
  group: string;
  toppers: TopperResult[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface RegistrationFormData {
  examYearId: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob?: string | null; // ✅ Optional
  class: number;
  medium: 'Assamese' | 'English';
  schoolId: string;
  schoolRollNo: string;
  districtId: string;
  address: string;
  studentMobile: string;
  guardianMobile?: string | null; // ✅ Optional
  email?: string;
  paymentOption: 'Online' | 'Offline';
  transactionId?: string;
  offlineReceiptNo?: string;
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }

  return data.data;
}

export async function getActiveExamYear(): Promise<ExamYear> {
  return fetchAPI<ExamYear>('/exam-year/active');
}

export async function getAllExamYears(): Promise<ExamYear[]> {
  return fetchAPI<ExamYear[]>('/exam-years');
}

export async function getDistricts(): Promise<District[]> {
  return fetchAPI<District[]>('/refs/districts');
}

export async function getSchools(districtId?: string): Promise<School[]> {
  const query = districtId ? `?districtId=${districtId}` : '';
  return fetchAPI<School[]>(`/refs/schools${query}`);
}

export async function resultLookup(params: {
  examYear: number;
  districtName: string;
  schoolName: string;
  schoolRollNo: string;
}): Promise<StudentResult> {
  const query = new URLSearchParams({
    examYear: params.examYear.toString(),
    districtName: params.districtName,
    schoolName: params.schoolName,
    schoolRollNo: params.schoolRollNo,
  });
  return fetchAPI<StudentResult>(`/result-lookup?${query}`);
}

export async function getResultsBySchool(params: {
  examYear: number;
  schoolId?: string;
  districtName?: string;
  schoolName?: string;
}): Promise<{
  examYear: number;
  school: School;
  results: StudentResult[];
}> {
  const query = new URLSearchParams({
    examYear: params.examYear.toString(),
  });

  if (params.schoolId) {
    query.append('schoolId', params.schoolId);
  } else if (params.districtName && params.schoolName) {
    query.append('districtName', params.districtName);
    query.append('schoolName', params.schoolName);
  }

  return fetchAPI(`/results/by-school?${query}`);
}

export async function getTop3ByGroup(examYear: number): Promise<GroupToppers[]> {
  return fetchAPI<GroupToppers[]>(`/results/top3-by-group?examYear=${examYear}`);
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to submit contact form');
    }
  });
}

export async function submitRegistration(data: RegistrationFormData): Promise<void> {
  await fetch(`${API_BASE_URL}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to submit registration');
    }
  });
}
