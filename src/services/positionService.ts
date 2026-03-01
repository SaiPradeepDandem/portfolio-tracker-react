import { type Position } from '../types/Position'
import { logger } from '../utils/logger'

const baseUrl = "https://portfolio-tracker-server-r6bq.onrender.com/api/positions"

export const getPositions = async (): Promise<Position[]> => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
};

export const addPosition = async (position: Position): Promise<void> => {
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyPosition(position),
        });

        if (!response.ok) {
            throw new Error(`Failed to add position (${response.status})`);
        }
    } catch (error: unknown) {
        logger.error("Error adding position:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to add position (${error.message})`);
        }

        throw new Error("Failed to add position (unknown error)");
    }
}

export const updatePosition = async (position: Position): Promise<void> => {
    try {
        const url = baseUrl + "/" + position.id
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: stringifyPosition(position),
        });

        if (!response.ok) {
            throw new Error(`Failed to update position (${response.status})`);
        }
    } catch (error: unknown) {
        logger.error("Error updating position:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to update position (${error.message})`);
        }

        throw new Error("Failed to update position (unknown error)");
    }
}

export const deletePosition = async (positionId: number): Promise<void> => {
    logger.info("Delete position id : ", positionId)
    try {
        const url = baseUrl + "/" + positionId
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Failed to delete position (${response.status})`);
        }
    } catch (error: unknown) {
        logger.error("Error deleting position:", error);

        if (error instanceof Error) {
            throw new Error(`Failed to delete position (${error.message})`);
        }

        throw new Error("Failed to delete position (unknown error)");
    }
}

function stringifyPosition(position: Position) {
    return JSON.stringify({
        ticker: position.ticker,
        quantity: position.quantity,
        buy_price: position.buy_price,
        current_price: position.current_price,
        exchange: position.exchange,
        currency: position.currency,
    });
}