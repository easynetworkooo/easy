import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { AUTH, AUTH_CONTINUE, PEOPLE_AND_PROJECTS } from "../../constants/nameRoutesConsts";
import { routes } from "./Routes";
import { AppMain } from "../AppMain/AppMain";
import { AuthContinuePage, AuthPage } from "../../pages";
import { AppRequireAuth } from "../AppRequireAuth/AppRequireAuth";
import { ILocationFromState } from "../../models/ILocationFromState";

export const AppRouter = () => {

    const {isAuth} = useAppSelector(state => state.authReducer)
    const {continueAuth} = useAppSelector(state => state.authReducer)

    const location = useLocation();
    const fromPathname = (location.state as ILocationFromState)?.from?.pathname || PEOPLE_AND_PROJECTS


    return (
        <Routes>
            <Route key={"/easy"} path={"/easy"} element={<Navigate to={AUTH}/>}/>
            <Route key={"/"} path={"/"} element={<Navigate to={AUTH}/>}/>
            <Route key={AUTH} path={AUTH} element={isAuth ? <Navigate to={fromPathname} replace/> : <AuthPage/>}/>
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