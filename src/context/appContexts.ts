import { SimplifiedCustomer } from "@/models/customModels/customModels";
import { createContext } from "react";

export const CustomerOptionsContext = createContext<{
  currentCustomer: SimplifiedCustomer | null;
  setCurrentCustomer: (customer: SimplifiedCustomer | null) => void;
}>({
  currentCustomer: null,
  setCurrentCustomer: () => {},
});
