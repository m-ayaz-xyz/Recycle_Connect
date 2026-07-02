export default function Stars({ rating, size = "sm" }) {
  const sizeClass = size === "sm" ? "text-sm" : "text-base";
  return (
    <span className={`${sizeClass} text-amber-400`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s}>
          {s <= Math.floor(rating) ? "★" : s - rating < 1 ? "½" : "☆"}
        </span>
      ))}
    </span>
  );
}
