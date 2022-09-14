import React, { FC } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";

export interface AppProviderProps {
    children: React.ReactNode
}

const store = setupStore()

export const AppProvider: FC<AppProviderProps> = ({children}) => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
};