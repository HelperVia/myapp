"use client";

import { Email } from "@/components/forms/email";
import {
  TextField,
  InputNumber,
  RadioGroup,
  Select,
} from "@/components/ui/forms";

import Loading from "@/components/loading/loading";
import { AgentCard } from "@/components/teams";
import { ActionDialogContext } from "@/components/ui/actionDialog/context/context";
import { Section } from "@/components/ui/section";
import { selectAgentById } from "@/store/agent/agent.selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FullName } from "@/components/forms/fullname";
import { AgentType } from "@/types/team/agent";
import { apiFetch } from "@/lib/api/api.fetch";
import { updateAgent } from "@/store/agent/agent.slice";
import { NotifyContext } from "@/components/ui/notification/context/Context";
import {
  AGENT_AUTO_ASSIGN_DISABLE,
  AGENT_AUTO_ASSIGN_ENABLE,
  AGENT_AWAY_STATUS,
} from "@/constants/Agent";
import { useFormActionBar } from "@/components/ui/actionDialog";
export const AgentDetail = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const agent_id = params.id as string;
  const agent: AgentType | undefined = useAppSelector(
    selectAgentById(agent_id)
  );
  const [isChecking, setIsChecking] = useState(true);
  const { setNotify } = useContext(NotifyContext);

  const {
    open: isOpenAction,
    setAction,
    resetAction,
    updateAction,
  } = useContext(ActionDialogContext);

  const {
    reset,
    watch,
    register,
    trigger,
    formState,
    formState: { dirtyFields, errors },
    setValue,
    getValues,
    control,
  } = useForm<{
    agent_name: string;
    job_title: string;
    chat_limit: number;
    away: string;
    auto_assign: string;
  }>();
  const errorCount = Object.keys(formState.errors).length;

  const defaultActionConfig = {
    cancel: {
      label: "Discard ",
      onClick: () => discardChanges(),
    },
    save: {
      label: "Save Changes",
      onClick: () => saveChanges(),
    },
  };
  useFormActionBar({
    watch: watch,
    dirtyFields: formState.dirtyFields,
    isOpenAction: isOpenAction as boolean,
    setAction,
    resetAction,
    defaultActionConfig,
  });

  const saveChanges = async () => {
    updateAction({
      saveLoading: true,
    });

    const response = await apiFetch<{ agent: AgentType }>(
      "/api/team/agent/" + agent?.id + "/update",
      {
        method: "POST",
        body: JSON.stringify({
          agent_name: getValues("agent_name"),
          job_title: getValues("job_title"),
          chat_limit: getValues("chat_limit"),
          away: getValues("away"),
          auto_assign: getValues("auto_assign"),
        }),
      }
    );
    if (response?.ok) {
      dispatch(
        updateAgent({
          id: response?.data?.agent?.id,
          changes: response?.data?.agent,
        })
      );
      reset(response?.data?.agent);
      resetAction();
      setNotify({
        open: true,
        severity: "success",
        message: response?.message,
      });
    } else {
      setNotify({
        open: true,
        severity: "error",
        message: response?.error,
      });

      discardChanges();
    }
  };

  const discardChanges = () => {
    reset(agent);
    resetAction();
  };

  useEffect(() => {
    if (!isOpenAction) return;
    const hasErrors = Object.keys(errors).length > 0;

    updateAction({
      save: {
        disabled: hasErrors,
      },
    });
  }, [errorCount, isOpenAction]);

  useEffect(() => {
    if (!agent) {
      router.replace("/my/team/agents");
    } else {
      setIsChecking(false);

      reset(agent);
    }
  }, [agent, router]);

  if (isChecking || !agent) {
    return <Loading opacity={1} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Section className="mb-6">
          <AgentCard editable={true} size="md" agent={agent} away={true} />
        </Section>

        <Section className="mb-6" title="Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agent Name */}
            <div>
              <FullName
                register={register}
                trigger={trigger}
                onChange={(e): void => {
                  setValue("agent_name", e.target.value);
                }}
                value={getValues("agent_name")}
                name="agent_name"
                errors={errors}
                size="small"
                label="Agent Name"
              />
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Email
                  value={agent.email}
                  size="small"
                  label="Email"
                  disabled={true}
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <Controller
                name="job_title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={getValues("job_title")}
                    onChange={(val) => field.onChange(val.target.value)}
                    label="Job Title"
                    size="small"
                  />
                )}
              />
            </div>
          </div>
        </Section>

        {/* Chat Settings Section */}

        <Section className="mb-6" title="Chat Settings">
          {/* Chat Limit */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <Controller
                name="chat_limit"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    size="small"
                    label="Chat Limit"
                    min={1}
                    max={99}
                    onChange={(val: number) => field.onChange(val)}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="away"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    label="Chat Acceptance"
                    color="gray"
                    orientation="vertical"
                    size="small"
                    onChange={(val: string) => field.onChange(val)}
                    options={Object.entries(AGENT_AWAY_STATUS).map(
                      ([key, value]) => ({
                        label: value.label,
                        value: key,
                      })
                    )}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="auto_assign"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    label="Automatic Assignment"
                    color="gray"
                    orientation="vertical"
                    size="small"
                    onChange={(val: string) => field.onChange(val)}
                    options={[
                      {
                        label: "Assign Automaticall",
                        value: AGENT_AUTO_ASSIGN_ENABLE,
                      },
                      {
                        label: "Keep Pending",
                        value: AGENT_AUTO_ASSIGN_DISABLE,
                      },
                    ]}
                  />
                )}
              />
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
};
