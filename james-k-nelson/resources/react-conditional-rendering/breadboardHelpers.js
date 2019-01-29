const style = `* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: Lato, sans-serif;
}
.sidebar {
  background-color: #f8fdff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  width: 30%;
  height: 100%;
  padding: 0.5rem;
  margin: 0;
  list-style: none;
  font-size: 0.8rem;
}
li {
  margin: 1rem 0;
}
.content {
  padding: 1rem;
}
header, .banner {
  background-color: #f2f9ff;
  padding: 1px 1rem;
}
header, .content, .banner {
  margin-left: 30%;
}
.banner button {
  margin: 1rem 0;
  font-size: 1.5rem;
  border: 2px solid #888;
  border-radius: 5px;
  padding: 0.5rem 0.25rem;
}`

const lesson = `import React from 'react'

export const lesson = {
  title: "4 Approaches to Conditional Rendering with React",
  outline: [
    <span>React elements are JavaScript objects</span>,
    <span>Approach #1: {<code>if</code>}/{<code>else</code>}</span>,
    <span>Interpolation vs. <code>return</code></span>
  ],
  document: "One of the first things you’ll notices about React is that it doesn’t have a special way to handle conditional rendering. Unlike Vue and Angular, there’s no if prop or directive.",
  sampleDocument: "One of the first things...",
}`

const layout = `import React from 'react'

export const Header = (props) => 
  <header>
    <h1>{props.title}</h1>
  </header>

export const Sidebar = (props) => 
  <ul className="sidebar">
    {props.outline.map((item, i) =>
      <li key={i}>{item}</li>
    )}
  </ul>
  
export const Content = (props) => 
  <div className="content">
    {props.document}
  </div>

export const Banner = () =>
  <div className="banner">
    <button>Sign up to read more</button>
  </div>`

export const breadboardHelpers = {
  'layout.js': layout,
  'lesson.js': lesson,
  'style.css': style,
}