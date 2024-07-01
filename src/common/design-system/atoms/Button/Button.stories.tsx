import { Meta, StoryFn } from "@storybook/react";
import { StorySection } from "../../storybook/StorySection";
import { FavoriteIcon } from "../icons/icons-list/favorite";
import { Button } from "./Button";

export default {
  title: "Design System/Atoms/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button",
};

export const SizeVariants: StoryFn<typeof Button> = (args) => (
  <div className="space-y-8">
    <StorySection title="Large variant (lg)">
      <div className="flex gap-4">
        <Button {...args} className="w-full" size="lg" icon={FavoriteIcon}>
          Lorem labore enim
        </Button>
        <Button {...args} size="lg" icon={FavoriteIcon} />
        <Button {...args} size="lg" circle icon={FavoriteIcon} />
      </div>
    </StorySection>

    <StorySection title="Medium variant (md)">
      <div className="flex gap-4">
        <Button {...args} className="w-full" size="md" icon={FavoriteIcon}>
          Eiusmod laboris occaecat
        </Button>
        <Button {...args} size="md" icon={FavoriteIcon} />
        <Button {...args} size="md" circle icon={FavoriteIcon} />
      </div>
    </StorySection>

    <StorySection title="Small variant (sm)">
      <div className="flex gap-4">
        <Button {...args} className="w-full" size="sm" icon={FavoriteIcon}>
          Aliqua dolore aute
        </Button>
        <Button {...args} size="sm" icon={FavoriteIcon} />
        <Button {...args} size="sm" circle icon={FavoriteIcon} />
      </div>
    </StorySection>
  </div>
);

export const CircleVariant: StoryFn<typeof Button> = (args) => (
  <div className="space-y-8">
    <StorySection
      title="Circle on a wider button"
      description="A wider button will have it's corners completely rounded"
    >
      <Button {...args} circle />
    </StorySection>

    <StorySection
      title="Circle on a square button"
      description="While an icon button will be completely circular"
    >
      <Button {...args} className="w-fit" circle />
    </StorySection>
  </div>
);

export const ColorVariants: StoryFn<typeof Button> = (args) => (
  <StorySection title="Color variants">
    <Button {...args} color="blue">
      blue
    </Button>
    <Button {...args} color="green">
      green
    </Button>
    <Button {...args} color="red">
      red
    </Button>
    <Button {...args} color="yellow">
      yellow
    </Button>
  </StorySection>
);
