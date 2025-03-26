import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import CustomForm from "./components/page/Form";
import TableSection from "@/components/page/TableSection";
import ActionButtons from "@/components/page/ActionButtons";
import { generateRandomData, removeEmptyKeys } from "@/utils/dataUtils";
import { formSchema, FormValues, DataRow } from "@/types";
import { HotTableRef } from "@handsontable/react-wrapper";
import { Analytics } from "@vercel/analytics/react";
import "./reset.css";

export default function App() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { company: "", contact: "", country: "", name: "" },
  });

  const hotRef = useRef<HotTableRef | null>(null);
  const [data, setData] = useState<DataRow[]>(
    generateRandomData({ length: 50 })
  );
  const [showAgeCol, setShowAgeCol] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const onSubmit = (formData: FormValues) => {
    if (!Object.values(formData).some((value) => value)) return;

    const newFormData = removeEmptyKeys(formData);
    const selectionIdxs: number[] = [];
    const selections = data.filter(
      (item, idx) => item.selection && selectionIdxs.push(idx)
    );

    setData((prev) => {
      const newData = [...prev];
      const fakeData = generateRandomData({
        length: selections.length,
        filledField: true,
      });

      selections.forEach((_, idx) => {
        newData[selectionIdxs[idx]] = {
          ...selections[idx],
          ...fakeData[idx],
          ...newFormData,
          selection: false,
        };
      });

      return newData;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Table Editable Demo
        </h2>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomForm />
            <ActionButtons
              enableSubmit={enableSubmit}
              setEnableSubmit={setEnableSubmit}
              setData={setData}
              setShowAgeCol={setShowAgeCol}
            />
          </form>
        </FormProvider>

        <TableSection
          hotRef={hotRef}
          data={data}
          showAgeCol={showAgeCol}
          setEnableSubmit={setEnableSubmit}
        />
      </div>
      <Analytics />
    </div>
  );
}
