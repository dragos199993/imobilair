'use client'
import { Button } from '@/components/ui/button'
import { deleteAccountAction } from '@/actions/auth/delete-account'
import { logout } from '@/actions/auth/logout'

export const DeleteAccount = () => {
  const deleteAccount = async () => {
    await deleteAccountAction()
    await logout()
  }

  return (
    <div className="mt-6">
      <Button variant="destructive" onClick={() => deleteAccount()}>
        Delete account
      </Button>
    </div>
  )
}
