export const YES = "Y" as const;
export const NO = "N" as const;

export type YesNo = typeof YES | typeof NO;
