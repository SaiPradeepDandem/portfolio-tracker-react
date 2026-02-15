import './PositionForm.css'
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { type Position } from './../types/Position'

const PositionForm = (props: {
    addPosition: (position: Position) => void,
    updatePosition: (position: Position) => void,
    positionToEdit: (Position | null),
    clearEdit: () => void
}) => {
    const [buttonText, setButtonText] = useState(props.positionToEdit === null ? 'Add Position' : 'Update Position')
    const [form, setForm] = useState({
        ticker: '',
        quantity: '',
        buyPrice: '',
        currentPrice: '',
        exchange: '',
        currency: '',
    })

    const resetForm = () => {
        setForm({
            ticker: '',
            quantity: '',
            buyPrice: '',
            currentPrice: '',
            exchange: '',
            currency: '',
        })
    }
    const onAddPosition = (event: FormEvent) => {
        event.preventDefault()
        // TODO: Add validations

        const position: Position = {
            id: props.positionToEdit === null ? 0 : props.positionToEdit.id,
            ticker: form.ticker,
            quantity: Number(form.quantity),
            buyPrice: Number(form.buyPrice),
            currentPrice: Number(form.currentPrice),
            exchange: form.exchange,
            currency: form.currency
        };
        console.log("New or updated Position  : ", position)

        /* Reset the form. */
        resetForm()

        if (props.positionToEdit === null) {
            props.addPosition(position)
        } else {
            props.updatePosition(position)
        }
    }

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        /* Extracting the attributes directly. */
        let { id, value } = event.target
        setForm(prev => ({ ...prev, [id]: value }))
        console.log("Form : ", form)
    }

    const clearForm = (event: any) => {
        event.preventDefault()
        props.clearEdit();
    }

    useEffect(() => {
        console.log("Edit form : ", props.positionToEdit)
        if (props.positionToEdit === null) {
            /* Reset the form. */
            resetForm()
            setButtonText('Add Position')
        } else {
            setForm({
                ticker: props.positionToEdit.ticker,
                quantity: props.positionToEdit.quantity + "",
                buyPrice: props.positionToEdit.buyPrice + "",
                currentPrice: props.positionToEdit.currentPrice + "",
                exchange: props.positionToEdit.exchange,
                currency: props.positionToEdit.currency,
            })
            setButtonText('Update Position')
        }

    }, [props.positionToEdit])

    return <div className="form-wrapper">
        <form className="form-grid-container" onSubmit={onAddPosition}>
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

            <div className="button-row">
                <button type="submit">{buttonText}</button>
                {props.positionToEdit !== null && (
                    <button onClick={clearForm} className='cancel-btn'>Cancel</button>
                )}
            </div>
        </form>
    </div>
}

export default PositionForm