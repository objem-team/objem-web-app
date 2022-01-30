import { Actions } from "./Actions";
import { Context } from "./Context";
import { CurrentlyPlayingType } from "./CurrentlyPlayingType";
import { Device } from "./Device";
import { PlayableItem } from "./PlayableItem";
import { RepeatState } from "./RepeatState";

export type CurrentPlaybackContext = {
  device: Device;
  repeat_state: RepeatState;
  shuffle_state: boolean;
  context?: Context;
  timestamp: number;
  progress_ms?: number;
  is_playing: boolean;
  item?: PlayableItem;
  currently_playing_type: CurrentlyPlayingType;
  actions: Actions;
};
