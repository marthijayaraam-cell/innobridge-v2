/**
 * Calculates Student Total Innovation Score according to specified formula:
 * (project_count * 10) + (avg_ai_overall_score * 5) + (avg_faculty_rating * 15) + (stage bonus)
 * Stage bonus mapped across all 11 lifecycle stages (0 to 20 pts)
 */
export function getStageBonus(stageName = '') {
  switch (stageName) {
    case 'Idea Formulation':
    case 'Ideation':
      return 0;
    case 'Problem Definition':
      return 2;
    case 'Research & Analysis':
      return 4;
    case 'Requirements & Planning':
      return 6;
    case 'Architecture & Design':
      return 8;
    case 'PoC / Prototype':
    case 'Prototype':
      return 10;
    case 'MVP Development':
      return 12;
    case 'Testing & Validation':
      return 14;
    case 'Pilot Deployment':
    case 'Pilot':
      return 16;
    case 'Final Product':
      return 18;
    case 'Launch -> Scale -> Maintain':
    case 'Launched':
      return 20;
    default:
      return 2;
  }
}

export function calculateStudentInnovationScore(projects = []) {
  if (!projects || projects.length === 0) return 0;

  const project_count = projects.length;

  let totalAIScore = 0;
  let totalFacultyRating = 0;
  let totalStageBonus = 0;

  projects.forEach((proj) => {
    // AI Overall Score (0-100)
    const aiOverall = proj.ai_scores?.overall_score || 0;
    totalAIScore += aiOverall;

    // Faculty rating (1-5)
    const rating = proj.avg_faculty_rating || 0;
    totalFacultyRating += rating;

    // Stage bonus mapping across 11 stages
    const stage = proj.stage || 'Idea Formulation';
    const bonus = getStageBonus(stage);

    totalStageBonus += bonus;
  });

  const avg_ai_overall_score = totalAIScore / project_count;
  const avg_faculty_rating = totalFacultyRating / project_count;

  const score = (project_count * 10) +
                (avg_ai_overall_score * 5) +
                (avg_faculty_rating * 15) +
                (totalStageBonus / project_count);

  return Math.round(score * 10) / 10; // Round to 1 decimal place
}
