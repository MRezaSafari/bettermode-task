import { useMutation } from "@apollo/client";
import VALIDATE_EMAIL from "../gql/email-validation.graphql";

const useValidateEmail = () => {
  const [validate] = useMutation(VALIDATE_EMAIL);

  return { validate };
};

export default useValidateEmail;
