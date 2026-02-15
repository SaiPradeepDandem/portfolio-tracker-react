import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import PortfolioList from './components/portfolio/PortfolioList'
import PositionForm from './components/PositionForm'
import { type Position } from './types/Position'

let id_incr = 5;

function App() {
  const defaultPositions = [
    {
      id: 1,
      ticker: "WDS",
      quantity: 20,
      buyPrice: 26.01,
      currentPrice: 24.36,
      exchange: "ASX",
      currency: "AUD",
    },
    {
      id: 2,
      ticker: "TLS",
      quantity: 200,
      buyPrice: 1.04,
      currentPrice: 1.56,
      exchange: "ASX",
      currency: "AUD",
    },
    {
      id: 3,
      ticker: "VGA",
      quantity: 10,
      buyPrice: 226.55,
      currentPrice: 226.90,
      exchange: "ASX",
      currency: "AUD",
    },
    {
      id: 4,
      ticker: "NVO",
      quantity: 44,
      buyPrice: 85.01,
      currentPrice: 80.25,
      exchange: "NYSE",
      currency: "USD",
    }
  ]

  const [totalCurrentValue, setTotalCurrentValue] = useState(0)
  const [totalProfitLoss, setTotalProfitLoss] = useState(0)
  const totalStyle = totalProfitLoss < 0 ? 'loss' : 'profit';
  const [positions, setPositions] = useState<Position[]>(() => {
    const lPositions = localStorage.getItem("positions");

    if (!lPositions) {
      localStorage.setItem("positions", JSON.stringify(defaultPositions));
      return defaultPositions;
    }

    const parsed = JSON.parse(lPositions);
    return parsed.length === 0 ? defaultPositions : parsed;
  });
  const [positionToEdit, setPositionToEdit] = useState<Position | null>(null);

  const addPosition = (position: Position) => {
    position.id = id_incr++
    let newPositions = positions.concat(position)
    console.log("New Positions : ", position)
    setPositions(newPositions)
  }

  const updatePosition = (position: Position) => {
    let updatedPositions = positions.map(p => {
      if(p.id === position.id){
        return position
      }else{
        return p
      }
    })
    console.log("Updated Positions : ", updatedPositions)
    setPositions(updatedPositions)
    setPositionToEdit(null)
  }

  const editPosition = (positionId: number) => {
    console.log("Edit position id : ", positionId)
    const position = positions.find(p => p.id === positionId) ?? null;
    console.log("Position to edit : ", position)
    setPositionToEdit(position)
  }

  const removePosition = (positionId: number) => {
    console.log("Remove position id : ", positionId)
    const newPositions = positions.filter(p => p.id != positionId);
    setPositions(newPositions)
  }

  const clearEdit = () => {
    console.log("Clearning the form...")
    setPositionToEdit(null)
  }

  useEffect(() => {
    console.log("Use-effect of Positions : ", positions)
    localStorage.setItem('positions', JSON.stringify(positions))

    const totalCV = positions.reduce((acc, p) => acc + p.currentPrice, 0)
    setTotalCurrentValue(totalCV)

    const totalPL = positions.reduce((acc, p) => acc + ((p.currentPrice - p.buyPrice) * p.quantity), 0)
    setTotalProfitLoss(totalPL)

  }, [positions])

  return (
    <div className="app-root">
      <Header />
      <div className="app-content">
        <PositionForm addPosition={addPosition} updatePosition={updatePosition} positionToEdit={positionToEdit} clearEdit={clearEdit}/>
        <PortfolioList rows={positions} removePosition={removePosition} editPosition={editPosition} />
        <div className='totals-container'>
          <label>Total Current Value: </label><label>${totalCurrentValue.toFixed(2)}</label><br />
          <label>Total profit/loss: </label><label className={totalStyle}>${totalProfitLoss.toFixed(2)}</label>
        </div>
      </div>
    </div>
  )
}

export default App
