import { useNavigate } from 'react-router-dom'
import { Navigation } from '../router/Navigation'

interface NavigateSetterProps {}

// this is a hack to allow us to navigate from outside of components where we can't use the hook, useNavigate
export const NavigateSetter = ({}: NavigateSetterProps): null => {
  Navigation.navigate = useNavigate()

  return null
}
