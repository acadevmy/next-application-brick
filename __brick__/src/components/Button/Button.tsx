"use client";

import { ButtonProps } from "@/components/Button";
import styles from "@/components/Button/Button.module.scss";

const Button = ({ className, ...props }: ButtonProps) => (
  <button className={styles.button} {...props} />
);

export default Button;
