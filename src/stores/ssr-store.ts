import { IServerStoreState } from "@bettermode/models";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useServerStore = create<IServerStoreState>()(devtools(() => ({})));

export default useServerStore;
