const DataTable =`import React from 'react'
import { Table } from 'react-bootstrap'

export class OrderController extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      order: this.props.defaultOrder,
      ascending: true,
    }
  }
  
  toggleOrder = (key) => {
    if (this.state.order === key) {
      this.setState({
        ascending: !this.state.ascending
      })
    }
    else {
      this.setState({
        order: key,
        ascending: true,
      })
    }
  }
  
  render() {
    return this.props.children({
      ...this.state,
      toggleOrder: this.toggleOrder,
    })
  }
}

export class DataTable extends React.Component {
  render() {
    let { columns, rows, order, ascending, onToggleOrder } = this.props
  
    let sortedRows =
      order
        ? rows
            .slice(0)
            .sort((x, y) => String(x[order]).localeCompare(String(y[order])))
        : rows
    
    if (!ascending) {
      sortedRows.reverse()
    }
    
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            {columns.map(column =>
              <th
                key={column.key}
                onClick={() => onToggleOrder(column.key)}>
                {column.title}
                {
                  column.key === order &&
                  (ascending ? "▲" : "▼")
                }
              </th>  
            )}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) =>
            <tr key={i}>
              {columns.map(column =>
                 <td key={column.key}>{row[column.key]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}`

const perthBands = `export const methylEthylAlbums = [
  {
    "Album": "Oh Inhuman Spectacle",
    "Year": 2015
  },
  {
    "Album": "Everything Is Forgotten",
    "Year": 2017
  }
]

export const tameImpalaSingles = [
  {
    "Single": "Sundown Syndrome",
    "Year": 2009
  },
  {
    "Single": "Solitude Is Bliss",
    "Year": 2010
  },
  {
    "Single": "Lucidity",
    "Year": 2010
  },
  {
    "Single": "Expectation",
    "Year": 2010
  },
  {
    "Single": "Why Won't You Make Up Your Mind?",
    "Year": 2011
  },
  {
    "Single": "Elephant",
    "Year": 2012
  },
  {
    "Single": "Feels Like We Only Go Backwards",
    "Year": 2012
  },
  {
    "Single": "Mind Mischief",
    "Year": 2013
  },
  {
    "Single": "Let It Happen",
    "Year": 2015
  },
  {
    "Single": "'Cause I'm a Man",
    "Year": 2015
  },
  {
    "Single": "The Less I Know the Better",
    "Year": 2015
  }
]`

const styles =`body {
  padding: 15px;
}

th {
  cursor: pointer;
}`

const index = `<!DOCTYPE html>
<html>
  <head>
    <title>Untitled App</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="main.js"></script>
  </body>
</html>`

export const breadboardHelpers = {
  'DataTable.js': DataTable,
  'perthBands.js': perthBands,
  'styles.css': styles,
  'index.html': index,
}