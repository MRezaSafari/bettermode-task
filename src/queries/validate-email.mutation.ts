import { useMutation } from "@apollo/client";
import VALIDATE_EMAIL from "../gql/email-validation.graphql";

const useValidateEmail = (email: string, captchaToken: string) => {
  const [validate] = useMutation(VALIDATE_EMAIL, {
    variables: {
      input: {
        email,
        captchaToken,
      },
    },
  });
};

export default useValidateEmail;
