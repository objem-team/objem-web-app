export type Actions = {
  disallows: DisallowKey[];
};

type DisallowKey =
  | "InterruptingPlayback"
  | "Pausing"
  | "Resuming"
  | "Seeking"
  | "SkippingNext"
  | "SkippingPrev"
  | "TogglingRepeatContext"
  | "TogglingShuffle"
  | "TogglingRepeatTrack"
  | "TransferringPlayback";
