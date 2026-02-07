import './PositionForm.css'
import { type ChangeEvent, type FormEvent } from 'react';

const PositionForm = () => {

    const addPosition = (event:FormEvent) =>{
    console.log("Event :: ", event);
    event.preventDefault()
    
  }

  const inputChange = (event: ChangeEvent<HTMLInputElement>) =>{
    console.log("Change Event :: ", event.target.value);
    
  }

    return <form className="form-grid-container" onSubmit={addPosition}>
            <label>Ticker:</label>
            <input type="text" id="ticker" name="ticker" onChange={inputChange}></input>
            
            <label>Quantity:</label>
            <input type="number" id="quantity" name="quantity" onChange={inputChange}></input>
            
            <label>Buy Price:</label>
            <input type="number" id="buyPrice" name="buyPrice" onChange={inputChange}></input>
            
            <label>Current Price:</label>
            <input type="number" id="currentPrice" name="currentPrice" onChange={inputChange}></input>
            
            <label>Exchange:</label>
            <input type="text" id="exchange" name="exchange" onChange={inputChange}></input>
            
            <label>Currency:</label>
            <input type="text" id="currency" name="currency" onChange={inputChange}></input>
            
            <button type="submit">Add Position</button>
          </form>
}

export default PositionForm