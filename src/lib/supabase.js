import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fkevppvneyluonxqfwcf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Fallback dummy key to prevent crash if anon key is not set yet
const validAnonKey = supabaseAnonKey && supabaseAnonKey.trim().length > 10 
  ? supabaseAnonKey 
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrZXZwcHZuZXlsdW9ueHFmd2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTA0NjQwMH0.dummyKey';

export const isSupabaseConfigured = Boolean(supabaseAnonKey && supabaseAnonKey.trim().length > 10);

export const supabase = createClient(supabaseUrl, validAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Full 11 Stages list definition
export const ALL_11_STAGES = [
  'Idea Formulation',
  'Problem Definition',
  'Research & Analysis',
  'Requirements & Planning',
  'Architecture & Design',
  'PoC / Prototype',
  'MVP Development',
  'Testing & Validation',
  'Pilot Deployment',
  'Final Product',
  'Launch -> Scale -> Maintain'
];

// Helper seed data with diverse 11-stage project distribution
export const MOCK_PROJECTS = [
  {
    id: 'p1',
    title: 'EcoPulse — Solar Powered IoT Micro-Grid',
    description: 'An AI-driven IoT solution for real-time monitoring and optimization of solar power distribution in rural educational institutions.',
    domain: 'CleanTech & Energy',
    stage: 'Pilot Deployment',
    demo_url: 'https://ecopulse-demo.vercel.app',
    github_url: 'https://github.com/innovators/ecopulse',
    visibility: 'public',
    student_id: 's1',
    student_name: 'Aarav Sharma',
    college: 'IIT Bombay',
    ai_scores: {
      innovation_score: 92,
      feasibility_score: 88,
      impact_score: 95,
      technical_score: 90,
      market_score: 85,
      overall_score: 90,
      feedback: 'Outstanding sustainability focus with high commercial viability and well-architected IoT payload.'
    },
    avg_faculty_rating: 4.8,
    reviews_count: 5,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'p2',
    title: 'MediVision AI — Early Retinal Screening',
    description: 'Deep learning vision model designed for rapid detection of diabetic retinopathy using low-cost smartphone lens attachments.',
    domain: 'HealthTech',
    stage: 'PoC / Prototype',
    demo_url: 'https://medivision-ai.org',
    github_url: 'https://github.com/student-devs/medivision-ai',
    visibility: 'public',
    student_id: 's2',
    student_name: 'Ananya Roy',
    college: 'BITS Pilani',
    ai_scores: {
      innovation_score: 94,
      feasibility_score: 82,
      impact_score: 98,
      technical_score: 93,
      market_score: 89,
      overall_score: 91,
      feedback: 'High-impact medical innovation with great clinical potential. Next step: expand validation datasets.'
    },
    avg_faculty_rating: 4.9,
    reviews_count: 8,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'p3',
    title: 'ChainTrust — Decentralized Academic Credentials',
    description: 'Zero-knowledge cryptographic ledger for instant, tamper-proof university degree verification and skill badge issuance.',
    domain: 'Blockchain & FinTech',
    stage: 'Launch -> Scale -> Maintain',
    demo_url: 'https://chaintrust-edu.io',
    github_url: 'https://github.com/crypto-lab/chaintrust',
    visibility: 'public',
    student_id: 's3',
    student_name: 'Rohan Verma',
    college: 'Delhi Technological University',
    ai_scores: {
      innovation_score: 89,
      feasibility_score: 94,
      impact_score: 86,
      technical_score: 96,
      market_score: 90,
      overall_score: 91,
      feedback: 'Production-ready architecture with strong security proofs and immediate institutional utility.'
    },
    avg_faculty_rating: 4.7,
    reviews_count: 6,
    created_at: new Date(Date.now() - 86400000 * 12).toISOString()
  },
  {
    id: 'p4',
    title: 'AgriSense — Drone Crop Disease Analytics',
    description: 'Autonomous multi-spectral drone software providing micro-level soil nutrient mapping and localized pest predictions.',
    domain: 'AgriTech',
    stage: 'Requirements & Planning',
    demo_url: 'https://agrisense.tech',
    github_url: 'https://github.com/agri-innovators/agrisense',
    visibility: 'public',
    student_id: 's4',
    student_name: 'Priya Sundaram',
    college: 'Anna University',
    ai_scores: {
      innovation_score: 88,
      feasibility_score: 90,
      impact_score: 92,
      technical_score: 87,
      market_score: 88,
      overall_score: 89,
      feedback: 'Practical solution addressing critical agricultural yield challenges with actionable spatial intelligence.'
    },
    avg_faculty_rating: 4.6,
    reviews_count: 4,
    created_at: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: 'p5',
    title: 'NeuroLearn — Adaptive Brainwave Study Assistant',
    description: 'Consumer EEG headset app that adjusts study card pacing and dynamic audio frequencies based on cognitive focus metrics.',
    domain: 'EdTech & Neuro',
    stage: 'Idea Formulation',
    demo_url: 'https://neurolearn.app',
    github_url: 'https://github.com/student/neurolearn',
    visibility: 'public',
    student_id: 's5',
    student_name: 'Vikram Mehta',
    college: 'IIT Madras',
    ai_scores: {
      innovation_score: 95,
      feasibility_score: 75,
      impact_score: 85,
      technical_score: 88,
      market_score: 80,
      overall_score: 85,
      feedback: 'Fascinating cognitive science application. Requires hardware prototyping and UX friction reduction.'
    },
    avg_faculty_rating: 4.4,
    reviews_count: 3,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'p6',
    title: 'QuantumSecure — Post-Quantum Key Exchange',
    description: 'Lattice-based cryptographic library for quantum-resistant micro-service communication in financial networks.',
    domain: 'Cybersecurity',
    stage: 'Architecture & Design',
    demo_url: 'https://quantumsecure.dev',
    github_url: 'https://github.com/quantum/secure-lib',
    visibility: 'public',
    student_id: 's6',
    student_name: 'Kabir Das',
    college: 'IIT Kharagpur',
    ai_scores: {
      innovation_score: 96,
      feasibility_score: 80,
      impact_score: 92,
      technical_score: 98,
      market_score: 84,
      overall_score: 90,
      feedback: 'High mathematical rigor and critical future-proof security application.'
    },
    avg_faculty_rating: 4.8,
    reviews_count: 4,
    created_at: new Date(Date.now() - 86400000 * 6).toISOString()
  }
];

export const MOCK_STUDENTS_LEADERBOARD = [
  {
    id: 's_marthi',
    full_name: 'Marthi Jayaraam',
    college: 'IIT Bombay',
    domain: 'AI & Machine Learning',
    project_count: 5,
    avg_ai_score: 94.0,
    avg_faculty_rating: 4.9,
    stage_bonus: 16,
    innovation_score: 609.5
  },
  {
    id: 's2',
    full_name: 'Ananya Roy',
    college: 'BITS Pilani',
    domain: 'HealthTech',
    project_count: 4,
    avg_ai_score: 91.0,
    avg_faculty_rating: 4.8,
    stage_bonus: 12,
    innovation_score: 579.0
  },
  {
    id: 's_fhvx',
    full_name: 'Fhvx',
    college: 'Delhi Technological University',
    domain: 'Blockchain & FinTech',
    project_count: 4,
    avg_ai_score: 89.0,
    avg_faculty_rating: 4.7,
    stage_bonus: 10,
    innovation_score: 565.5
  },
  {
    id: 's_hitesh',
    full_name: 'Hitesh Sharma',
    college: 'IIT Madras',
    domain: 'CleanTech & Energy',
    project_count: 3,
    avg_ai_score: 87.5,
    avg_faculty_rating: 4.6,
    stage_bonus: 8,
    innovation_score: 544.5
  },
  {
    id: 's1',
    full_name: 'Aarav Sharma',
    college: 'IIT Bombay',
    domain: 'Robotics & Hardware',
    project_count: 3,
    avg_ai_score: 86.0,
    avg_faculty_rating: 4.5,
    stage_bonus: 8,
    innovation_score: 535.5
  },
  {
    id: 's4',
    full_name: 'Priya Sundaram',
    college: 'Anna University',
    domain: 'AgriTech',
    project_count: 2,
    avg_ai_score: 84.0,
    avg_faculty_rating: 4.4,
    stage_bonus: 6,
    innovation_score: 512.0
  },
  {
    id: 's5',
    full_name: 'Vikram Mehta',
    college: 'IIT Kharagpur',
    domain: 'EdTech & Neuro',
    project_count: 2,
    avg_ai_score: 81.0,
    avg_faculty_rating: 4.2,
    stage_bonus: 4,
    innovation_score: 492.0
  }
];
