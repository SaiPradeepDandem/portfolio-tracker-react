import './PositionForm.css'
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { type Position } from './../types/Position'
import { logger } from './../utils/logger'

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
        buy_price: '',
        current_price: '',
        exchange: '',
        currency: '',
    })

    const resetForm = () => {
        setForm({
            ticker: '',
            quantity: '',
            buy_price: '',
            current_price: '',
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
            buy_price: Number(form.buy_price),
            current_price: Number(form.current_price),
            exchange: form.exchange,
            currency: form.currency
        };
        logger.info("New or updated Position  : ", position)

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
        logger.info("Form : ", form)
    }

    const clearForm = (event: any) => {
        event.preventDefault()
        props.clearEdit();
    }

    useEffect(() => {
        logger.info("Edit form : ", props.positionToEdit)
        if (props.positionToEdit === null) {
            /* Reset the form. */
            resetForm()
            setButtonText('Add Position')
        } else {
            setForm({
                ticker: props.positionToEdit.ticker,
                quantity: props.positionToEdit.quantity + "",
                buy_price: props.positionToEdit.buy_price + "",
                current_price: props.positionToEdit.current_price + "",
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
            <input type="number" id="buy_price" name="buy_price" onChange={inputChange} value={form.buy_price}></input>

            <label>Current Price:</label>
            <input type="number" id="current_price" name="current_price" onChange={inputChange} value={form.current_price}></input>

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