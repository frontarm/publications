import React from 'react@next'
import ReactDOM from 'react-dom@next'
import App from './App'
// export default function App() {
//   let [count, setCount] = React.useState(1)

//   return (
//     <div className='center'>
//       <button onClick={() => {
//         setCount(count => count + 1)
//       }}>
//         <h1 style={{margin: 0}}>{"Hello, ".repeat(count)}React Hooks!</h1>
//       </button>
//     </div>
//   )
// }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)