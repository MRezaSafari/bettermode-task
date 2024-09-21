import { useMutation } from "@apollo/client";
import { IAddReactionVariables } from "@bettermode/models";
import ADD_REACTION_GQL from "../gql/add-reaction.graphql";

const useAddReaction = () => {
  const [addReaction, { loading, error }] = useMutation<
    unknown,
    IAddReactionVariables
  >(ADD_REACTION_GQL);

  return {
    addReaction,
    loading,
    error,
  };
};

export default useAddReaction;
