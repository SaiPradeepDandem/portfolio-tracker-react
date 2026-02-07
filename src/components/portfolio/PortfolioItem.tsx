import './PortfolioItem.css'
import { type Position } from '../../types/Position'
import { useState } from 'react'

const PortfolioItem = (props: {
    position: Position,
    removePosition: (positionId: string) => void
}) => {

    const position = props.position
    const [total] = useState((position.currentPrice - position.buyPrice) * position.quantity)
    const totalStyle = total < 0 ? 'loss' : 'profit';
    const onRemovePosition = (event: any) => {
        event.preventDefault()
        props.removePosition(position.id)
    }

    return (<tr>
        <td >{position.ticker}</td>
        <td >{position.quantity}</td>
        <td >${position.buyPrice}</td>
        <td >${position.currentPrice}</td>
        <td className={totalStyle}>${total.toFixed(2)}</td>
        <td >{position.exchange}</td>
        <td >{position.currency}</td>
        <td ><input type='button' value="D" onClick={onRemovePosition} /></td>
    </tr>)
}

export default PortfolioItem