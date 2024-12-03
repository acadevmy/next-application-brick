import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils/style";

import styles from "./Spinner.module.scss";

type LoaderProps = Partial<{
  fullscreen?: boolean;
  size: "sm" | "regular";
}>;

const Spinner = ({ fullscreen = false, size = "regular" }: LoaderProps) => {
  const spinnerStyles = cn([styles.spinner, styles[size]], {
    [styles.fullscreen]: fullscreen,
  });

  return (
    <div className={spinnerStyles}>
      <LoaderCircle className={styles.spinnerIcon} />
    </div>
  );
};

export default Spinner;
