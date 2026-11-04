export type ErrorPageProps = {
  error: Error & { digest?: string };
  /** Re-fetches and re-renders the failed segment (`error.tsx` `retry`). */
  retry: () => void;
};
