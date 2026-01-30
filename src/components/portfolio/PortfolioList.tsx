import './PortfolioList.css'
import { type Position } from '../../types/Position'
import PortfolioItem from './PortfolioItem'

const PortfolioList = ({ rows }: { rows: Position[] }) => {
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
            </tr>
        </thead>
        <tbody>
        {rows.map(row => <PortfolioItem key={row.id} position={row} />)}
        </tbody>
    </table>)
}

export default PortfolioList