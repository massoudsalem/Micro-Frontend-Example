import React from 'react'
import withShadowDOM from './ShadowDomHOC'
import logo from './logo.svg'

function App() {
    return (
        <div className="right-sidebar">
            <img src={logo} alt="react-logo" className="App-logo" />
            <h1>This is a React app running from<br/> another react app</h1>
        </div>
    )
}

export default function AppWithShadowDOM() {
    // if you want to use ShadowDOM, uncomment this line
    // const Component = withShadowDOM(App);
    const Component = App;
    return <Component />;
}