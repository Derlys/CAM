'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { usePrivy, useWallets } from '@privy-io/react-auth'

function WalletAvatar({ address }: { address: string }) {
  return (
    <Avatar className="rounded-md h-6 w-6">
      <AvatarFallback>{address.slice(2, 4).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export function WalletDropdown() {
  const { ready, authenticated, login, logout, user } = usePrivy()
  const { wallets } = useWallets()
  console.log("Privy detected wallets:", wallets)

  if (!ready) return null

  const primaryWallet = wallets[0]
  const address = primaryWallet?.address

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {authenticated && address ? (
            <>
              <WalletAvatar address={address} />
              {address.slice(0, 4)}...{address.slice(-4)}
            </>
          ) : (
            'Connect Wallet'
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {authenticated && address ? (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(address)}
            >
              Copy address
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              Disconnect
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : null}

        {!authenticated ? (
          <DropdownMenuItem className="cursor-pointer" onClick={login}>
            Login with Privy
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
