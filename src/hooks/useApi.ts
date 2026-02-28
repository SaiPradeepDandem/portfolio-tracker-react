
import { useState, useEffect, useCallback } from 'react';
import { getPositions } from '../services/positionService';
import { type Position } from '../types/Position'

const useApi = (reloadPositions: boolean) => {
  const [data, setData] = useState<Position[] | undefined>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result: (Position[] | undefined) = await getPositions();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [reloadPositions]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
