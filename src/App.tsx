import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import PortfolioList from './components/portfolio/PortfolioList'
import { type Position } from './types/Position'

function App() {
  const [positions, setPositions] = useState<Position[]>([
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
  ]);
  console.log("Positions : ", positions)

  return (
    <div className="app-root">
      <Header />
      <div className="app-content">
        <PortfolioList rows={positions} />
      </div>
    </div>
  )
}

export default App
