import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { AUTH, AUTH_CONTINUE, PEOPLE_AND_PROJECTS } from "../../constants/nameRoutesConsts";
import { routes } from "./Routes";
import { AppMain } from "../AppMain/AppMain";
import { AuthContinuePage, AuthPage } from "../../pages";

export const AppRouter = () => {


    const {isAuth} = useAppSelector(state => state.userReducer)
    const {continueAuth} = useAppSelector(state => state.userReducer.user)

    return (
        <Routes>
            <Route key={"/easy"} path={"/easy"} element={isAuth ? <Navigate to={AUTH_CONTINUE}/> : <AuthPage/>}/>
            <Route key={"/"} path={"/"} element={isAuth ? <Navigate to={AUTH_CONTINUE}/> : <AuthPage/>}/>
            <Route key={AUTH} path={AUTH} element={isAuth ? <Navigate to={AUTH_CONTINUE}/> : <AuthPage/>}/>
            <Route key={AUTH_CONTINUE} path={AUTH_CONTINUE} element={isAuth === true && continueAuth ? <AuthContinuePage/> : <Navigate to={PEOPLE_AND_PROJECTS}/>}/>
            <Route element={<AppMain/>}>
                {routes.map(({path, Element}) =>
                    <Route key={path} path={path} element={continueAuth === false || isAuth === true ? <Element/> : <Navigate to={AUTH}/>}/>
                )}
            </Route>


        </Routes>
    );
};