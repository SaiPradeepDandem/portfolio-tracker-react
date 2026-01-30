import './PortfolioItem.css'
import { type Position } from '../../types/Position'
import { useState } from 'react'

const PortfolioItem = ({ position }: { position: Position }) => {
    console.log("Item : ", position)
    const [total] = useState((position.currentPrice - position.buyPrice) * position.quantity)
    const totalStyle = total<0? 'loss' : 'profit';
    return (<tr>
        <td >{position.ticker}</td>
        <td >{position.quantity}</td>
        <td >${position.buyPrice}</td>
        <td >${position.currentPrice}</td>
        <td className={totalStyle}>${total.toFixed(2)}</td>
        <td >{position.exchange}</td>
        <td >{position.currency}</td>
    </tr>)
}

export default PortfolioItem