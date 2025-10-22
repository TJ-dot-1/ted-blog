import React from 'react'
import { Navigate } from 'react-router-dom'
import useAppContext from '../../context/useAppContext'
import toast from 'react-hot-toast'

const AuthGuard = ({ children }) => {
  const { token } = useAppContext()
  if (!token) {
    toast.error('Please log in to continue')
    return <Navigate to='/login' replace />
  }
  return children
}

export default AuthGuard
