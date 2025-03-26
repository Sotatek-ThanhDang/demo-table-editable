import { Button } from "@/components/ui/button";
import { DataRow } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  enableSubmit: boolean;
  setEnableSubmit: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<DataRow[]>>;
  setShowAgeCol: Dispatch<SetStateAction<boolean>>;
}

const ActionButtons: React.FC<Props> = ({
  enableSubmit,
  setEnableSubmit,
  setData,
  setShowAgeCol,
}) => {
  return (
    <div className="flex gap-4">
      <Button type="submit" className="flex-1" disabled={!enableSubmit}>
        Update
      </Button>
      <Button
        className="flex-1"
        type="button"
        onClick={() => {
          setEnableSubmit(true);
          setData((prev) => prev.map((item) => ({ ...item, selection: true })));
        }}
      >
        Select All
      </Button>
      <Button
        className="flex-1"
        type="button"
        onClick={() => {
          setEnableSubmit(false);
          setData((prev) =>
            prev.map((item) => ({ ...item, selection: false }))
          );
        }}
      >
        Unselect All
      </Button>
      <Button
        type="button"
        className="flex-1"
        onClick={() => setShowAgeCol(true)}
      >
        Add Age Column
      </Button>
    </div>
  );
};

export default ActionButtons;
