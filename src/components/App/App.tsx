import React, { FC } from 'react';
import { AppContainer } from "../../components-ui";
import { AppRouter } from "../AppRouter/AppRouter";

export const App: FC = () => {
    return (
        <AppContainer>
            <AppRouter/>
        </AppContainer>
    );
};