import { ExternalUrls } from "./spotify";
import Type = module;

export type Context = {
  uri: string;
  href: string;
  external_urls: ExternalUrls;
  type: Type;
};
