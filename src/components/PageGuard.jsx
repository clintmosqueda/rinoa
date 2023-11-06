'use client'
import React from 'react'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export const PageGuard = ({ children }) => {
  const router = useRouter()
  const { status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/')
  }

  if (status === 'loading') {
    return <p>loading...</p>
  }

  return (
    <>
      {status === 'authenticated' && (
        <>{children}</>
      )}
    </>
  )
}