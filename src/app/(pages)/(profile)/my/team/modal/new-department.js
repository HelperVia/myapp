"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";

import { ModalContext } from "@components/ui/modal/context/Context";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { NotifyContext } from "@components/ui/notification/context/Context";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Controller, useForm } from "react-hook-form";
import { AgentUserCard } from "@components/teams/agent-user-card";
import { AgentAvatar } from "@components/teams/agent-avatar";
import { AutoCompleteBox } from "@components/ui/selectbox/autocomplete";
import API from "@shared/lib/api/api";
import AddIcon from "@mui/icons-material/Add";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const NewDepartmentSuccess = (props) => {
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
          color="grey"
          onClick={newDepartment}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Create New Department
        </Button>
        <Button color="orange" onClick={done} variant="contained">
          Done
        </Button>
      </div>
    </div>
  );
};
const NewDepartmentError = (props) => {
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
          color="grey"
          onClick={tryAgain}
          variant="outlined"
          startIcon={<ArrowBackIosIcon />}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};
export const NewDepartment = (props) => {
  const chatprop = useAppSelector((state) => state.app);
  const [loading, setLoading] = useState(false);
  const { modal, setModal } = React.use(ModalContext);
  const { notify, setNotify } = React.use(NotifyContext);
  const [createDisabled, setCreateDisabled] = useState(true);
  const {
    getFieldState,
    register,
    trigger,
    formState: { errors },
    getValues,
    control,
  } = useForm();
  const dispatch = useAppDispatch();
  const closeModal = () => {
    setModal({
      open: false,
    });
  };

  const onChangeName = async (value) => {
    await validation();
  };

  const validation = async () => {
    const result = await trigger();
    if (!result) {
      setCreateDisabled(true);
    } else {
      setCreateDisabled(false);
    }
  };
  const onBlurName = async () => {
    await validation();
  };
  const createDepartmentAction = async () => {
    await validation();
    if (!getFieldState("department").error) {
      setLoading(true);
      setCreateDisabled(true);
      let agents = getValues("agents");
      let department = getValues("department");
      let formAgent = [];
      if (agents) {
        if (Object.keys(agents).length > 0) {
          agents.map((value) => {
            formAgent.push(value.id);
          });
        }
      }

      let formData = new FormData();
      formData.append("department", department);
      formData.append("agents", JSON.stringify(formAgent));

      API.post("team/department/create", formData).then(async (response) => {
        setLoading(false);
        setCreateDisabled(false);
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
        <Box className="w-full">
          <TextField
            {...register("department", {
              required: "Name is required",
              onBlur: (e) => {
                if (e.relatedTarget) {
                  if (e.relatedTarget.id != "create-department-button") {
                    onBlurName(e.target.value).then(() => {});
                  }
                }
              },
              onChange: (e) => {
                onChangeName(e.target.value).then(() => {});
              },
            })}
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                createDepartmentAction().then(() => {});
              }
            }}
            fullWidth
            autoFocus
            error={Boolean(errors.department)}
            helperText={errors.department && errors.department.message}
            name="department"
            placeholder="E.g. Marketing"
            size="medium"
            label="Department Name"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box className="w-full">
          <Controller
            control={control}
            name="agents"
            render={({ field }) => {
              const { onChange, onBlur, value } = field;
              return (
                <AutoCompleteBox
                  multiple
                  options={chatprop.agents}
                  disableCloseOnSelect
                  matchOption={{
                    matchFrom: "any",
                    stringify: (option) => option.agent_name + option.email,
                  }}
                  getOptionLabel={(option) => option.agent_name}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        avatar={
                          <AgentAvatar
                            {...getTagProps({ index })}
                            agent={option}
                          />
                        }
                        {...getTagProps({ index })}
                        sx={{ borderRadius: "0px" }}
                        label={option.agent_name}
                      />
                    ))
                  }
                  renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                      <li key={key} {...optionProps}>
                        <AgentUserCard roleShow={false} agent={option} />
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Agents (optional)"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Agent Name or Email"
                    />
                  )}
                  onChange={(event, selectedOptions) => {
                    onChange(selectedOptions);
                  }}
                />
              );
            }}
          />
        </Box>
      </div>
      <div className="flex flex-col gap-4">
        <new-department-action className="flex flex-row justify-end  gap-6 ">
          <Button onClick={closeModal} color="error" variant="text">
            Cancel
          </Button>
          <Button
            disabled={createDisabled}
            loading={loading}
            onClick={createDepartmentAction}
            id="create-department-button"
            loadingPosition="start"
            color="grey"
            variant="contained"
          >
            Create
          </Button>
        </new-department-action>
      </div>
    </div>
  );
};
