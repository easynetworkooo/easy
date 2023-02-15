import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { AUTH, AUTH_CONTINUE, CONTENT, GOOGLE_PROTECT } from "../../constants/nameRoutesConsts";
import { routes } from "./Routes";
import { AppMain } from "../AppMain/AppMain";
import { AuthContinuePage, AuthPage, ProtectGooglePage } from "../../pages";
import { AppRequireAuth } from "../AppRequireAuth/AppRequireAuth";
import { ILocationFromState } from "../../models/ILocationFromState";

export const AppRouter = () => {

    const {isAuth} = useAppSelector(state => state.authReducer)
    const {continueAuth} = useAppSelector(state => state.authReducer)

    const location = useLocation();
    const fromPathname = (location.state as ILocationFromState)?.from?.pathname || CONTENT


    return (
        <Routes>
            <Route key={AUTH} path={AUTH} element={isAuth ? <Navigate to={fromPathname} replace/> : <AuthPage/>}/>
            <Route key={GOOGLE_PROTECT} path={GOOGLE_PROTECT} element={isAuth ? <Navigate to={fromPathname} replace/> : <ProtectGooglePage/>}/>
            <Route key={AUTH_CONTINUE} path={AUTH_CONTINUE}
                   element={continueAuth && isAuth ? <AuthContinuePage/> : <Navigate to={fromPathname}/>}/>
            <Route element={<AppMain/>}>
                {routes.map(({path, Element}) =>
                    <Route key={path} path={path} element={
                        <AppRequireAuth>
                            <Element/>
                        </AppRequireAuth>
                    }
                    />
                )}
            </Route>
        </Routes>
    );
};
