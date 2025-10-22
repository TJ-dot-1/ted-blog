import { useContext } from 'react'
import AppContext from './contextValue.js'

const useAppContext = () => useContext(AppContext)

export default useAppContext
export { useAppContext }
