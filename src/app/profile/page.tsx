'use client'

import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'

export default function ProfilePage() {
  const { user, logout } = usePrivy()

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Profile</h1>
      {user && (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p>{user.google?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{user.google?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Wallet Address</p>
            <p>{user.wallet?.address || 'N/A'}</p>
          </div>
        </div>
      )}
      <Button onClick={logout} className="mt-6">Logout</Button>
    </div>
  )
}