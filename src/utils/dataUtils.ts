import { DataRow } from "@/types";

export const generateRandomData = ({
  length = 10,
  filledField = false,
}: {
  length: number;
  filledField?: boolean;
}): DataRow[] => {
  return Array.from({ length }, (_, i) => ({
    selection: false,
    name: `Name ${i + 1}`,
    age: undefined,
    company: "",
    contact: ["Support", "Sales", "HR"][Math.floor(Math.random() * 3)],
    country: "",
    field_1: filledField ? Math.floor(Math.random() * 100) + 1 : undefined,
    field_2: filledField ? Math.random() : undefined,
    field_3: filledField
      ? Math.random() > 0.5
        ? "Active"
        : "Inactive"
      : undefined,
    field_4: filledField
      ? ["Red", "Blue", "Green"][Math.floor(Math.random() * 3)]
      : undefined,
    field_5: filledField ? (Math.random() > 0.5 ? "Yes" : "No") : undefined,
    field_6: filledField ? Math.floor(Math.random() * 9000) + 1000 : undefined,
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyKeys = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
  );
};
