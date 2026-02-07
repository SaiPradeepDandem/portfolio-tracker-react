import { useState, type ChangeEvent, type FormEvent } from 'react'
import { nanoid } from "nanoid"
import './App.css'
import Header from './components/Header'
import PortfolioList from './components/portfolio/PortfolioList'
import PositionForm from './components/PositionForm'
import { type Position } from './types/Position'

function App() {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: nanoid(7),
      ticker: "WDS",
      quantity: 20,
      buyPrice: 26.01,
      currentPrice: 24.36,
      exchange: "ASX",
      currency: "AUD",
    },
    {
      id: nanoid(7),
      ticker: "TLS",
      quantity: 200,
      buyPrice: 1.04,
      currentPrice: 1.56,
      exchange: "ASX",
      currency: "AUD",
    },
    {
      id: nanoid(7) ,
      ticker: "VGA",
      quantity: 10,
      buyPrice: 226.55,
      currentPrice: 226.90,
      exchange: "ASX",
      currency: "AUD",
    },
    {
      id: nanoid(7),
      ticker: "NVO",
      quantity: 44,
      buyPrice: 85.01,
      currentPrice: 80.25,
      exchange: "NYSE",
      currency: "USD",
    }
  ]);
  console.log("Initial Positions : ", positions)

  const addPosition = (position:Position) => {
    position.id = nanoid(7)
    var newPositions = positions.concat(position)
    console.log("New Positions : ", position)
    setPositions(newPositions)
  }  

  const removePosition = (positionId:string) =>{
    console.log("Remove position id : ", positionId)
    const newPositions = positions.filter(p => p.id != positionId);
    setPositions(newPositions)
  }

  return (
    <div className="app-root">
      <Header />
      <div className="app-content">
        <PositionForm addPosition={addPosition}/>
        <PortfolioList rows={positions} removePosition={removePosition}/>
      </div>
    </div>
  )
}

export default App
