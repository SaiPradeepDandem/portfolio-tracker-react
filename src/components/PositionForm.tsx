import './PositionForm.css'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { type Position } from './../types/Position'

const PositionForm = (props: {
    addPosition: (position: Position) => void
}) => {
    const [form, setForm] = useState({
        ticker: '',
        quantity: '',
        buyPrice: '',
        currentPrice: '',
        exchange: '',
        currency: '',
    })

    const onAddPosition = (event: FormEvent) => {
        event.preventDefault()
        // TODO: Add validations

        const position: Position = {
            id: 0,
            ticker: form.ticker,
            quantity: Number(form.quantity),
            buyPrice: Number(form.buyPrice),
            currentPrice: Number(form.currentPrice),
            exchange: form.exchange,
            currency: form.currency
        };
        console.log("New Position  : ", position)

        /* Reset the form. */
        setForm({
            ticker: '',
            quantity: '',
            buyPrice: '',
            currentPrice: '',
            exchange: '',
            currency: '',
        })

        props.addPosition(position)
    }

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        /* Extracting the attributes directly. */
        let {id, value} = event.target
        setForm(prev => ({ ...prev, [id]: value }))
        console.log("Form : ", form)
    }

    return <form className="form-grid-container" onSubmit={onAddPosition}>
        <label>Ticker:</label>
        <input type="text" id="ticker" name="ticker" onChange={inputChange} value={form.ticker}></input>

        <label>Quantity:</label>
        <input type="number" id="quantity" name="quantity" onChange={inputChange} value={form.quantity}></input>

        <label>Buy Price:</label>
        <input type="number" id="buyPrice" name="buyPrice" onChange={inputChange} value={form.buyPrice}></input>

        <label>Current Price:</label>
        <input type="number" id="currentPrice" name="currentPrice" onChange={inputChange} value={form.currentPrice}></input>

        <label>Exchange:</label>
        <input type="text" id="exchange" name="exchange" onChange={inputChange} value={form.exchange}></input>

        <label>Currency:</label>
        <input type="text" id="currency" name="currency" onChange={inputChange} value={form.currency}></input>

        <button type="submit">Add Position</button>
    </form>
}

export default PositionForm