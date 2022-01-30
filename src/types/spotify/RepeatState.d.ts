const repeatStates = ["off", "context", "track"] as const;
export type RepeatState = typeof repeatStates[number];
