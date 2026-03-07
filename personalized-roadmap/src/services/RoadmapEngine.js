import { CURRICULUM_DATA } from '../data/index.js'

export const RoadmapEngine = {
  
  /**
   * Retrieves the user's survey data and generates the tailored path.
   */
  generatePersonalizedPath() {
    // 1. Grab the raw survey data we saved earlier
    const surveyString = localStorage.getItem('user_survey')
    
    // Fallback if they somehow skipped the survey
    if (!surveyString) {
      // Return web or an empty fallback if web doesn't exist yet
      return CURRICULUM_DATA['web'] || { title: "Curriculum Loading...", phases: [], totalModules: 0 }
    }

    const surveyData = JSON.parse(surveyString)
    const subjectData = CURRICULUM_DATA[surveyData.path] || CURRICULUM_DATA['web']

    // 2. Deep clone the data so we don't accidentally mutate the original library files
    let personalizedPath = JSON.parse(JSON.stringify(subjectData))

    // 3. APPLY PERSONALIZATION LOGIC
    // Example: If they are "Advanced", we add a custom badge/title to Phase 1
    if (surveyData.experience === 'advanced' && personalizedPath.phases && personalizedPath.phases[0]) {
      personalizedPath.phases[0].title += " (Fast-Track Review)"
    }

    // Example: Calculate estimated timeline based on their "Chill" or "Hardcore" selection
    const baseModules = personalizedPath.totalModules || 25
    if (surveyData.time === 'casual') {
      personalizedPath.estimatedWeeks = baseModules * 2 // 2 weeks per module
    } else if (surveyData.time === 'intensive') {
      personalizedPath.estimatedWeeks = Math.ceil(baseModules / 2) // 2 modules per week
    } else {
      personalizedPath.estimatedWeeks = baseModules // 1 week per module
    }

    return personalizedPath
  },

  /**
   * Calculates the user's progress percentage for the dashboard later
   */
  calculateProgress(completedModules, totalModules) {
    if (!completedModules || totalModules === 0) return 0
    return Math.round((completedModules / totalModules) * 100)
  }
}
