import { useState, useCallback } from "react";
import { SimplifiedCustomer } from "@/models/customModels/customModels";

export function useCustomerOptions(initialCustomer: SimplifiedCustomer) {
  const [selected, setSelected] = useState<string>("");
  const [currentCustomer, setCurrentCustomer] =
    useState<SimplifiedCustomer | null>(initialCustomer);

  const handleSelect = useCallback((option: string) => {
    setSelected(option);
  }, []);

  return {
    selected,
    currentCustomer,
    setCurrentCustomer,
    handleSelect,
  };
}
