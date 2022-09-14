import { AUTH, AUTH_CONTINUE, PEOPLE_AND_PROJECTS } from "../../constants/nameRoutesConsts";
import { AuthPage, PeopleAndProjectsPage } from "../../pages";
import { AuthContinuePage } from "../../pages/Auth-continue-page/AuthContinuePage";

export const routes = [
    {path: AUTH, Element: AuthPage},
    {path: PEOPLE_AND_PROJECTS, Element: PeopleAndProjectsPage},
    {path: AUTH_CONTINUE, Element: AuthContinuePage}
]
