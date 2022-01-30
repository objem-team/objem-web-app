import { ArtistsEntity } from "./ArtistsEntity";
import { ExternalUrls, ImagesEntity } from "./spotify";

export type Album = {
  album_type: string;
  artists: ArtistsEntity[];
  available_markets?: string[] | null;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: ImagesEntity[];
  name: string;
  release_date: string;
  release_date_precision: string;
};
