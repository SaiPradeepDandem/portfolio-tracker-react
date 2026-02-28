import { useEffect, useState, useCallback } from "react";
import { type Position } from "../types/Position";
import * as api from "../services/positionService";
import { logger } from '../utils/logger'

export const usePositions = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPositions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.getPositions();
            setPositions(data);
            localStorage.setItem("positions", JSON.stringify(data));
        } catch (err) {
            logger.error(err);
            setError("Failed to load positions");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPositions();
    }, [loadPositions]);

    const add = async (position: Position) => {
        try {
            await api.addPosition(position);
        } catch (err) {
            logger.error(err);
            setError("Failed to add position : " + err);
        }
        await loadPositions();
    };

    const update = async (position: Position) => {
        try {
            await api.updatePosition(position);
        } catch (err) {
            logger.error(err);
            setError("Failed to update position : " + err);
        }
        await loadPositions();
    };

    const remove = async (id: number) => {
        try {
            await api.deletePosition(id);
        } catch (err) {
            logger.error(err);
            setError("Failed to delete position : " + err);
        }
        await loadPositions();
    };

    return {
        positions,
        loading,
        error,
        reload: loadPositions,
        addPosition: add,
        updatePosition: update,
        deletePosition: remove,
    };
};