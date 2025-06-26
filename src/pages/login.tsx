import { Button } from "@/components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <h1>Login</h1>

      <Button variant="outline" onClick={() => loginWithRedirect()}>
        Entrar com Auth0
      </Button>
    </main>
  );
};

export default Login;
