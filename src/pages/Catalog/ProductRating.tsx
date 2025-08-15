import { Star } from "lucide-react";
import { useState } from "react";

interface ProductRatingProps {
  userId?: string;
  rating?: number;
  ratingCount: number;
  userRating: number;
  onRate?: (value: number, id: string) => void;
}

export const ProductRating = ({ userId = "", rating = 0, ratingCount, userRating, onRate }: ProductRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const hasRated = userRating > 0;
  const userHasId = userId.length > 0;

  const cantHoverStar = !hasRated && !userHasId;
  const canHoverit = !hasRated && userHasId;
  const userGotRated = hasRated && userHasId;

  let displayRating = hoverRating || (hasRated ? userRating : rating);

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    let starType: "full" | "half" | "empty" = "empty";

    if (displayRating >= starValue) {
      starType = "full";
    } else if (displayRating >= starValue - 0.5) {
      starType = "half";
    }

    // if rating === rounded
    if (starType === "full") {
      return (
        <Star
          key={i}
          className={`w-5 h-5 ${userGotRated || cantHoverStar ? "" : "cursor-pointer"}`}
          fill="#FFD700"
          stroke="#FFD700"
          onMouseEnter={() => canHoverit && setHoverRating(starValue)}
          onMouseLeave={() => canHoverit && setHoverRating(0)}
          onClick={() => canHoverit && onRate?.(starValue, userId)}
        />
      );
    }

    // if rating === fractional number
    if (starType === "half") {
      return (
        <div key={i} className={`relative w-5 h-5 ${userGotRated || cantHoverStar ? "" : "cursor-pointer"}`}>
          {/* border */}
          <Star className="absolute w-5 h-5" stroke="#FFD700" fill="none" />
          {/* half */}
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="w-5 h-5" stroke="#FFD700" fill="#FFD700" />
          </div>
        </div>
      );
    }

    // no rating on product
    return (
      <Star
        key={i}
        className={`w-5 h-5 ${userGotRated || cantHoverStar ? "" : "cursor-pointer"}`}
        fill="none"
        stroke="#FFD700"
        onMouseEnter={() => canHoverit && setHoverRating(starValue)}
        onMouseLeave={() => canHoverit && setHoverRating(0)}
        onClick={() => canHoverit && onRate?.(starValue, userId)}
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
