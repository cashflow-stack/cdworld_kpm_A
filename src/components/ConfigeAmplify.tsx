// import { useEffect, useState } from "react";
// import outputs from "@/../amplify_outputs.json";
// import { Amplify } from "aws-amplify";

// interface ConfigureAmplifyProps {
//   children?: React.ReactNode;
// }

// // Track if Amplify has been configured already
// let isConfigured = false;

// export default function ConfigureAmplify({ children }: ConfigureAmplifyProps) {
//   const [configured, setConfigured] = useState(isConfigured);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!isConfigured) {
//       try {
//         Amplify.configure(outputs);
//         isConfigured = true;
//         setConfigured(true);
//         console.log("AWS Amplify successfully configured");
//       } catch (err) {
//         const errorMessage =
//           err instanceof Error
//             ? err.message
//             : "Unknown error configuring Amplify";
//         console.error("Failed to configure AWS Amplify:", errorMessage);
//         setError(errorMessage);
//       }
//     }
//   }, []);

//   if (error) {
//     return <div>Error configuring AWS Amplify: {error}</div>;
//   }

//   if (!configured) {
//     return <div>Loading AWS configuration...</div>;
//   }

//   return <>{children}</>;
// }
