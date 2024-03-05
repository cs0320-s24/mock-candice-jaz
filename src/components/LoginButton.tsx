import { Dispatch, SetStateAction } from 'react';

/**
 * Interface defining the properties for the LoginButton component.
 * 
 * @param isLoggedIn Boolean indicating if the user is currently logged in.
 * @param setIsLoggedIn Function to update the login state.
 */
interface LoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * Renders a button that toggles the login state of the application.
 * 
 * This component displays a button with dynamic text and functionality based on the current login state.
 * When clicked, it toggles the state between logged in and logged out.
 * 
 * @param props The properties required by the LoginButton component.
 * @returns A button element that allows the user to log in or out.
 */
export function LoginButton({ isLoggedIn, setIsLoggedIn }: LoginProps) {

  /**
   * Toggles the login state.
   * 
   * This function inverts the current login state and updates it using the setIsLoggedIn function passed via props.
   * 
   * @returns The new login state.
   */
  const authenticate = () => {
    const newValue = !isLoggedIn;
    setIsLoggedIn(newValue);
    return newValue;
  };

  // Render a button with text and functionality based on the login state.
  return (
    <button aria-label={isLoggedIn ? 'Sign Out' : 'Login'} onClick={authenticate}>
      {isLoggedIn ? 'Sign out' : 'Login'}
    </button>
  );
}
