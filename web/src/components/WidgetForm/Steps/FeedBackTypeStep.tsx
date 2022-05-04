import { FeedbackType, feedbackTypes } from "..";

interface FeedbackTypeStepProps {
  onFeedbackTypeOnChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeOnChanged,
}: FeedbackTypeStepProps) {
  return (
    <div className="flex py-8 gap-2 w-full">
      {Object.entries(feedbackTypes).map(([type, { title, image }]) => (
        <button
          key={type}
          className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
          onClick={() => onFeedbackTypeOnChanged(type as FeedbackType)}
          type="button"
        >
          <img src={image.source} alt={image.alt} />
          <span>{title}</span>
        </button>
      ))}
    </div>
  );
}
