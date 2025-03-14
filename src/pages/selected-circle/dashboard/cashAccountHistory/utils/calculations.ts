import {
  CalculatedEntry,
  SimplifiedClosingEntry,
} from "@/models/customModels/customModels";

export function calculateEntries(
  entries: SimplifiedClosingEntry[]
): CalculatedEntry[] {
  console.log(JSON.stringify(entries, null, 2));
  const calculatedEntries = entries.reduce<CalculatedEntry[]>(
    (acc, entry) => {
      // Calculate total of positive entries
      const positiveTotal = [
        entry.investment,
        entry.collection,
        entry.excess,
        entry.interest,
        entry.income,
      ].reduce((sum, value) => sum + value, 0);

      // Calculate total of negative entries
      const negativeTotal = [
        entry.newLoans,
        entry.withdrawals,
        entry.expenses,
        entry.deficit,
        entry.chits,
      ].reduce((sum, value) => sum + value, 0);

      // Get previous balance (0 if first entry)
      const previousBalance = entry.openingBalance // acc[index - 1]?.calculation.balance ||
        // index > 0 ? acc[index - 1].calculation.balance : 0;

      const balance = entry.balance ?? 0

      const calculatedEntry: CalculatedEntry = {
        ...entry,
        calculation: {
          positiveTotal,
          previousBalance,
          negativeTotal,
          balance,
        },
      };

      acc.push(calculatedEntry);
      return acc;
    },
    []
  );
  return calculatedEntries.reverse();
}
