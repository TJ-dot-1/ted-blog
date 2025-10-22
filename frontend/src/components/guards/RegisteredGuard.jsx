import React from 'react'
import { Navigate } from 'react-router-dom'
import useAppContext from '../../context/useAppContext'
// toast intentionally removed to avoid automatic messages on redirect

const RegisteredGuard = ({ children }) => {
  const { user } = useAppContext()
  // user.isRegistered indicates profile completion/verification
  if (!user || !user.isRegistered) {
    // silently redirect unregistered users to home
    return <Navigate to='/' replace />
  }
  return children
}

export default RegisteredGuard
