import React, { useContext } from 'react';
import UserContext from 'src/contexts/user-context';

interface IfLoggedInProps {
  children: React.ReactNode;
  when?: boolean; // true = show when logged in, false = show when not logged in
}

const IfLoggedIn: React.FC<IfLoggedInProps> = ({ children, when = true }) => {
  const userContext = useContext(UserContext);
  const isSignedIn = userContext.sessionState.signedIn ?? false;

  // Show content based on the condition
  const shouldShow = when ? isSignedIn : !isSignedIn;

  if (!shouldShow) {
    return null;
  }

  return <>{children}</>;
};

export default IfLoggedIn;
