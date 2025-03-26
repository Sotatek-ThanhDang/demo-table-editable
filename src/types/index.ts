import { z } from "zod";

export const formSchema = z.object({
  company: z.string(),
  contact: z.string(),
  country: z.string(),
  name: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

export type DataRow = FormValues & {
  selection: boolean;
  age?: number;
  field_1?: number;
  field_2?: number;
  field_3?: string;
  field_4?: string;
  field_5?: string;
  field_6?: number;
};
