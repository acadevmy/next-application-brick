import { ErrorSectionProps } from "@/components/UI/Molecules/ErrorSection";
import Typography from "@/components/UI/Typography";

import styles from "./ErrorSection.module.scss";

const ErrorSection = ({ pretitle, title, Buttons }: ErrorSectionProps) => {
  return (
    <div className={styles.ErrorSection}>
      <div>
        <Typography>{pretitle.toUpperCase()}</Typography>
        <Typography variant="h2" className={styles.title}>
          {title}
        </Typography>

        {Buttons && <div className={styles.buttons}>{Buttons}</div>}
      </div>
    </div>
  );
};

export default ErrorSection;
