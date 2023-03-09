import React from 'react'
import {createRoot} from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'
import { addGood, addOk, addBad, resetCounters } from './counterActions'

const store = createStore(reducer)

const App = () => {
  const handleAddGood = () => {
    store.dispatch(addGood())
  }

  const handleAddOk = () => {
    store.dispatch(addOk())
  }

  const handleAddBad = () => {
    store.dispatch(addBad())
  }

  const handleReset = () => {
    store.dispatch(resetCounters())
  }
  return (
    <div>
      
      <p>Good: {store.getState().good}</p>
      <p>Ok: {store.getState().ok}</p>
      <p>Bad: {store.getState().bad}</p>
      <button onClick={handleAddGood}>Good</button>
      <button onClick={handleAddOk}>Ok</button>
      <button onClick={handleAddBad}>Bad</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

const renderApp = () => {
  createRoot(document.getElementById('root')).render(<App />);
}

renderApp();
store.subscribe(renderApp);