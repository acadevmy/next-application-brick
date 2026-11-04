import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/UI/Atoms/Button";
import { Grid } from "@/components/UI/Layout/Grid";
import { Surface } from "@/components/UI/Layout/Surface";
import { SectionHeading } from "@/components/UI/Molecules/SectionHeading";

import { ContentSection } from "./ContentSection";

const meta: Meta<typeof ContentSection> = {
  title: "UI/Sections/ContentSection",
  component: ContentSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A band of the page: a heading, then whatever the section is about. `width` caps it to a reading measure for sections that are a column of text.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const heading = (
  <SectionHeading
    pretitle="Pretitle"
    title="A title that opens the section"
    actions={<Button size="lg">Primary action</Button>}
  >
    The supporting copy sits under the title.
  </SectionHeading>
);

/** Same structure, first content: a grid of panels. */
export const WithAGrid: Story = {
  args: {
    heading,
    children: (
      <Grid columns={2} gap="md">
        {Array.from({ length: 4 }, (_, i) => (
          <Surface key={i} tone="muted" radius="card" padding="md">
            Panel {i + 1}
          </Surface>
        ))}
      </Grid>
    ),
  },
};

/** Same structure, second content: a single interactive panel. */
export const WithAForm: Story = {
  args: {
    heading,
    width: "default",
    children: (
      <Surface tone="muted" radius="card" padding="md">
        Any content the section is about goes here.
      </Surface>
    ),
  },
};

export const HeadingOnly: Story = {
  args: { heading, width: "narrow" },
};

export const Centered: Story = {
  args: {
    width: "narrow",
    align: "center",
    heading: (
      <SectionHeading align="center" title="A centred column of text">
        With `width` set, the measure caps the column and `align` centres the
        text inside it.
      </SectionHeading>
    ),
  },
};
