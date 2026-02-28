import { type Position } from '../types/Position'
import { logger } from '../utils/logger'

const baseUrl = "https://portfolio-tracker-server-r6bq.onrender.com/api/positions"

export const getPositions = async ():Promise<Position[]> => {
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
    } catch (error) {
        logger.error("Error adding position:", error);
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
    } catch (error) {
        logger.error("Error adding position:", error);
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
    } catch (error) {
        logger.error("Error deleting position:", error);
    }
}

function stringifyPosition(position: Position) {
    return JSON.stringify({
        ticker: position.ticker,
        quantity: position.quantity,
        buyPrice: position.buyPrice,
        currentPrice: position.currentPrice,
        exchange: position.exchange,
        currency: position.currency,
    });
}