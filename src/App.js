import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import Todos from "./Todos";
import firebase, { auth } from "./firebase";

const googleSignin = () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

const SignUp = () => (
  <main>
    <button onClick={googleSignin}>Sign in with google</button>
  </main>
);

const App = () => {
  const [user, loading] = useAuthState(auth);
  console.log({ user, loading });
  if (loading) {
    return (
      <main>
        <span>Loading ...</span>
      </main>
    );
  }
  return !user ? <SignUp /> : <Todos />;
};

export default App;
