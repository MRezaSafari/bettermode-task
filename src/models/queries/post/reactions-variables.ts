interface IAddReactionVariables {
  postId: string;
  input: {
    reaction: string;
    overrideSingleChoiceReactions: boolean;
  };
}

interface IRemoveReactionVariables {
  postId: string;
  reaction: string;
}

export type { IAddReactionVariables, IRemoveReactionVariables };
