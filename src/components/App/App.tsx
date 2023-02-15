import React, { FC, useEffect, useState } from 'react';
import { AppContainer } from "../../components-ui";
import { AppRouter } from "../AppRouter/AppRouter";
import { useCheckAuthorization } from "../../hooks/useCheckAuthorization";

export const App: FC = () => {
    const [isLoadingAuth, setLoadingAuth] = useState(true)

    const checkAuthorizationCallback = useCheckAuthorization()

    useEffect(() => {
        checkAuthorizationCallback().then(() => setLoadingAuth(false))
    }, [checkAuthorizationCallback])

    if (isLoadingAuth) return <></>

    return (
        <AppContainer>
            <AppRouter/>
        </AppContainer>
    );
};
