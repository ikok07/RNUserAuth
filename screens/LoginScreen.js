import AuthContent from '../components/Auth/AuthContent';
import {useState} from "react";
import {authenticateUser} from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {useAuth} from "../store/auth-context";

function LoginScreen() {
  const {authenticate} = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function loginHandler({email, password}) {
    setIsLoading(true)
    const {idToken} = await authenticateUser("signInWithPassword", email, password)
    setIsLoading(false)
    authenticate(idToken)
  }

  if (isLoading) return <LoadingOverlay message={"Logging in..."}/>

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
