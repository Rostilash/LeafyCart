interface PreviewInfoProps {
  title: string;
  subObject?: Record<string, string | number | undefined>;
}

export const PreviewInfo = ({ title, subObject }: PreviewInfoProps) => {
  if (!subObject) return null;

  return (
    <div className="flex flex-col col-span-2 sm:col-span-1 w-full md:w-full md:p-2">
      <h3 className="text-2xl font-semibold mb-2 pl-4">{title}</h3>

      {Object.entries(subObject).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center px-4 ">
          <span className="font-medium">{key}:</span>
          <span>{typeof value === "string" ? value : `${Number(value)} г`}</span>
        </div>
      ))}
    </div>
  );
};
