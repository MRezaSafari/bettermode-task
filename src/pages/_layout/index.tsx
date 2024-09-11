import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main>
      <aside>Hello sidebar!</aside>
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;
