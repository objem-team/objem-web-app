import { RepeatState } from "./types/spotify/RepeatState";

const states: RepeatState[] = ["off", "context", "track"];

export function nextState(currentState: RepeatState): RepeatState {
  const index = states.findIndex((state) => state == currentState);
  if (index >= states.length - 1) return states[0];
  const newState: RepeatState = states[index + 1];
  return newState;
}
