import * as React from "react";

import {
  AlertProps,
  AlertTitleProps,
  alertVariants,
} from "@/components/UI/Atoms/Alert";
import styles from "@/components/UI/Atoms/Alert/Alert.module.scss";
import Typography from "@/components/UI/Typography";
import { cn } from "@/utils/style";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="h5"
      className={cn(styles.alertTitle, className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    className={cn(styles.alertDescription, className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export default Alert;
export { AlertDescription, AlertTitle };
