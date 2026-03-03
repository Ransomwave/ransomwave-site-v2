import { Children, ReactNode } from "react";

type ImageGridItem = {
  src: string;
  alt: string;
};

export interface ImageGridProps {
  images?: ImageGridItem[];
  columns?: 1 | 2 | 3;
  children?: ReactNode;
}

export default function ImageGrid({
  images,
  columns = 2,
  children,
}: ImageGridProps) {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }[columns];

  const normalizedChildren = Children.toArray(children).filter(
    (child) => !(typeof child === "string" && child.trim() === ""),
  );

  if (normalizedChildren.length > 0) {
    return (
      <div className={`grid ${colClass} gap-4 my-4`}>
        {normalizedChildren.map((child, index) => (
          <div key={index} className="flex flex-col items-center">
            {child}
          </div>
        ))}
      </div>
    );
  }

  if (images && images.length > 0) {
    return (
      <div className={`grid ${colClass} gap-4 my-4`}>
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="flex flex-col items-center"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="rounded-md shadow-md w-auto h-auto max-w-full"
            />
            <p className="text-center text-sm text-gray-400 mt-2 italic">
              {image.alt}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (!children) {
    return null;
  }

  return <div className={`grid ${colClass} gap-4 my-4`}>{children}</div>;
}
