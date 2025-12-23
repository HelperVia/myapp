export type ErrorPayload = string | string[] | Record<string, string>;

export type ErrorEnvelope = {
  success: false;
  error: ErrorPayload;
  status: number;
};
