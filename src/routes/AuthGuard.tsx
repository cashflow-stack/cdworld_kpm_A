import { useEffect, useMemo } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router";

type AuthProviderProps = PropsWithChildren;

export default function AuthGuard({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isAuthenticated = useMemo(
    () => authStatus === "authenticated",
    [authStatus]
  );
  useEffect(() => {
    if (authStatus !== "authenticated") {
      navigate("/Authentication", { replace: true });
    }
  }, [authStatus, navigate]);

  if (authStatus === "configuring") {
    return <div>Loading authentication status...</div>;
  }

  if (authStatus !== "authenticated") {
    return <div>Redirecting to authentication...</div>;
  }

  return <>{isAuthenticated && children}</>;
}
