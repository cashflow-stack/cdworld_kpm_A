import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

/**
 * Component for handling authentication events and rendering the authentication form.
 * @param children - The child components to be rendered within the Authenticator component.
 * @returns The rendered Authenticator component.
 */

function AuthClient() {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  const components = {
    Header() {
      return (
        <div className="flex flex-col items-center py-6 space-y-2">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff80b5] to-[#9089fc]">
            Welcome to Cashflow
          </h1>
          <p className="text-gray-400 text-sm font-light">
            Empower your financial journey with us
          </p>
        </div>
      );
    },
    Footer() {
      return (
        <div className="flex flex-col items-center py-6 space-y-2">
          <p className="text-gray-400 text-sm font-light">
            By signing up, you agree to our{" "}
            <a href="#" className="text-[#ff80b5] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#ff80b5] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      );
    },
  };
  /**
   * Defines the form fields for the sign-up process.
   */
  const formFields = {
    signUp: {
      name: {
        order: 1,
      },
      email: {
        order: 2,
      },
      phone_number: {
        order: 3,
        dialCode: "+91",
      },
      password: {
        order: 4,
      },
      confirm_password: {
        order: 6,
      },
    },
  };
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);
  return <Authenticator formFields={formFields} components={components} />;
}

export default function Authentication() {
  return (
    <main>
      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <AuthClient />
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </main>
  );
}
