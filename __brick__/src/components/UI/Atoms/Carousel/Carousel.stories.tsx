import type { Meta, StoryObj } from "@storybook/nextjs-vite";{{=<% %>=}}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./Carousel";

const slides = [
  { id: "slide-1", title: "Slide 1", tone: "bg-info" },
  { id: "slide-2", title: "Slide 2", tone: "bg-accent" },
  { id: "slide-3", title: "Slide 3", tone: "bg-success" },
  { id: "slide-4", title: "Slide 4", tone: "bg-warning" },
  { id: "slide-5", title: "Slide 5", tone: "bg-muted" },
  { id: "slide-6", title: "Slide 6", tone: "bg-secondary" },
];

const meta: Meta<typeof Carousel> = {
  title: "UI/Atoms/Carousel",
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          "Embla-based carousel atom aligned with shadcn patterns. It provides root/content/item primitives and reusable previous/next controls while allowing fully custom UI composition.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl px-12 py-8">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div
                className={`${slide.tone} flex h-48 items-center justify-center rounded-card`}
              >
                <span className="heading-5 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const CustomControls: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div
                className={`${slide.tone} flex h-40 items-center justify-center rounded-card`}
              >
                <span className="body-1 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex items-center justify-between">
          <CarouselPrevious className="static translate-y-0" variant="ghost" />
          <CarouselNext className="static translate-y-0" variant="ghost" />
        </div>
      </Carousel>
    </div>
  ),
};

export const DifferentItemWidths: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl px-12 py-8">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className={
                index % 3 === 0
                  ? "pl-4 basis-4/5 md:basis-3/5 lg:basis-2/5"
                  : index % 3 === 1
                    ? "pl-4 basis-3/4 md:basis-1/2 lg:basis-1/3"
                    : "pl-4 basis-2/3 md:basis-2/5 lg:basis-1/4"
              }
            >
              <div
                className={`${slide.tone} flex h-40 items-center justify-center rounded-card`}
              >
                <span className="body-1 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const DifferentItemHeights: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl px-12 py-8">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
              className="pl-4 basis-4/5 md:basis-1/2"
            >
              <div
                className={`${slide.tone} flex items-center justify-center rounded-card ${
                  index % 3 === 0 ? "h-28" : index % 3 === 1 ? "h-40" : "h-56"
                }`}
              >
                <span className="body-1 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const VerticalDifferentHeights: Story = {
  render: () => (
    <div className="mx-auto max-w-md px-16 py-8">
      <Carousel
        orientation="vertical"
        opts={{ align: "start", loop: true }}
        className="h-[520px]"
      >
        <CarouselContent className="-mt-4 h-[520px]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pt-4 basis-1/2">
              <div
                className={`${slide.tone} flex items-center justify-center rounded-card ${
                  index % 2 === 0 ? "h-36" : "h-56"
                }`}
              >
                <span className="body-1 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const FullWidthItems: Story = {
  render: () => (
    <div className="mx-auto max-w-3xl px-12 py-8">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-4 basis-full">
              <div
                className={`${slide.tone} flex h-48 items-center justify-center rounded-card`}
              >
                <span className="heading-5 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const ThreeVisibleItems: Story = {
  render: () => (
    <div className="mx-auto max-w-5xl px-12 py-8">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-4 basis-1/3">
              <div
                className={`${slide.tone} flex h-40 items-center justify-center rounded-card`}
              >
                <span className="body-1 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const FourVisibleItems: Story = {
  render: () => (
    <div className="mx-auto max-w-6xl px-12 py-8">
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-4 basis-1/4">
              <div
                className={`${slide.tone} flex h-40 items-center justify-center rounded-card`}
              >
                <span className="body-1 font-medium text-foreground">
                  {slide.title}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
