/**
 * AI Scoring Module for InnoBridge Projects
 * Simulates or executes call to LLM Endpoint returning structured evaluation JSON:
 * { innovation_score, feasibility_score, impact_score, technical_score, market_score, overall_score, feedback }
 */
export async function scoreProject(project) {
  const { title = '', description = '', domain = '', stage = 'Ideation', github_url = '' } = project;

  // Simulate network latency of AI inference endpoint (1.2s - 2s)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Domain weight modifiers
  const domainBonus = {
    'AI & Machine Learning': 5,
    'CleanTech & Energy': 4,
    'HealthTech': 5,
    'Blockchain & FinTech': 3,
    'AgriTech': 4,
    'EdTech & Neuro': 3,
    'Cybersecurity': 4,
    'Robotics & Hardware': 5,
  }[domain] || 2;

  // Stage multipliers
  const stageBonus = {
    'Ideation': 0,
    'Prototype': 4,
    'Pilot': 8,
    'Launched': 12,
  }[stage] || 0;

  const descLength = description.length;
  const hasGithub = github_url && github_url.trim().length > 5 ? 4 : 0;
  const wordCount = description.split(/\s+/).filter(Boolean).length;

  // Compute calculated metrics with controlled randomness for realism
  const baseScore = 75 + Math.min(15, Math.floor(wordCount / 8)) + domainBonus + hasGithub;
  
  const innovation_score = Math.min(99, Math.max(65, baseScore + Math.floor(Math.random() * 8 - 3)));
  const feasibility_score = Math.min(98, Math.max(60, 70 + stageBonus + Math.floor(Math.random() * 10 - 2)));
  const impact_score = Math.min(99, Math.max(68, baseScore + domainBonus + Math.floor(Math.random() * 6 - 2)));
  const technical_score = Math.min(98, Math.max(62, 72 + hasGithub * 2 + Math.floor(Math.random() * 8)));
  const market_score = Math.min(96, Math.max(60, 74 + stageBonus + Math.floor(Math.random() * 10 - 4)));

  const overall_score = Math.round(
    (innovation_score * 0.25) +
    (feasibility_score * 0.20) +
    (impact_score * 0.25) +
    (technical_score * 0.15) +
    (market_score * 0.15)
  );

  // Generate actionable, personalized AI feedback
  let feedback = '';
  if (overall_score >= 90) {
    feedback = `Exceptional ${domain} project with high market viability and standout technical depth. Recommended for immediate seed funding accelerator review.`;
  } else if (overall_score >= 82) {
    feedback = `Solid ${stage} implementation with compelling impact potential. Focus on bolstering user validation data and refining the hardware/software prototype architecture.`;
  } else {
    feedback = `Promising core thesis in ${domain}. Suggest expanding project documentation, detailing target user personas, and creating an interactive live demo.`;
  }

  return {
    innovation_score,
    feasibility_score,
    impact_score,
    technical_score,
    market_score,
    overall_score,
    feedback
  };
}
