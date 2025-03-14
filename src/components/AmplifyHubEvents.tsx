import { Hub } from "aws-amplify/utils";
import { useDispatch } from "react-redux";
import { resetHelper } from "@/toolkit/helper/helperSlice";
import { AppDispatch } from "@/toolkit/store";
import { CONNECTION_STATE_CHANGE, ConnectionState } from "aws-amplify/data";
export const AmplifyHubEvents = ({ child }: { child?: React.ReactNode }) => {
  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState as ConnectionState;
      console.log(connectionState);
    }
  });
  const dispatch = useDispatch<AppDispatch>();
  Hub.listen("auth", ({ payload }) => {
    switch (payload.event) {
      case "signedIn":
        console.log("user have been signedIn successfully.");
        break;
      case "signedOut":
        dispatch(resetHelper());
        console.log("user have been signedOut successfully.");
        break;
      case "tokenRefresh":
        console.log("auth tokens have been refreshed.");
        break;
      case "tokenRefresh_failure":
        console.log("failure while refreshing auth tokens.");
        break;
      case "signInWithRedirect":
        console.log("signInWithRedirect API has successfully been resolved.");
        break;
      case "signInWithRedirect_failure":
        console.log("failure while trying to resolve signInWithRedirect API.");
        break;
      case "customOAuthState":
        console.info("custom state returned from CognitoHosted UI");
        break;
    }
  });

  return <>{child}</>;
};
