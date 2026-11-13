import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import AccountCard from '../components/profile/AccountCard'
import AccountOverview from '../components/profile/AccountOverview'
import LogoutButton from '../components/profile/LogoutButton'
import PreferencesCard from '../components/profile/PreferencesCard'
import ProfileHeader from '../components/profile/ProfileHeader'
import SettingsCard from '../components/profile/SettingsCard'
import { useAllergens } from '../hooks/useAllergens'
import { clearSession, readUser } from '../session'
import type { MealioUser } from '../types'

function Profile() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const { allergens, loading: allergensLoading, error: allergensError } = useAllergens()

  const user = readUser<MealioUser>()
  const name = user?.name?.trim() || 'Guest'
  const email = user?.email?.trim() || 'Not signed in'

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar current="/profile" open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0 flex-1 bg-white">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <ProfileHeader menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

          <main className="mt-6 grid gap-4">
            <AccountCard name={name} email={email} />
            <AccountOverview />
            <PreferencesCard
              allergens={allergens}
              loading={allergensLoading}
              error={allergensError}
            />
            <SettingsCard
              notifications={notifications}
              onNotificationsChange={setNotifications}
            />
            <LogoutButton onClick={handleLogout} />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Profile
