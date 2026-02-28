import './PortfolioList.css'
import { type Position } from '../../types/Position'
import PortfolioItem from './PortfolioItem'
import { logger } from '../../utils/logger'

type SortDirection = 'asc' | 'desc';
let direction: SortDirection = 'asc'
let sortKey = ''
let sortTH = ''

const PortfolioList = (props: {
    rows: Position[],
    removePosition: (positionId: number) => void,
    editPosition: (positionId: number) => void,
    handleSort: (key: string, direction: string) => void
    loading: boolean
}) => {
    const rows = props.rows
    logger.info("Rows ", rows)

    const doSort = (key: string, thId: string) => {
        if (sortKey === key) {
            direction = direction === 'asc' ? 'desc' : 'asc'
        }
        if (sortTH !== '') {
            let elem = document.getElementById(sortTH);
            if (elem !== null) {
                elem.classList.remove("asc")
                elem.classList.remove("desc")
            }
        }
        sortKey = key

        let elem = document.getElementById(thId);
        if (elem !== null) {
            elem.classList.add(direction)
        }
        sortTH = thId;

        props.handleSort(key, direction)
    }
    return (<div className="table-wrapper">
        {props.loading && (
            <div className="table-mask">
                <div className="loader">Loading positions…</div>
            </div>
        )}
        <table className='portfolio-table'>
            <thead>
                <tr>
                    <th id="tickerTH" onClick={() => doSort('ticker', 'tickerTH')}>Ticker</th>
                    <th id="quantityTH" onClick={() => doSort('quantity', 'quantityTH')}>Quantity</th>
                    <th id="buy_priceTH" onClick={() => doSort('buy_price', 'buy_priceTH')}>Buy Price</th>
                    <th id="current_priceTH" onClick={() => doSort('current_price', 'current_priceTH')}>Current Price</th>
                    <th id="profitOrLossTH" onClick={() => doSort('profitOrLoss', 'profitOrLossTH')}>Profit/Loss</th>
                    <th id="exchangeTH" onClick={() => doSort('exchange', 'exchangeTH')}>Exchange</th>
                    <th id="currencyTH" onClick={() => doSort('currency', 'currencyTH')}>Currency</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => <PortfolioItem key={row.id} position={row} removePosition={props.removePosition} editPosition={props.editPosition} />)}
            </tbody>
        </table>
    </div>)
}

export default PortfolioList