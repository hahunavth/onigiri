import { RatingBottomSheet } from "app/components/RatingBottomSheet";

export const ComicRatingScreen = () => {
  return (
    <RatingBottomSheet
      title="Rating"
      subtitle="Rating comic"
      onSubmit={(r, v) => console.log(r, v)}
    />
  );
};
