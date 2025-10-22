import React from 'react'
import RegisteredGuard from './RegisteredGuard'

const VerifiedGuard = ({ children }) => {
  return <RegisteredGuard>{children}</RegisteredGuard>
}

export default VerifiedGuard
