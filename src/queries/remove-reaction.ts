import { useMutation } from "@apollo/client";
import { IRemoveReactionVariables } from "@bettermode/models";
import REMOVE_REACTION_GQL from "../gql/remove-reaction.graphql";

const useRemoveReaction = () => {
  const [removeReaction, { loading, error }] = useMutation<
    unknown,
    IRemoveReactionVariables
  >(REMOVE_REACTION_GQL);

  return {
    removeReaction,
    loading,
    error,
  };
};

export default useRemoveReaction;
