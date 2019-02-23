import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { StyledTable } from './styled'
import TableRow from './TableRow'

export let DataContext = React.createContext()

function updateData(data, id, price) {
  data = { ...data }
  data[id] = {
    id,
    price,
    yield: price > 0 ? (5 / price * 100) : 0,
  }
  return data
}

function makePrice(price) {
  let multiplier = Math.min(1.25, Math.pow(72/price, 4))
  return Math.max(0,
    price +
    multiplier*(
      Math.random() -
      (price-49)/100 +
      (price > 95
        ? 0.01
        : -Math.pow(multiplier, 3)
      ) +
      (price > 0 && Math.random() > price/101 ? (Math.random()-0.5) * 10 : 0)
    )
  )
}

function initializeData() {
  let ids = new Array(10)
    .fill()
    .map(() => Math.random().toString(36).substring(7))
  let data = ids.reduce(
    (data, id) => updateData(data, id, 83 + Math.random() * 18),
    {}
  )
  return data
}

function App() {
  let [data, setData] = useState(initializeData)
  let ids = Object.keys(data)
  let updateIn = Math.random() * 2000
  
  setTimeout(() => {
    let len = ids.length
    let id = ids[Math.min(Math.floor(Math.random() * len), len-1)]
    setData(updateData(data, id, makePrice(data[id].price)))
  }, updateIn)

  return (
    <DataContext.Provider value={data}>
      <StyledTable>
        {ids.map(id =>
          <TableRow key={id} id={id} />
        )}
      </StyledTable>
    </DataContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)