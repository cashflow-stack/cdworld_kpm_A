import outputs from "@/../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);

interface ConfigureAmplifyProps {
    children?: React.ReactNode;
}

export default function ConfigureAmplify({ children }: ConfigureAmplifyProps) {
    return (<>{children}</>);
}