import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import PortfolioList from './components/portfolio/PortfolioList'
import PositionForm from './components/PositionForm'
import { type Position } from './types/Position'
import { usePositions } from './hooks/usePositions'
import { logger } from './utils/logger'
let sortKey: string
let sortDirection: string;


function App() {
  const {
    positions,
    loading,
    error,
    addPosition,
    updatePosition,
    deletePosition,
  } = usePositions();

  const [totalCurrentValue, setTotalCurrentValue] = useState(0)
  const [totalProfitLoss, setTotalProfitLoss] = useState(0)
  const totalStyle = totalProfitLoss < 0 ? 'loss' : 'profit';
  const [positionToEdit, setPositionToEdit] = useState<Position | null>(null);
  const [localPositions, setLocalPositions] = useState<Position[]>([]);

  const editPosition = (positionId: number) => {
    logger.info("Edit position id : ", positionId)
    const position = positions.find(p => p.id === positionId) ?? null;
    logger.info("Position to edit : ", position)
    setPositionToEdit(position)
  }

  const clearEdit = () => {
    logger.info("Clearning the form...")
    setPositionToEdit(null)
  }

  const handleSort = (key: string, direction: string) => {
    logger.info("Sort key " + key + ", direction :" + direction)
    sortKey = key
    sortDirection = direction
    updateLocalPositions()
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

  const updateLocalPositions = () => {
    let sortedPositions = [...positions]
    if (sortKey) {
      sortedPositions = sortedPositions.sort(sortByField(sortKey, sortDirection))
    }
    setLocalPositions(sortedPositions)
  }

  useEffect(() => {
    updateLocalPositions()

    const totalCV = positions.reduce((acc, p) => acc + (p.currentPrice * p.quantity), 0)
    setTotalCurrentValue(totalCV)

    const totalPL = positions.reduce((acc, p) => acc + ((p.currentPrice - p.buyPrice) * p.quantity), 0)
    setTotalProfitLoss(totalPL)
  }, [positions])

  return (
    <div className="app-root">
      <Header />
      <div className="app-content">
        <PositionForm addPosition={addPosition} updatePosition={updatePosition} positionToEdit={positionToEdit} clearEdit={clearEdit} />
        {error && (
          <div className="error-div">
            <div>{error}</div>
          </div>
        )}
        <PortfolioList rows={localPositions} removePosition={deletePosition} editPosition={editPosition} handleSort={handleSort} loading={loading} />
        <div className='totals-container'>
          <label>Total Current Value: </label><label>${totalCurrentValue.toFixed(2)}</label><br />
          <label>Total profit/loss: </label><label className={totalStyle}>${totalProfitLoss.toFixed(2)}</label>
        </div>
      </div>
    </div>
  )
}

export default App
