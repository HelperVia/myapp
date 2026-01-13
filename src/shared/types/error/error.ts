export type ErrorPayload = string | string[] | Record<string, string>;

export type ErrorEnvelope = {
  success: false;
  debug: string | undefined;
  error: ErrorPayload;
  status: number;
};
