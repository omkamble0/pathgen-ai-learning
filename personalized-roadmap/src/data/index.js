// Import all the individual curriculum dictionaries
import { webCurriculum } from './web.js'
import { cyberCurriculum } from './cyber.js'
import { aiCurriculum } from './ai.js'
import { gameCurriculum } from './game.js'
import { cloudCurriculum } from './cloud.js'

// Export them as a single, unified object. 
// The keys here ('web', 'cyber', etc.) must exactly match the "values" used in your Survey!
export const CURRICULUM_DATA = {
  web: webCurriculum,
  cyber: cyberCurriculum,
  ai: aiCurriculum,
  game: gameCurriculum,
  cloud: cloudCurriculum
}
