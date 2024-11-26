"use client";

import styles from "@/components/Button/Button.module.scss";
import { ButtonProps } from "@/components/UI/Button";

const Button = ({ ...props }: ButtonProps) => (
  <button className={styles.button} {...props} />
);

export default Button;
