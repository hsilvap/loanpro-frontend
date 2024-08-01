import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signIn } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../../aws";

interface AuthError {
  message?: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const invalid = !email || !password;

  useEffect(() => {
    isUserAuthenticated();
    const checkSession = async () => {
      const signedIn = await isUserAuthenticated();
      if (signedIn) {
        navigate("/");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSignIn = async () => {
    setError(null);
    isLoading(true);
    try {
      await signIn({ username: email, password });
      navigate("/");
    } catch (error) {
      console.log(error);
      const authError = error as AuthError;
      setError(authError.message ? authError.message : "Error signing in");
    }
    isLoading(false);
  };

  return (
    <Box
      display="flex"
      gap={2}
      border="solid 1px black"
      borderRadius="2rem"
      flexDirection="column"
      padding={10}
    >
      <Typography variant="h4">Welcome</Typography>
      <TextField
        required
        id="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        type="password"
        id="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {!!error && <Typography color="red">{error}</Typography>}

      <Button
        disabled={invalid || loading}
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default SignIn;
