import { useEffect, useState, useCallback } from "react";
import { type Position } from "../types/Position";
import * as api from "../services/positionService";

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
            console.error(err);
            setError("Failed to load positions");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPositions();
    }, [loadPositions]);

    const add = async (position: Position) => {
        await api.addPosition(position);
        await loadPositions();
    };

    const update = async (position: Position) => {
        await api.updatePosition(position);
        await loadPositions();
    };

    const remove = async (id: number) => {
        await api.deletePosition(id);
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