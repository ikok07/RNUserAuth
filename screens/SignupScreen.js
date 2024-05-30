import AuthContent from '../components/Auth/AuthContent';
import {authenticateUser} from "../util/auth";
import {useState} from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {useAuth} from "../store/auth-context";

function SignupScreen() {
  const {authenticate} = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function signupHandler({email, password}) {
    setIsLoading(true)
    const {idToken} = await authenticateUser("signUp", email, password)
    authenticate(idToken)
    setIsLoading(false)
  }

  if (isLoading) return <LoadingOverlay message={"Signing up..."}/>

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
