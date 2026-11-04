import type { Meta, StoryObj } from "@storybook/nextjs-vite";{{=<% %>=}}
import { useForm } from "react-hook-form";

import { Button } from "@/components/UI/Atoms/Button";
import { Form } from "@/components/UI/Atoms/Form";
import { FormRow } from "@/components/UI/Layout/FormRow";
import { Stack } from "@/components/UI/Layout/Stack";

import {
  FormFieldCheckbox,
  FormFieldInput,
  FormFieldRadioGroup,
  FormFieldSelect,
  FormFieldTextarea,
} from "./FormFields";
import { FormStatus } from "./FormStatus";

type Values = {
  name: string;
  email: string;
  country: string;
  plan: string;
  message: string;
  consent: boolean;
};

const meta: Meta = {
  title: "UI/Molecules/FormFields",
  parameters: {
    docs: {
      description: {
        component:
          "Field wrappers over react-hook-form. Each one owns the `FormField > FormItem > FormControl` ladder and the wiring of label, description, error message and aria attributes — the six lines that used to be repeated for every input in the app.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/** Every field type, wired to one form. */
export const AllFields: Story = {
  render: function AllFieldsStory() {
    const form = useForm<Values>({
      defaultValues: {
        name: "",
        email: "",
        country: "",
        plan: "monthly",
        message: "",
        consent: false,
      },
    });
    const { control } = form;

    return (
      <Form {...form}>
        <Stack asChild gap="md">
          <form onSubmit={form.handleSubmit(() => undefined)} noValidate>
            <FormRow>
              <FormFieldInput
                control={control}
                name="name"
                label="Name"
                placeholder="Your name"
                rules={{ required: "Name is required" }}
              />
              <FormFieldInput
                control={control}
                name="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                description="We only use it to reply."
              />
            </FormRow>
            <FormFieldSelect
              control={control}
              name="country"
              label="Country"
              placeholder="Pick one"
              options={[
                { value: "it", label: "Italy" },
                { value: "fr", label: "France" },
                { value: "es", label: "Spain" },
              ]}
            />
            <FormFieldRadioGroup
              control={control}
              name="plan"
              label="Billing"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
            />
            <FormFieldTextarea
              control={control}
              name="message"
              label="Message"
              placeholder="Tell us more"
            />
            <FormFieldCheckbox
              control={control}
              name="consent"
              label="I agree to the terms"
              rules={{ required: "Required" }}
            />
            <Button type="submit" size="lg" width="responsive">
              Submit
            </Button>
          </form>
        </Stack>
      </Form>
    );
  },
};

/** Errors: submit with the fields empty to see the messages appear. */
export const WithValidation: Story = {
  render: function ValidationStory() {
    const form = useForm<{ name: string }>({ defaultValues: { name: "" } });
    return (
      <Form {...form}>
        <Stack asChild gap="md">
          <form onSubmit={form.handleSubmit(() => undefined)} noValidate>
            <FormFieldInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="Leave me empty and submit"
              rules={{ required: "Name is required" }}
            />
            <Button type="submit" size="lg">
              Submit
            </Button>
          </form>
        </Stack>
      </Form>
    );
  },
};

/** The outcome block every form ends with, announced politely. */
export const Status: Story = {
  render: () => (
    <Stack gap="md">
      <FormStatus error="Something went wrong. Try again." />
      <FormStatus success="Thanks — we got your message." />
    </Stack>
  ),
};
