import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userState } from "../jotai/atom";

export const useHydratedUser = () => {
  const user = useAtomValue(userState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return { user, hydrated };
};
