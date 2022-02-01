import { getRedirectResult, signOut, User, UserCredential } from 'firebase/auth';
import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import DB from './db';
import { auth } from './firebase_config';

export const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const db: DB = DB.getInstance();
  const login = (result: UserCredential | null) => {
    if (result) {
      db.getAuthData(result.user.uid)
        .then((authData: String) => {
          if (authData === '') {
            signOut(auth);
          } else {
            setUser(result.user);
          }
          setIsLoading(false);
        })
        .catch(() => {
          signOut(auth);
        });
    } else {
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRedirectResult(auth).then(login);
  }, []);

  if (isLoading) {
    return (
      <LoadingOverlay active spinner text="Loading...">
        <div style={{ height: '100vh', width: '100vw' }} />
      </LoadingOverlay>
    );
  }
  return <AuthContext.Provider value={user}>{!isLoading && children}</AuthContext.Provider>;
}

export default AuthProvider;
