import React from 'react'
import ReactDOM from 'react-dom'
import Paper from '@material-ui/core/Paper'

// You can import Markdown files as React components,
// but they'll be missing their default styles.
import Readme from './README.md'

ReactDOM.render(
  <div>
    <p>Rendering the README file from within index.js:</p>
    <Paper style={{ margin: '1rem', overflow: 'hidden' }}>
      <Readme />
    </Paper>
  </div>,
  document.getElementById('root')
)