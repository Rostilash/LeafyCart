interface PreviewInfoProps {
  title: string;
  subObject?: Record<string, string | number | undefined>;
}

export const PreviewInfo = ({ title, subObject }: PreviewInfoProps) => {
  if (!subObject) return null;
  return (
    <div className="flex flex-col md:p-2">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <div className="flex flex-col space-y-2">
        {Object.entries(subObject).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center text-sm bg-[var(--leafy-sage)] px-3 py-2 rounded-lg shadow-sm">
            <span className="font-medium">{key}:</span>
            <span>{typeof value === "string" ? value : `${Number(value)} г`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
