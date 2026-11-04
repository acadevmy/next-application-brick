import { decode } from "he";

/** Google shows about this many characters of a meta description. */
const META_DESCRIPTION_LENGTH = 160;

/**
 * Plain text for `<meta name="description">`: decodes HTML entities, strips
 * tags (a CMS may send rich text) and cuts at the length search engines show.
 */
export const createMetaDescription = (description: string) =>
  decode(description)
    .replace(/<[^>]+>/g, "")
    .substring(0, META_DESCRIPTION_LENGTH);
