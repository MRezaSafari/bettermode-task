import { Container } from "@bettermode/components";
import { IconExclamationCircle } from "@tabler/icons-react";
import colors from "tailwindcss/colors";

export const NotFound = () => {
  return (
    <Container className="flex justify-center items-center flex-col">
      <IconExclamationCircle size={100} color={colors.amber[500]} />
      <h1 className="text-5xl font-extrabold my-5 tracking-widest">
        Not Found
      </h1>
      <p>The page you are looking for was not found.</p>
    </Container>
  );
};
