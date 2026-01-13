import { TextField } from "@/components/ui/forms";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React from "react";
import { ModalContext } from "@components/ui/modal/context/Context";
import Button from "@/components/ui/Button";
import { CreateDepartment } from "../../../modal/CreateDepartment";
import AddIcon from "@mui/icons-material/Add";

export const DepartmentHeader = ({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { setModal } = React.use(ModalContext);
  const setNewDepartmentModal = () => {
    setModal({
      open: true,
      footer: false,
      size: "sm",
      title: "Create a new department",
      content: <CreateDepartment />,
    });
  };
  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200 px-5 ">
      <div className="flex flex-col sm:flex-row gap-3 py-5">
        {/* Search Input */}
        <div className="w-full sm:w-5/12">
          <TextField
            name="agent"
            placeholder="Search Department"
            size="small"
            startAdornment={<SearchOutlinedIcon />}
            onChange={(e) => onChange(e)}
          />
        </div>

        {/* Invite Button */}
        <div className="w-full sm:w-7/12 flex justify-start sm:justify-end items-center">
          <Button
            onClick={setNewDepartmentModal}
            variant="secondary-outlined"
            leftIcon={<AddIcon />}
          >
            New Department
          </Button>
        </div>
      </div>
    </div>
  );
};
