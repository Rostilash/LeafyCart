import { Star } from "lucide-react";
import { useState } from "react";

interface ProductRatingProps {
  rating?: number;
  ratingCount: number;
  userRating: number;
  onRate?: (value: number) => void;
}

export const ProductRating = ({ rating = 0, ratingCount, userRating, onRate }: ProductRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const hasRated = userRating > 0;
  const displayRating = hoverRating || (hasRated ? userRating : rating);

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    let starType: "full" | "half" | "empty" = "empty";

    if (displayRating - 1 >= starValue) {
      starType = "full";
    } else if (displayRating >= starValue - 0.5) {
      starType = "half";
    }

    if (starType === "full") {
      return (
        <Star
          key={i}
          className={`w-5 h-5 ${hasRated ? "" : "cursor-pointer"}`}
          fill="#FFD700"
          stroke="#FFD700"
          onMouseEnter={() => !hasRated && setHoverRating(starValue)}
          onMouseLeave={() => !hasRated && setHoverRating(0)}
          onClick={() => !hasRated && onRate?.(starValue)}
        />
      );
    }

    if (starType === "half") {
      return (
        <div
          key={i}
          className={`relative w-5 h-5 ${hasRated ? "" : "cursor-pointer"}`}
          onMouseEnter={() => !hasRated && setHoverRating(starValue - 0.5)}
          onMouseLeave={() => !hasRated && setHoverRating(0)}
          onClick={() => !hasRated && onRate?.(starValue - 0.5)}
        >
          {/* border */}
          <Star className="absolute w-5 h-5" stroke="#FFD700" fill="none" />
          {/* half */}
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="w-5 h-5" stroke="#FFD700" fill="#FFD700" />
          </div>
        </div>
      );
    }

    return (
      <Star
        key={i}
        className={`w-5 h-5 ${hasRated ? "" : "cursor-pointer"}`}
        fill="none"
        stroke="#FFD700"
        onMouseEnter={() => !hasRated && setHoverRating(starValue)}
        onMouseLeave={() => !hasRated && setHoverRating(0)}
        onClick={() => !hasRated && onRate?.(starValue)}
      />
    );
  });

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">{stars}</div>
      {ratingCount !== undefined && <span className="text-sm text-gray-500">({ratingCount})</span>}
    </div>
  );
};
