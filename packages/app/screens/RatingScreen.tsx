import { RatingBottomSheet } from "app/components/RatingBottomSheet";

export const RatingScreen = () => {
  return (
    <RatingBottomSheet
      title="Feedback"
      subtitle="Leave us feedback to let us know how we're doing."
      onSubmit={(r, v) => console.log(r, v)}
    />
  );
};
