"use client";

import * as React from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { Checkbox } from "@/components/UI/Atoms/Checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/Atoms/Form";
import { Input } from "@/components/UI/Atoms/Input";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Atoms/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Atoms/Select";
import { Textarea } from "@/components/UI/Atoms/Textarea";
import { cn } from "@/components/UI/Foundations/style";

/**
 * Props every field wrapper shares. `control` and `name` are the only two a
 * caller must always pass; everything else is the field's own concern.
 *
 * These exist because the same six-line `FormField > FormItem > FormControl`
 * ladder was repeated for every input in the app. The ladder — and the wiring
 * of label, description, error message and aria attributes — lives here once.
 */
export interface BaseFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  /** Visible label. Omit for placeholder-only designs. */
  label?: React.ReactNode;
  /** Helper text under the control, before any error. */
  description?: React.ReactNode;
  /** Per-field rules, including async `validate`. */
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  className?: string;
}

/** One option of a choice field. */
export interface FieldOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

const FieldShell = ({
  label,
  description,
  className,
  children,
}: {
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <FormItem className={className}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <FormControl>{children}</FormControl>
      {description ? <FormDescription>{description}</FormDescription> : null}
      <FormMessage />
    </FormItem>
  );
};

export interface FormFieldInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string;
  /** Native input type, e.g. "email", "tel", "date", "file". @default "text" */
  type?: React.ComponentProps<typeof Input>["type"];
  autoComplete?: string;
}

/** Single-line input, including date and file when given the matching `type`. */
export const FormFieldInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  description,
  className,
  placeholder,
  type = "text",
  autoComplete,
  disabled,
}: FormFieldInputProps<TFieldValues, TName>) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FieldShell label={label} description={description} className={className}>
        <Input
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          {...field}
        />
      </FieldShell>
    )}
  />
);

export interface FormFieldTextareaProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string;
  rows?: number;
}

export const FormFieldTextarea = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  description,
  className,
  placeholder,
  rows = 5,
  disabled,
}: FormFieldTextareaProps<TFieldValues, TName>) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FieldShell label={label} description={description} className={className}>
        <Textarea
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          {...field}
        />
      </FieldShell>
    )}
  />
);

export interface FormFieldSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string;
  options: FieldOption[];
}

export const FormFieldSelect = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  description,
  className,
  placeholder,
  options,
  disabled,
}: FormFieldSelectProps<TFieldValues, TName>) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem className={className}>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <Select
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
);

export interface FormFieldCheckboxProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {}

/** Single checkbox with the label beside it (consent, opt-in). */
export const FormFieldCheckbox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  description,
  className,
  disabled,
}: FormFieldCheckboxProps<TFieldValues, TName>) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem
        className={cn("flex flex-row items-start gap-3 space-y-0", className)}
      >
        <FormControl>
          <Checkbox
            className="mt-0.5"
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        </FormControl>
        <div className="space-y-1 leading-none">
          {label ? (
            <FormLabel variant="checkbox" className="cursor-pointer">
              {label}
            </FormLabel>
          ) : null}
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </div>
      </FormItem>
    )}
  />
);

export interface FormFieldRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  options: FieldOption[];
}

export const FormFieldRadioGroup = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  label,
  description,
  className,
  options,
  disabled,
}: FormFieldRadioGroupProps<TFieldValues, TName>) => (
  <FormField
    control={control}
    name={name}
    rules={rules}
    render={({ field }) => (
      <FormItem className={className}>
        {label ? <FormLabel>{label}</FormLabel> : null}
        <FormControl>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            {options.map((option) => (
              <FormLabel
                key={option.value}
                variant="checkbox"
                className="cursor-pointer"
              >
                <RadioGroupItem
                  value={option.value}
                  disabled={option.disabled}
                />
                {option.label}
              </FormLabel>
            ))}
          </RadioGroup>
        </FormControl>
        {description ? <FormDescription>{description}</FormDescription> : null}
        <FormMessage />
      </FormItem>
    )}
  />
);
