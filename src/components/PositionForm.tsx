import './PositionForm.css'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { type Position } from './../types/Position'

const PositionForm = () => {

    const [ticker, setTicker] = useState('')
    const [quantity, setQuantity] = useState('')
    const [buyPrice, setBuyPrice] = useState('')
    const [currentPrice, setCurrentPrice] = useState('')
    const [exchange, setExchange] = useState('')
    const [currency, setCurrency] = useState('')


    const addPosition = (event: FormEvent) => {
        event.preventDefault()
        // TODO: Add validations

        const position: Position = {
            id: 0,
            ticker,
            quantity: Number(quantity),
            buyPrice: Number(buyPrice),
            currentPrice: Number(currentPrice),
            exchange,
            currency,
        };
         console.log("Add Position1  : ", position)

         /* Reset the form. */
         setTicker('')
         setQuantity('')
         setBuyPrice('')
         setCurrentPrice('')
         setExchange('')
         setCurrency('')
    }

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        let id = event.target.id;
        if (id == 'ticker') {
            setTicker(value)
        } else if (id == 'quantity') {
            setQuantity(value)
        } else if (id == 'buyPrice') {
            setBuyPrice(value)
        } else if (id == 'currentPrice') {
            setCurrentPrice(value)
        } else if (id == 'exchange') {
            setExchange(value)
        } else {
            setCurrency(value)
        }
    }

    return <form className="form-grid-container" onSubmit={addPosition}>
        <label>Ticker:</label>
        <input type="text" id="ticker" name="ticker" onChange={inputChange} value={ticker}></input>

        <label>Quantity:</label>
        <input type="number" id="quantity" name="quantity" onChange={inputChange} value={quantity}></input>

        <label>Buy Price:</label>
        <input type="number" id="buyPrice" name="buyPrice" onChange={inputChange} value={buyPrice}></input>

        <label>Current Price:</label>
        <input type="number" id="currentPrice" name="currentPrice" onChange={inputChange} value={currentPrice}></input>

        <label>Exchange:</label>
        <input type="text" id="exchange" name="exchange" onChange={inputChange} value={exchange}></input>

        <label>Currency:</label>
        <input type="text" id="currency" name="currency" onChange={inputChange} value={currency}></input>

        <button type="submit">Add Position</button>
    </form>
}

export default PositionForm