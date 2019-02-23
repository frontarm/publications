import React from 'react'

export function StyledTable({ children }) {
  return (
    <table cellSpacing={0}>
      <thead>
        <tr>
          <th style={{ width: 70 }}>ID</th>
          <th style={{ width: 50 }}>Price</th>
          <th style={{ width: 50 }}>Yield</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export function StyledTableRow({ data, change }) {
  return (
    <tr className={change || ''}>
      <td>{data.id}</td>
      <td>
        {Number(Math.round(data.price+'e2')+'e-2').toFixed(2)}
      </td>
      <td>
        {Number(Math.round(data.yield+'e2')+'e-2').toFixed(2)}
      </td>
    </tr>
  )
}