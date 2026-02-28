import './PortfolioItem.css'
import { type Position } from '../../types/Position'
import { useState } from 'react'

const PortfolioItem = (props: {
    position: Position,
    removePosition: (positionId: number) => void,
    editPosition: (positionId: number) => void
}) => {

    const position = props.position
    const [total] = useState((position.current_price - position.buy_price) * position.quantity)
    const totalStyle = total < 0 ? 'loss' : 'profit';
    const onRemovePosition = (event: any) => {
        event.preventDefault()
        props.removePosition(position.id)
    }

    const onEditPosition = (event: any) => {
        event.preventDefault()
        props.editPosition(position.id)
    }

    return (<tr>
        <td >{position.ticker}</td>
        <td >{position.quantity}</td>
        <td >${position.buy_price}</td>
        <td >${position.current_price}</td>
        <td className={totalStyle}>${total.toFixed(2)}</td>
        <td >{position.exchange}</td>
        <td >{position.currency}</td>
        <td ><input type='button' className='delete-btn' value="X" onClick={onRemovePosition} /></td>
        <td ><input type='button' className='edit-btn' value="E" onClick={onEditPosition} /></td>
    </tr>)
}

export default PortfolioItem