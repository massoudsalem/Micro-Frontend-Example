import React, { useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";
import './App.css';

async function getCSSStyleSheet() {
    const response = await fetch("./App.css");
    const css = await response.text();
    return css;
}

function withShadowDOM(WrappedComponent) {
    return function WithShadowDOM() {
        const ref = useRef(null);
        getCSSStyleSheet().then(css => {//inject css into shadow dom
            /*Note: you can also use the css in link tag inside shadow dom and use onload event 
            to render the component after css is loaded but i'm too lazy to do that*/
            const style = document.createElement("style");
            style.textContent = css;
            if (ref.current) {
                ref.current.shadowRoot.appendChild(style);
            }
        });

        useEffect(() => {
            if (ref.current) {
                const shadowRoot = ReactDOM.createRoot(ref.current.shadowRoot);
                if (ref.current.shadowRoot) {
                    shadowRoot.render(
                        <>
                            <WrappedComponent />,
                        </>
                    );
                } else {
                    ReactDOM.createRoot(shadowRoot);
                }
            }
        }, []);
        return <div id="shadow-dom-container" ref={ref}></div>;
    };
}

export default withShadowDOM;


