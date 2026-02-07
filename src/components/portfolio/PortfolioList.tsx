import './PortfolioList.css'
import { type Position } from '../../types/Position'
import PortfolioItem from './PortfolioItem'

const PortfolioList = (props: {
    rows: Position[],
    removePosition: (positionId: string) => void
}) => {
    const rows = props.rows
    console.log("Rows ", rows)
    return (<table className='portfolio-table'>
        <thead>
            <tr>
                <th>Ticker</th>
                <th>Quantity</th>
                <th>Buy Price</th>
                <th>Current Price</th>
                <th>Profit/Loss</th>
                <th>Exchange</th>
                <th>Currency</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {rows.map(row => <PortfolioItem key={row.id} position={row} removePosition={props.removePosition} />)}
        </tbody>
    </table>)
}

export default PortfolioList