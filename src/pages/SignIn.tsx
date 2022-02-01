import * as React from 'react';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase_config';
import { AuthContext } from './authContext';

function Signin(): React.ReactElement {
  const user = React.useContext(AuthContext);

  const signInWithGoogle = () => {
    // Googleプロバイダオブジェクトのインスタンスを作成
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return user ? (
    <Navigate to="/todo" />
  ) : (
    <div>
      <div className="login">
        <h1>ログイン</h1>
      </div>
      <div className="signin_button">
        <button type="button" onClick={signInWithGoogle}>
          GoogleでSign in
        </button>
      </div>
    </div>
  );
}

export default Signin;
