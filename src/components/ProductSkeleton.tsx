import { Skeleton } from "@mui/material";

export const ProductSkeleton = () => {
  return (
    <article
      className="flex flex-col items-center justify-center 
        w-full sm:w-[48%] md:w-[30%] lg:w-[20%] 
        sm:min-w-[220px] sm:max-w-[220px] min-w-[120px] max-w-[200px]
        bg-[var(--leafy-sage)] shadow-xs rounded-2xl overflow-hidden"
    >
      {/* Skeleton for image */}
      <Skeleton variant="rectangular" width="100%" height={200} />

      <div className="w-full p-2 space-y-2">
        {/* Skeleton for title */}
        <Skeleton variant="text" width="80%" height={24} />
        {/* Skeleton for price */}
        <Skeleton variant="text" width="60%" height={20} />
        {/* Skeleton for weight */}
        <Skeleton variant="text" width="40%" height={18} />
        {/* Skeleton for button */}
        <Skeleton variant="rectangular" width="100%" height={26} />
      </div>
    </article>
  );
};
