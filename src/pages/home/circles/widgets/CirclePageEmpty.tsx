import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuSquirrel } from "react-icons/lu";
import CreateNewCircle from "./CreateNewCircle";

function CirclesPageEmpty() {
  return (
    <Card className="w-[350px] flex flex-col items-center self-center">
      <CardHeader>
        <CardTitle className="flex flex-col items-center">
          <LuSquirrel
            strokeWidth={1}
            size={64}
            className="text-3xl text-foreground"
          />
          <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Its Empty Here
          </div>
        </CardTitle>
        <CardDescription>Create a new circle and get started</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateNewCircle />
      </CardContent>
    </Card>
  );
}

export default CirclesPageEmpty;