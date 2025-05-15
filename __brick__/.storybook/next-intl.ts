import it from '../messages/it.json';
import en from '../messages/en.json';

const messagesByLocale: Record<string, any> = {it, en};

const nextIntl = {
  defaultLocale: 'it',
  messagesByLocale,
};

export default nextIntl;
