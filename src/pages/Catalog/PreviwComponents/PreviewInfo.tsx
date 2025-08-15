interface PreviewInfoProps {
  title: string;
  subObject?: Record<string, string | number | undefined>;
}

export const PreviewInfo = ({ title, subObject }: PreviewInfoProps) => {
  if (!subObject) return null;
  return (
    <div className="flex flex-col p-4">
      <h3 className="text-2xl mb-2">{title}</h3>
      <div className="flex flex-col space-y-1">
        {Object.entries(subObject).map(([key, value]) => (
          <span key={key} className=" rounded px-2  text-sm">
            <span className="flex justify-between text-[16px]">
              <span>{key}:</span> <span>{String(value)}г</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
