import { Container } from "@bettermode/components";
import { useServerStore } from "@bettermode/stores";

export const AboutPage = () => {
  const u = useServerStore(state => state.token)
  return (
    <Container>
      <p>{u}</p>
      <div>This is the about Page</div>
    </Container>
  );
};
