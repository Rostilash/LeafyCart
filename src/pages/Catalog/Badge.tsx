export const Badge = ({ position, text }: { position: string; text: string }) => (
  <span className={`absolute ${position} bg-red-400 min-w-15 py-1 px-4 rounded-xl text-white text-xs whitespace-nowrap`}>{text}</span>
);
