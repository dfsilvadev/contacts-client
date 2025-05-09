import type { PropsWithChildren } from "react";

const Badge = ({ children }: PropsWithChildren) => {
  return (
    <span className="rounded-xs bg-gray-800 p-1 text-xs font-bold text-violet-400 uppercase">
      {children}
    </span>
  );
};

export default Badge;
