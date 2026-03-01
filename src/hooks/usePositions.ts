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
        } catch (err) {
            logger.error(err);
            if (err instanceof Error) {
                setError(`${err.message}`);
            }            
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
            if (err instanceof Error) {
                setError(`${err.message}`);
            } 
        }
        await loadPositions();
    };

    const update = async (position: Position) => {
        try {
            await api.updatePosition(position);
        } catch (err) {
            logger.error(err);
            if (err instanceof Error) {
                setError(`${err.message}`);
            } 
        }
        await loadPositions();
    };

    const remove = async (id: number) => {
        try {
            await api.deletePosition(id);
        } catch (err) {
            logger.error(err);
            if (err instanceof Error) {
                setError(`${err.message}`);
            } 
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