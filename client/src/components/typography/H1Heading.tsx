import type { ReactNode } from "react";

function H1Heading({ children }: { children: ReactNode }) {
  return <h1 className="text-6xl font-bold mb-4">{children}</h1>;
}

export default H1Heading;
