"use client";
import React, { useState } from "react";
import HvPopoverContent from "@components/ui/popover/popover-content";
import HvPopoperTrigger from "@components/ui/popover/popover-trigger";
import HvPopover from "@components/ui/popover/popover";
import { Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ModalContext } from "@components/ui/modal/context/Context";
import Link from "next/link";
import { ConfirmForm } from "@components/confirm-form";
import API from "@shared/lib/api/api";
import { NotifyContext } from "@components/ui/notification/context/Context";
import { useAppDispatch } from "@store/hooks";

export const DepartmentActionsRender = (props) => {
  const [closePopover, setClosePopover] = useState(true);
  const { modal, setModal } = React.use(ModalContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { notify, setNotify } = React.use(NotifyContext);
  const dispatch = useAppDispatch();
  const deleteAction = () => {
    let formData = new FormData();
    formData.append("id", props.data.id);
    setRemoveLoading(true);

    API.post("team/department/delete", formData).then(async (response) => {
      setRemoveLoading(false);
      let responseStatus = false;
      if (response.status === 200) {
        if (typeof response.data !== "undefined") {
          if (response.data.status === true) {
            responseStatus = true;
          }
        }
      }
      if (responseStatus) {
        setNotify({
          open: true,
          severity: "success",
          message: props.data.department + " deleted",
        });

        if (typeof response.data.departments !== "undefined") {
          dispatch({
            type: "SET_ALL_DEPARTMENTS",
            data: response.data.departments,
          });
        }
        if (typeof response.data.agents !== "undefined") {
          dispatch({
            type: "SET_ALL_AGENTS",
            data: response.data.agents,
          });
        }
      } else {
        setNotify({
          open: true,
          severity: "error",
          message: "department could not be deleted",
        });
      }
      setModal({
        open: false,
      });
    });
  };

  const confirm = () => {
    setClosePopover(!closePopover);

    setModal({
      open: true,
      size: "xs",
      close: false,
      footer: false,
      content: (
        <ConfirmForm
          title={"'" + props.data.department + "' department will be deleted"}
          confirmComponent={
            <Button
              loading={removeLoading}
              loadingPosition="start"
              variant="contained"
              color="error"
              onClick={deleteAction}
            >
              Delete
            </Button>
          }
          subtitle="When the department is deleted, information associated with the department will also be deleted. Chats and team members will not be deleted."
        />
      ),
    });
  };
  return (
    <React.Fragment>
      {props.data.default == "N" && (
        <HvPopover>
          <HvPopoverContent close={closePopover}>
            <div className="hv-user-account-container w-[180px]">
              <ul className="m-0 pt-[6px] pb-[6px] pr-0 pl-0">
                <Link href={"/agents/departments/" + props.data.id}>
                  <li className="gap-2 mt-0 mb-0 mr-[8px] ml-[8px] flex items-center hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer">
                    <span className="text-hv-color-13  rounded-[8px] text-[13px] relative  ">
                      Edit Department
                    </span>
                  </li>
                </Link>
                <li
                  onClick={confirm}
                  className="gap-2 mt-0 mb-0 mr-[8px] ml-[8px] flex items-center hover:bg-bg-color-1 hover:text-hv-color-13 rounded-[8px] pt-[9px] pb-[9px] pl-[8px] pr-[8px] flex cursor-pointer"
                >
                  <span className="text-error  rounded-[8px] text-[13px] relative  ">
                    Delete
                  </span>
                </li>
              </ul>
            </div>
          </HvPopoverContent>
          <HvPopoperTrigger>
            <IconButton aria-label="delete" size="medium">
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
          </HvPopoperTrigger>
        </HvPopover>
      )}
    </React.Fragment>
  );
};
