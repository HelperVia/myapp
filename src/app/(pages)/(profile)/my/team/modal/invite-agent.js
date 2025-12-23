import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AGENT_ROLE_AGENT, AGENT_ROLE_SUPERADMIN } from "@constants/Agent";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { emailValidation } from "@lib/validation";
import { SelectBox } from "@components/ui/selectbox/selectbox";
import { apiFetch } from "@lib/api/api.fetch";
import { ModalContext } from "@components/ui/modal/context/Context";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useAppDispatch } from "@store/hooks";
import AddIcon from "@mui/icons-material/Add";
import { ApiResponse } from "@shared/lib/api/response/api.response.client";

const InviteSuccess = (props) => {
  const { modal, setModal } = React.use(ModalContext);
  const newAgent = () => {
    setModal(modal.prev);
  };
  const done = () => {
    setModal({
      open: false,
    });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <div>
        <svg
          className="w-[100px] h-[100px] fill-[#C4CDD5]"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M805.546667 733.866667H235.52c-20.48 0-37.546667-10.24-47.786667-27.306667s-17.066667-37.546667-6.826666-54.613333l122.88-296.96c17.066667-37.546667 54.613333-64.853333 95.573333-64.853334h563.2c20.48 0 37.546667 10.24 47.786667 27.306667 10.24 17.066667 13.653333 37.546667 6.826666 54.613333l-112.64 296.96c-17.066667 40.96-54.613333 64.853333-98.986666 64.853334z m-409.6-409.6c-27.306667 0-54.613333 17.066667-64.853334 44.373333l-122.88 296.96c-3.413333 6.826667-3.413333 17.066667 3.413334 23.893333 3.413333 6.826667 13.653333 10.24 20.48 10.24h570.026666c27.306667 0 54.613333-17.066667 64.853334-44.373333l112.64-296.96c3.413333-6.826667 3.413333-17.066667-3.413334-23.893333s-13.653333-10.24-20.48-10.24H395.946667z"
            fill=""
          />
          <path
            d="M597.333333 529.066667c-30.72 0-61.44-10.24-88.746666-30.72l-122.88-109.226667c-6.826667-6.826667-6.826667-17.066667 0-23.893333 6.826667-6.826667 17.066667-6.826667 23.893333 0l122.88 109.226666c30.72 23.893333 75.093333 30.72 112.64 13.653334l221.866667-122.88c6.826667-3.413333 17.066667 0 23.893333 6.826666 3.413333 6.826667 0 17.066667-6.826667 23.893334l-221.866666 126.293333c-23.893333 3.413333-44.373333 6.826667-64.853334 6.826667zM276.48 665.6c-6.826667 0-13.653333-3.413333-17.066667-10.24-3.413333-10.24 0-17.066667 6.826667-23.893333l221.866667-102.4c10.24-3.413333 17.066667 0 23.893333 6.826666 3.413333 10.24 0 17.066667-6.826667 23.893334l-221.866666 102.4c0 3.413333-3.413333 3.413333-6.826667 3.413333zM788.48 665.6c-3.413333 0-6.826667 0-10.24-3.413333l-119.466667-102.4c-6.826667-6.826667-6.826667-17.066667-3.413333-23.893334 6.826667-6.826667 17.066667-6.826667 23.893333-3.413333l119.466667 102.4c6.826667 6.826667 6.826667 17.066667 3.413333 23.893333-3.413333 3.413333-6.826667 6.826667-13.653333 6.826667zM191.146667 358.4h-170.666667c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066666h170.666667c10.24 0 17.066667 6.826667 17.066666 17.066666s-6.826667 17.066667-17.066666 17.066667zM64.853333 699.733333H20.48c-10.24 0-17.066667-6.826667-17.066667-17.066666s6.826667-17.066667 17.066667-17.066667h44.373333c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666zM105.813333 529.066667H20.48c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667h85.333333c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066667z"
            fill=""
          />
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="font-bold text-[22px]">Agent Invited</span>
        <span className="text-[14px]">
          An email has been sent with an invitation to join your team.
        </span>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          color="grey"
          onClick={newAgent}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          New Agent
        </Button>
        <Button color="orange" onClick={done} variant="contained">
          Done
        </Button>
      </div>
    </div>
  );
};

const InviteError = (props) => {
  const { modal, setModal } = React.use(ModalContext);
  const tryAgain = () => {
    setModal(modal.prev);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <div>
        <svg
          className="w-[80px] h-[80px] fill-[#C4CDD5]"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M514.8544 126.20672c-211.7376 0-384 172.2624-384 384 0 211.74144 172.2624 384 384 384 211.74144 0 384-172.25856 384-384 0-211.7376-172.25856-384-384-384z m0 745.0752c-199.09632 0-361.07392-161.9776-361.07392-361.0752 0-199.09632 161.9776-361.07392 361.07392-361.07392 199.0976 0 361.0752 161.9776 361.0752 361.07392 0 199.0976-161.9776 361.0752-361.0752 361.0752z" />
          <path d="M389.3888 472.93568a11.424 11.424 0 0 0 8.10496 3.35872 11.42144 11.42144 0 0 0 8.10496-3.35872 11.45856 11.45856 0 0 0 0-16.20864l-34.88-34.88 34.88-34.88a11.45856 11.45856 0 0 0 0-16.20864c-4.47232-4.47872-11.73632-4.47872-16.20992 0l-34.88 34.88-34.88-34.88c-4.47232-4.47872-11.73632-4.47872-16.20864 0a11.45856 11.45856 0 0 0 0 16.20864l34.88 34.88-34.88 34.88a11.45856 11.45856 0 0 0 0 16.20864 11.424 11.424 0 0 0 8.10496 3.35872 11.42144 11.42144 0 0 0 8.10496-3.35872l34.88-34.88 34.87872 34.88zM726.28736 370.75712a11.456 11.456 0 0 0-16.20864 0l-34.88 34.88-34.88128-34.88a11.456 11.456 0 0 0-16.20864 0 11.45856 11.45856 0 0 0 0 16.20864l34.88128 34.88-34.88128 34.88a11.45856 11.45856 0 0 0 0 16.20864 11.42528 11.42528 0 0 0 8.10496 3.35872 11.42528 11.42528 0 0 0 8.10368-3.35872l34.88128-34.88 34.88 34.88a11.42528 11.42528 0 0 0 8.10496 3.35872 11.42528 11.42528 0 0 0 8.10368-3.35872 11.45856 11.45856 0 0 0 0-16.20864l-34.88-34.88 34.88-34.88a11.45856 11.45856 0 0 0 0-16.20864zM682.32832 651.55968l-39.8336 39.37536-56.98432-48.46464a11.46368 11.46368 0 0 0-14.96576 0.096l-55.75808 48.68224-55.57248-48.64384a11.47008 11.47008 0 0 0-15.09504-0.0064l-55.16672 48.23552-41.58336-41.00864a11.45344 11.45344 0 0 0-16.20864 0.11264 11.45856 11.45856 0 0 0 0.11136 16.20864l49.16096 48.4864a11.47264 11.47264 0 0 0 15.59296 0.46976l55.63136-48.64384 55.56736 48.63872a11.4624 11.4624 0 0 0 15.08992 0.01152l55.86432-48.77696 57.46944 48.87808a11.45984 11.45984 0 0 0 15.48672-0.576l47.31264-46.76224a11.47136 11.47136 0 0 0 0.09472-16.21504c-4.4544-4.50816-11.71456-4.54144-16.21376-0.09728z" />
        </svg>
      </div>
      <div className="flex flex-col ">
        <span className="font-bold text-[22px]">Invitation could't sent</span>
      </div>
      <div>
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

export const InviteAgent = (props) => {
  const {
    register,
    trigger,
    setError,
    getFieldState,
    formState: { errors },
  } = useForm();
  const [inviteDisabled, setInviteDisabled] = useState(true);
  const [emailValue, setEmail] = useState("");
  const [lastValidateEmail, setLastValidateEmail] = useState("");
  const { modal, setModal } = React.use(ModalContext);
  const [roleValue, setRoleValue] = useState(AGENT_ROLE_AGENT);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const onChangeRole = (value) => {
    setRoleValue(value);
  };
  const roles = [
    {
      value: AGENT_ROLE_SUPERADMIN,
      label: "Administrator",
    },
    {
      value: AGENT_ROLE_AGENT,
      label: "Agent",
    },
  ];
  const onChangeEmail = (value) => {
    setInviteDisabled(false);
    setEmail(value.trim());
  };

  const emailValidate = async () => {
    return new Promise(async (resolve, reject) => {
      if (lastValidateEmail != emailValue) {
        setLastValidateEmail(emailValue);
        const result = await trigger();
        if (!result || emailValue == "") {
          resolve(1);
          setInviteDisabled(true);
        } else {
          setInviteDisabled(false);
          const data = await apiFetch("/api/team/agent/invite/validate/email", {
            method: "POST",
            body: JSON.stringify({
              email: emailValue,
            }),
          });

          if (data?.ok) {
            if (data?.data?.taken) {
              setError("email", {
                type: "manual",
                message:
                  "The email address is already registered with your team",
              });
              setInviteDisabled(true);
              resolve(1);
            } else {
              resolve(1);
            }
          } else {
            setError("email", {
              type: "manual",
              message: data?.error,
            });
            setInviteDisabled(true);
            resolve(1);
          }
        }
      } else {
        resolve(1);
      }
    });
  };
  const onBlurEmail = async () => {
    await emailValidate();
  };

  const InviteAction = async () => {
    setLoading(true);

    await emailValidate();

    if (!getFieldState("email").error) {
      const data = await apiFetch("/api/team/agent/invite", {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          role: roleValue,
        }),
      });

      if (data?.ok) {
        dispatch({
          type: "SET_ALL_AGENTS",
          data: response.data.agents,
        });
        setLoading(false);
        setModal({
          open: true,
          size: "xs",
          close: false,
          footer: false,
          content: <InviteSuccess />,
        });
      }

      if (!data?.ok) {
        setModal({
          open: true,
          size: "xs",
          close: false,
          footer: false,
          content: <InviteError />,
        });
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-2">
      <invite-header className=" flex flex-row justify-between gap-6 items-center">
        <div className="basis-[70%]">
          <span className="text-[14px]">Email address</span>
        </div>
        <div className="basis-[30%]">
          <span className="text-[14px]">Role</span>
        </div>
      </invite-header>
      <invite-body className=" flex flex-row justify-between gap-6">
        <div className="basis-[70%]">
          <TextField
            {...emailValidation(register, {
              onChange: (e) => {
                onChangeEmail(e.target.value);
              },
              onBlur: async (e) => {
                if (e.relatedTarget.id != "invite-button") {
                  onBlurEmail().then(() => {});
                }
              },
              required: false,
            })}
            autoFocus
            name="email"
            value={emailValue}
            fullWidth
            placeholder="E.g. agent@example.com"
            size="small"
            error={Boolean(errors.email)}
            helperText={errors.email && errors.email.message}
          />
        </div>

        <div className="basis-[30%]">
          <SelectBox
            data={roles}
            selected={roleValue}
            onChange={onChangeRole}
          />
        </div>
      </invite-body>

      <invite-action className="flex flex-row justify-end  gap-6 mt-12">
        <div>
          <Button
            loading={loading}
            loadingPosition="start"
            id="invite-button"
            color="grey"
            disabled={inviteDisabled}
            onClick={InviteAction}
            variant="contained"
          >
            Send
          </Button>
        </div>
      </invite-action>
    </div>
  );
};
