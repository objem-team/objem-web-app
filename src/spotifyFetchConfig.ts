import { FetchConfig } from "@aspida/fetch";

const fetchConfig: FetchConfig = {
  baseURL: process.env.NEXT_PUBLIC_WORKER_URL,
  credentials: "include",
  throwHttpErrors: true,
  headers: { objem: "spotify-widget" },
  mode: "cors",
};
export { fetchConfig };
