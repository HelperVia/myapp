export interface ResponseClientTypes<T> {
  ok: boolean;
  data?: T | Record<string, never>;
  message?: string;
  error: string | null;
  status: number;
}
