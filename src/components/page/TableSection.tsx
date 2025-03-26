import {
  HotTable,
  HotColumn,
  HotRendererProps,
  HotTableRef,
} from "@handsontable/react-wrapper";
import { Checkbox } from "@/components/ui/checkbox";
import { DataRow } from "@/types";
import { generateRandomData } from "@/utils/dataUtils";

interface TableSectionProps {
  hotRef: React.RefObject<HotTableRef | null>;
  data: DataRow[];
  showAgeCol: boolean;
  setEnableSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableSection: React.FC<TableSectionProps> = ({
  hotRef,
  data,
  showAgeCol,
  setEnableSubmit,
}) => {
  return (
    <div
      className="w-full h-[800px] pt-10 pb-10"
      style={{ zIndex: 0, position: "relative", overflowX: "auto" }}
    >
      <HotTable
        ref={hotRef}
        data={data}
        colWidths={[80, 200, 150, 150, 150, 150, 150, 150, 150, 150, 150]}
        colHeaders={
          [
            "Select",
            "Name",
            showAgeCol ? "Age" : undefined,
            "Company",
            "Contact",
            "Country",
            "Sample field 1",
            "Sample field 2",
            "Sample field 3",
            "Sample field 4",
            "Sample field 5",
            "Sample field 6",
          ].filter(Boolean) as string[]
        }
        width="100%"
        height="100%"
        licenseKey="non-commercial-and-evaluation"
        autoWrapRow
        autoWrapCol
        stretchH="all"
        rowHeaders
        themeName="ht-theme-horizon"
        autoColumnSize
        autoRowSize
        manualColumnResize
        manualRowResize
        manualRowMove
        afterPaste={(_, coord) => {
          const instance = hotRef.current?.hotInstance;
          const { startRow, endRow, startCol } = coord[0];

          if (startCol < (showAgeCol ? 6 : 5)) {
            alert(
              `Auto fill sample field after paste from row ${startRow + 1} to ${
                endRow + 1
              }`
            );

            const fakeData = generateRandomData({
              length: endRow - startRow + 1,
              filledField: true,
            });

            if (instance) {
              let filledIdx = 0;
              for (let i = startRow; i <= endRow; i++) {
                instance.setDataAtRowProp(
                  i,
                  "field_1",
                  fakeData[filledIdx].field_1
                );
                instance.setDataAtRowProp(
                  i,
                  "field_2",
                  fakeData[filledIdx].field_2
                );
                instance.setDataAtRowProp(
                  i,
                  "field_3",
                  fakeData[filledIdx].field_3
                );
                instance.setDataAtRowProp(
                  i,
                  "field_4",
                  fakeData[filledIdx].field_4
                );
                instance.setDataAtRowProp(
                  i,
                  "field_5",
                  fakeData[filledIdx].field_5
                );
                instance.setDataAtRowProp(
                  i,
                  "field_6",
                  fakeData[filledIdx].field_6
                );

                filledIdx++;
              }
            }
          }
        }}
        afterChange={(changes) => {
          changes?.forEach(([, col, , newValue]) => {
            if (col === "selection" && newValue) {
              setEnableSubmit(true);
            }
          });
        }}
      >
        <HotColumn data="selection" renderer={CheckboxRenderer} readOnly />
        <HotColumn data="name" />
        {showAgeCol && <HotColumn data="age" />}
        <HotColumn data="company" />
        <HotColumn data="contact" />
        <HotColumn data="country" />
        <HotColumn data="field_1" readOnly style={{ color: "red" }} />
        <HotColumn data="field_2" readOnly />
        <HotColumn data="field_3" readOnly />
        <HotColumn data="field_4" readOnly />
        <HotColumn data="field_5" readOnly />
        <HotColumn data="field_6" readOnly />
      </HotTable>
    </div>
  );
};

export default TableSection;

const CheckboxRenderer = (props: HotRendererProps) => {
  const { instance, row, col, value } = props;

  const handleChange = (checked: boolean) => {
    instance.setDataAtCell(row, col, checked);
  };

  return (
    <div className="w-full text-center">
      <Checkbox checked={value} onCheckedChange={handleChange} />
    </div>
  );
};
