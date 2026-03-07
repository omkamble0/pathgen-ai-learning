import { supabase } from './supabase.js'

export const AuthService = {
  // 1. REGISTER NEW USER
  async register(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name }
      }
    })
    
    if (error) return { success: false, message: error.message }
    return { success: true, data }
  },

  // 2. LOGIN USER
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) return { success: false, message: error.message }

    // Check if the user already has a saved roadmap in the cloud
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', data.user.id)
      .single()

    // If they have data, load it into the local session so the UI updates
    if (progressData && progressData.domain) {
       const pathData = {
          domain: progressData.domain,
          level: progressData.level,
          pace: 'serious' // Default placeholder
       }
       localStorage.setItem('userPath', JSON.stringify(pathData))
       return { success: true, hasData: true }
    }

    return { success: true, hasData: false }
  },

  // 3. LOGOUT
  async logout() {
    await supabase.auth.signOut()
    localStorage.removeItem('userPath')
  },

  // 4. SAVE SURVEY RESULTS TO CLOUD
  async saveUserPath(pathData) {
    // Save locally for immediate UI updates
    localStorage.setItem('userPath', JSON.stringify(pathData))

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Save permanently to Supabase
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        domain: pathData.domain,
        level: pathData.level
      }, { onConflict: 'user_id' })

    if (error) console.error("Error saving path to cloud:", error)
  },

  // 5. SAVE SYNC RESULTS (5-Card Audit)
  async saveSyncResults(score, moduleId) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const earnedXP = score * 20

    // Fetch current XP to add to it
    const { data: currentData } = await supabase
      .from('user_progress')
      .select('xp')
      .eq('user_id', user.id)
      .single()

    const newXP = (currentData?.xp || 0) + earnedXP

    // Update XP in the cloud
    const { error } = await supabase
      .from('user_progress')
      .update({ xp: newXP })
      .eq('user_id', user.id)

    if (error) console.error("Error saving XP:", error)
  }
}
