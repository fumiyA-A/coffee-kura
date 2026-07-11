import { useCallback, useEffect, useState } from "react";
import type { Bean } from "../models/Bean";
import { getAllBeans } from "../db/repositories/beanRepository";

export function useBeans() {
  const [beans, setBeans] = useState<Bean[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setBeans(await getAllBeans());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { beans, loading, reload };
}
