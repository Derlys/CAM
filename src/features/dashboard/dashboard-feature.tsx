'use client'
import { AppHero } from '@/components/app-hero'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { usePrivy } from '@privy-io/react-auth'
import { redirect } from 'next/navigation'

export default function DashboardFeature() {
  const { authenticated } = usePrivy()

  if (authenticated) {
    return redirect(`/profile`)
  }
  return (
    <div>
      <AppHero title="ConnetAMind" subtitle="A platform to connect mentors and students for learning sessions" />

      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletDropdown />
        </div>
      </div>
    </div>
  )
}