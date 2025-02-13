'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'


export const dynamic = 'force-dynamic'


type Profile = {
  id: string
  name: string
  email: string
  user_type: 'admin' | 'investor' | 'company'
  user_tier: 'root' | 'thrive' | 'impact'
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        router.push('/auth/login')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) {
        throw error
      }

      setProfile(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      if (!profile) return

      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          email: profile.email,
          user_type: profile.user_type,
          user_tier: profile.user_tier,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id)

      if (error) throw error
      setMessage('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage('Error updating profile')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={updateProfile} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={profile?.name || ''}
            onChange={(e) => setProfile(prev => ({ ...prev!, name: e.target.value }))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={profile?.email || ''}
            onChange={(e) => setProfile(prev => ({ ...prev!, email: e.target.value }))}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">User Type</label>
          <select
            value={profile?.user_type || 'investor'}
            onChange={(e) => setProfile(prev => ({ ...prev!, user_type: e.target.value as Profile['user_type'] }))}
            className="w-full p-2 border rounded"
          >
            <option value="investor">Investor</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">User Tier</label>
          <select
            value={profile?.user_tier || 'root'}
            onChange={(e) => setProfile(prev => ({ ...prev!, user_tier: e.target.value as Profile['user_tier'] }))}
            className="w-full p-2 border rounded"
          >
            <option value="root">Root</option>
            <option value="thrive">Thrive</option>
            <option value="impact">Impact</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}
