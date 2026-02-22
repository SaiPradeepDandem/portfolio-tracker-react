import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import PortfolioList from './components/portfolio/PortfolioList'
import PositionForm from './components/PositionForm'
import { type Position } from './types/Position'

//let id_incr = 5;

function App() {
  const baseUrl = "https://portfolio-tracker-server-r6bq.onrender.com/api/positions"
  // const defaultPositions = [
  //   {
  //     id: 1,
  //     ticker: "WDS",
  //     quantity: 20,
  //     buyPrice: 26.01,
  //     currentPrice: 24.36,
  //     exchange: "ASX",
  //     currency: "AUD",
  //   },
  //   {
  //     id: 2,
  //     ticker: "TLS",
  //     quantity: 200,
  //     buyPrice: 1.04,
  //     currentPrice: 1.56,
  //     exchange: "ASX",
  //     currency: "AUD",
  //   },
  //   {
  //     id: 3,
  //     ticker: "VGA",
  //     quantity: 10,
  //     buyPrice: 226.55,
  //     currentPrice: 226.90,
  //     exchange: "ASX",
  //     currency: "AUD",
  //   },
  //   {
  //     id: 4,
  //     ticker: "NVO",
  //     quantity: 44,
  //     buyPrice: 85.01,
  //     currentPrice: 80.25,
  //     exchange: "NYSE",
  //     currency: "USD",
  //   }
  // ]

  const loadPositionsFromServer = async () => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data: Position[] = await response.json();
      setPositions(data);
    } catch (err) {
      console.error("Failed to load positions from API:", err);
    }
  };

  const [totalCurrentValue, setTotalCurrentValue] = useState(0)
  const [totalProfitLoss, setTotalProfitLoss] = useState(0)
  const totalStyle = totalProfitLoss < 0 ? 'loss' : 'profit';
  // const [positions, setPositions] = useState<Position[]>(() => {
  //   const lPositions = localStorage.getItem("positions");

  //   if (!lPositions) {
  //     localStorage.setItem("positions", JSON.stringify(defaultPositions));
  //     return defaultPositions;
  //   }

  //   const parsed = JSON.parse(lPositions);
  //   return parsed.length === 0 ? defaultPositions : parsed;
  // });
  const [positions, setPositions] = useState<Position[]>([])

  const [positionToEdit, setPositionToEdit] = useState<Position | null>(null);

  // const addPosition = (position: Position) => {
  //   position.id = id_incr++
  //   let newPositions = positions.concat(position)
  //   console.log("New Positions : ", position)
  //   setPositions(newPositions)
  // }

  const addPosition = async (position: Position) => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticker: position.ticker,
          quantity: position.quantity,
          buyPrice: position.buyPrice,
          currentPrice: position.currentPrice,
          exchange: position.exchange,
          currency: position.currency,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add position (${response.status})`);
      }

      loadPositionsFromServer();
    } catch (error) {
      console.error("Error adding position:", error);
    }
  }

  // const updatePosition = (position: Position) => {
  //   let updatedPositions = positions.map(p => {
  //     if (p.id === position.id) {
  //       return position
  //     } else {
  //       return p
  //     }
  //   })
  //   console.log("Updated Positions : ", updatedPositions)
  //   setPositions(updatedPositions)
  //   setPositionToEdit(null)
  // }

  const updatePosition = async (position: Position) => {
    try {
      const u = baseUrl+"/"+position.id
      const response = await fetch(u, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticker: position.ticker,
          quantity: position.quantity,
          buyPrice: position.buyPrice,
          currentPrice: position.currentPrice,
          exchange: position.exchange,
          currency: position.currency,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update position (${response.status})`);
      }

      loadPositionsFromServer();
    } catch (error) {
      console.error("Error adding position:", error);
    }
    setPositionToEdit(null)
  }

  const editPosition = (positionId: number) => {
    console.log("Edit position id : ", positionId)
    const position = positions.find(p => p.id === positionId) ?? null;
    console.log("Position to edit : ", position)
    setPositionToEdit(position)
  }

  // const removePosition = (positionId: number) => {
  //   console.log("Remove position id : ", positionId)
  //   const newPositions = positions.filter(p => p.id != positionId);
  //   setPositions(newPositions)
  // }

  const removePosition = async (positionId: number) => {
    console.log("Remove position id : ", positionId)
    try {
      const u = baseUrl+"/"+positionId
      const response = await fetch(u, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(`Failed to delete position (${response.status})`);
      }

      loadPositionsFromServer();
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  }

  const clearEdit = () => {
    console.log("Clearning the form...")
    setPositionToEdit(null)
  }

  const handleSort = (key: string, direction: string) => {
    console.log("Sort key " + key + ", direction :" + direction)
    const sortedPositions = [...positions].sort(sortByField(key, direction))
    setPositions(sortedPositions)
  }

  const totalOrLoss = (position: Position) => (position.currentPrice - position.buyPrice) * position.quantity

  const sortByField = (field: string, direction: string) => {
    return (p1: any, p2: any) => {
      let p1Value: any;
      let p2Value: any;
      if (field === 'profitOrLoss') {
        p1Value = totalOrLoss(p1);
        p2Value = totalOrLoss(p2);
      } else {
        p1Value = p1[field];
        p2Value = p2[field];
      }

      if (typeof p1Value === 'string' && typeof p2Value === 'string') {
        if (direction === 'asc') {
          return p1Value.localeCompare(p2Value);
        } else {
          return p2Value.localeCompare(p1Value);
        }
      }

      // Default to numeric or simple comparison if not strings
      if (direction === 'asc') {
        return p1Value > p2Value ? 1 : p1Value < p2Value ? -1 : 0;
      } else {
        return p2Value > p1Value ? 1 : p2Value < p1Value ? -1 : 0;
      }
    };
  }
  useEffect(() => {
    console.log("Use-effect of Positions : ", positions)
    //localStorage.setItem('positions', JSON.stringify(positions))

    const totalCV = positions.reduce((acc, p) => acc + (p.currentPrice * p.quantity), 0)
    setTotalCurrentValue(totalCV)

    const totalPL = positions.reduce((acc, p) => acc + ((p.currentPrice - p.buyPrice) * p.quantity), 0)
    setTotalProfitLoss(totalPL)

  }, [positions])

  useEffect(() => {
    loadPositionsFromServer();
  }, []);

  return (
    <div className="app-root">
      <Header />
      <div className="app-content">
        <PositionForm addPosition={addPosition} updatePosition={updatePosition} positionToEdit={positionToEdit} clearEdit={clearEdit} />
        <PortfolioList rows={positions} removePosition={removePosition} editPosition={editPosition} handleSort={handleSort} />
        <div className='totals-container'>
          <label>Total Current Value: </label><label>${totalCurrentValue.toFixed(2)}</label><br />
          <label>Total profit/loss: </label><label className={totalStyle}>${totalProfitLoss.toFixed(2)}</label>
        </div>
      </div>
    </div>
  )
}

export default App
