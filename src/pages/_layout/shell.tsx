import { IServerStoreInitialState } from "@bettermode/models";
import { useServerStore } from "@bettermode/stores";
import { useEffect } from "react";

interface PageShellProps {
  initialState: IServerStoreInitialState;
  children: React.ReactNode;
}

export function PageShell({ initialState, children }: PageShellProps) {
  const hydrateStore = useServerStore((state) => state.init);

  useEffect(() => {
    if (initialState) {
      hydrateStore(initialState);
    }
  }, [initialState, hydrateStore]);

  return <>{children}</>;
}
