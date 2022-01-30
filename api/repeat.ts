import { RepeatState } from "../src/types/spotify/RepeatState";

export type Methods = {
  put: {
    reqFormat: FormData;
    reqBody: {
      repeatState?: RepeatState;
    };
    resBody: RepeatState;
  };
};
