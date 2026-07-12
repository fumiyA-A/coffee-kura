import { useCallback, useEffect, useState } from "react";

export function useData<T>(loader: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setData(await loader());
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    let active = true;
    loader().then((value) => {
      if (!active) return;
      setData(value);
      setLoading(false);
    });
    return () => { active = false; };
  }, [loader]);

  return { data, loading, reload };
}
