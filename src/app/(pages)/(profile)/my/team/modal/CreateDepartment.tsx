"use client";
import React, { useEffect, useState } from "react";
import Button from "@components/ui/Button";

import { ModalContext } from "@components/ui/modal/context/Context";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { NotifyContext } from "@components/ui/notification/context/Context";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  AutocompleteOption,
  TextField,
} from "@components/ui/forms";
import Chip from "@mui/material/Chip";
import { Controller, useForm } from "react-hook-form";
import { AgentCard } from "@components/teams";

import API from "@shared/lib/api/api";
import AddIcon from "@mui/icons-material/Add";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { selectAllAgents } from "@/store/agent/agent.selectors";
import { AgentType } from "@/types/team/agent";

const NewDepartmentSuccess = () => {
  const { modal, setModal } = React.use(ModalContext);
  const newDepartment = () => {
    setModal(modal.prev);
  };
  const done = () => {
    setModal({
      open: false,
    });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <Box>
        <img src="/icons/success.svg" />
      </Box>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="font-bold text-[22px]">a department created</span>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          color="brandGrey"
          onClick={newDepartment}
          variant="secondary-outlined"
          leftIcon={<AddIcon />}
        >
          Create New Department
        </Button>
        <Button color="primary" onClick={done} variant="primary">
          Done
        </Button>
      </div>
    </div>
  );
};
const NewDepartmentError = () => {
  const { modal, setModal } = React.use(ModalContext);
  const tryAgain = () => {
    setModal(modal.prev);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <Box>
        <img className="fill-['red']" src="/icons/error.svg" />
      </Box>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="font-bold text-[22px]">Could not add department</span>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          onClick={tryAgain}
          variant="gray"
          leftIcon={<ArrowBackIosIcon />}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};
export const CreateDepartment = () => {
  const agents = useAppSelector(selectAllAgents);
  const [loading, setLoading] = useState(false);
  const { modal, setModal } = React.use(ModalContext);
  const { notify, setNotify } = React.use(NotifyContext);
  const [disabled, setDisabled] = useState(true);

  const users: AutocompleteOption<AgentType>[] = agents.map((agent) => {
    return {
      label: agent.agent_name,
      value: agent.id,
      data: agent,
    };
  });

  const {
    getFieldState,
    register,
    trigger,
    watch,
    formState: { errors },
    getValues,
    control,
  } = useForm<{
    department_name: string;
    agents: string[];
  }>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();
  const closeModal = () => {
    setModal({
      open: false,
    });
  };

  useEffect(() => {
    const subscription = watch(() => {
      console.log(Object.keys(errors).length);
    });

    return () => subscription.unsubscribe();
  }, [watch, errors]);

  const validation = async () => {
    const result = await trigger();
    if (!result) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const onBlurName = async () => {
    await validation();
  };
  const createDepartmentAction = async () => {
    await validation();
    if (!getFieldState("department_name").error) {
      setLoading(true);
      setDisabled(true);
      let agents = getValues("agents");
      let department = getValues("department_name");
      let formAgent: any = [];
      if (agents) {
        if (Object.keys(agents).length > 0) {
          agents.map((value) => {});
        }
      }

      let formData = new FormData();
      formData.append("department", department);
      formData.append("agents", JSON.stringify(formAgent));

      API.post("team/department/create", formData).then(async (response) => {
        setLoading(false);
        setDisabled(false);
        let responseStatus = false;
        if (response.status === 200) {
          if (typeof response.data !== "undefined") {
            if (response.data.status === true) {
              responseStatus = true;
            }
          }
        }
        if (responseStatus) {
          setModal({
            open: true,
            size: "xs",
            close: false,
            footer: false,
            content: <NewDepartmentSuccess />,
          });
          dispatch({
            type: "SET_ALL_DEPARTMENTS",
            data: response.data.departments,
          });

          if (typeof response.data.agents !== "undefined") {
            dispatch({
              type: "SET_ALL_AGENTS",
              data: response.data.agents,
            });
          }
        } else {
          setModal({
            open: true,
            size: "xs",
            close: false,
            footer: false,
            content: <NewDepartmentError />,
          });
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-8 justify-between">
        <div className="w-full">
          <Controller
            name="department_name"
            control={control}
            rules={{
              required: "Department name is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers are allowed",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                label="Department Name"
                placeholder="E.g. Marketing"
                size="medium"
                error={errors.department_name?.message}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="agents"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                label="Agent (Opsiyonel)"
                placeholder="Search agent..."
                fullWidth
                variant="secondary"
                options={users}
                renderOption={(option) =>
                  option?.data ? <AgentCard agent={option?.data} /> : ""
                }
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-end  gap-6 ">
          <Button onClick={closeModal} variant="error">
            Cancel
          </Button>
          <Button
            disabled={disabled}
            loading={loading}
            onClick={createDepartmentAction}
            variant="gray"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};
