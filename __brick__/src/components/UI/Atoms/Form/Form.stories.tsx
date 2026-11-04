"use client";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";

import { Button } from "@/components/UI/Atoms/Button";
import { Input } from "@/components/UI/Atoms/Input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./Form";

const meta: Meta<typeof Form> = {
  title: "UI/Atoms/Form",
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          "Wrapper per react-hook-form: Form (FormProvider), FormField, FormItem, FormLabel, FormControl, FormMessage. Usato nei form DynamicForm/FormBuilder.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoForm = () => {
  const form = useForm({
    defaultValues: { email: "", name: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="flex flex-col gap-4 max-w-sm"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Mario Rossi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@esempio.it" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Invia</Button>
      </form>
    </Form>
  );
};

export const Default: Story = {
  render: () => <DemoForm />,
};

export const WithError: Story = {
  render: function WithErrorStory() {
    const form = useForm({
      defaultValues: { email: "" },
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            () => {},
            () => {
              form.setError("email", {
                type: "manual",
                message: "Inserisci un indirizzo email valido",
              });
            },
          )}
          className="flex flex-col gap-4 max-w-sm"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@esempio.it"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Invia (mostra errore se vuoto)</Button>
        </form>
      </Form>
    );
  },
};
