import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./Routes";
import { useAppSelector } from "../../hooks/redux";
import { AUTH, AUTH_CONTINUE, PEOPLE_AND_PROJECTS } from "../../constants/nameRoutesConsts";

export const AppRouter = () => {

    let navigate = useNavigate()
    
    const {isAuth} = useAppSelector(state => state.userReducer)
    const {continueAuth} = useAppSelector(state => state.userReducer.user)

    useEffect(() => {
        if (isAuth === false) {
            return navigate(AUTH)
        }
        if (isAuth === true && continueAuth === true) {
            return navigate(AUTH_CONTINUE)
        }
        if (isAuth === true) {
            return navigate(PEOPLE_AND_PROJECTS)
        }
    }, [continueAuth, isAuth, navigate])
    
    return (
        <Routes>
            {routes.map(({Element, path}) =>
                <Route
                    key={path}
                    path={path}
                    element={<Element/>}
                />
            )}
        </Routes>
    );
};