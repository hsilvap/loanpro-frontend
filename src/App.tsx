import "./App.css";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Amplify } from "aws-amplify";
import router from "./components/router";
import awsconfig from "./aws";

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
