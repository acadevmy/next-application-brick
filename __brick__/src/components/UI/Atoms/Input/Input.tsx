import * as React from "react";

import { InputProps, inputVariants } from "@/components/UI/Atoms/Input";
import styles from "@/components/UI/Atoms/Input/Input.module.scss";
import Label from "@/components/UI/Atoms/Label";
import { cn } from "@/utils/style";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, Icon, withSelect = false, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        {label && (
          <Label className="mb-2" htmlFor={props.id}>
            {label}
          </Label>
        )}
        <div className={styles.inputWrapper}>
          <input
            type={type}
            className={cn(className, inputVariants(), {
              [styles.withIcon]: !!Icon,
              [styles.inputWithSelect]: withSelect,
            })}
            ref={ref}
            {...props}
          />
          {Icon && <div className={styles.iconContainer}>{Icon}</div>}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
