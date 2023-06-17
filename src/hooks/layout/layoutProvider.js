import {createContext, useEffect, useState} from "react";

export const LayoutContext = createContext(null);

export const LayoutProvider = (props) => {
    const [windowSize, setWindowSize] = useState(
        {width: window.innerWidth, height: window.innerHeight}
    )

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(
                {width: window.innerWidth, height: window.innerHeight}
            );
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const context = {
        mainContentHeight: windowSize
            ? windowSize.height - 48 - 56 - 24 - 24 : 0
    }

    return <LayoutContext.Provider value={context}>{props.children}</LayoutContext.Provider>
}