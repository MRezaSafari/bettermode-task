import { useAddReaction, useRemoveReaction } from "@bettermode/queries";
import { cn } from "@bettermode/utilities";
import { IconArrowUp } from "@tabler/icons-react";
import { FC, MouseEvent, useState } from "react";
import Button from "../button";

interface Props {
  variant: "full" | "mini";
  hasReacted: boolean;
  totalReactions?: number;
  postId: string;
}

const ReactionButton: FC<Props> = ({
  postId,
  hasReacted,
  totalReactions,
  variant,
}) => {
  const [reacted, setReacted] = useState(hasReacted);
  const [totalReactionsCount, setTotalReactionsCount] = useState(
    totalReactions ?? 0
  );
  const { addReaction, loading: addLoading } = useAddReaction();
  const { removeReaction, loading: removeLoading } = useRemoveReaction();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (reacted) {
      removeReaction({
        variables: {
          postId,
          reaction: "upvote",
        },
        onCompleted: () => {
          setReacted(false);
          setTotalReactionsCount(totalReactionsCount - 1);
        },
      });
    } else {
      addReaction({
        variables: {
          postId,
          input: {
            reaction: "upvote",
            overrideSingleChoiceReactions: true,
          },
        },
        onCompleted: () => {
          setReacted(true);
          setTotalReactionsCount(totalReactionsCount + 1);
        },
      });
    }
  };

  if (variant === "mini") {
    return (
      <div
        onClick={handleClick}
        className={cn(
          "text-xs flex gap-1 items-center justify-center bg-green-900 border border-green-950 px-2 py-1 rounded-md",
          {
            "bg-amber-600": reacted,
            "animate-pulse cursor-not-allowed pointer-events-none opacity-40":
              addLoading || removeLoading,
          }
        )}
      >
        <IconArrowUp size={16} />
        <span>{totalReactionsCount}</span>
      </div>
    );
  }

  if (variant === "full") {
    return (
      <Button
        onClick={handleClick}
        className={cn("w-2/4 flex items-center gap-2", {
          "animate-pulse cursor-not-allowed pointer-events-none opacity-40":
            addLoading || removeLoading,
        })}
        size="sm"
        variant={reacted ? "info" : "success"}
      >
        <IconArrowUp size={20} />
        <span>UPVOTE</span>
      </Button>
    );
  }

  return <></>;
};

export default ReactionButton;
