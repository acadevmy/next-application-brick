import en from "../messages/en.json";
import it from "../messages/it.json";

const messagesByLocale: Record<string, any> = { it, en };

const nextIntl = {
  defaultLocale: "it",
  messagesByLocale,
};

export default nextIntl;
