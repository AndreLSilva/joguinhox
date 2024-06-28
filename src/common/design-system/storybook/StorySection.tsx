import { ReactNode } from "react";

interface StorySectionProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export function StorySection({ title, description, children }: StorySectionProps) {
  return (
    <div className="space-y-4">
      <div>
        {title && <h2 className="text-title-small">{title}</h2>}
        {description && <p className="text-body">{description}</p>}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}
