import React, { Suspense, lazy } from 'react'

const RightSidebarModule = lazy(() => import("./RightSidebar").catch(err => {
    console.error(err);
    return { default: () => <div>Failed to load module</div> };
}));
const LeftSidebarModule = lazy(() => import("./LeftSidebar").catch(err => {
    console.error(err);
    return { default: () => <div>Failed to load module</div> };
}));


function App() {
    return (
        <>
            <div
                className='header'
            >
            <h1>This is Host app (React)</h1>
            <h2>Micro host app is integrated below</h2>
            </div>
            <div >
                <div style={
                    {
                        display: "flex",
                        flexDirection: "row",
                    }
                }>

                    <Suspense fallback={<span>Loading...</span>}>
                        <RightSidebarModule />
                    </Suspense>
                    <Suspense fallback={<span>Loading...</span>}>
                        <LeftSidebarModule />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default App;
