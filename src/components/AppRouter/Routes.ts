import { MY_BLOG, PEOPLE_AND_PROJECTS, SUBSCRIPTIONS } from "../../constants/nameRoutesConsts";
import { MyBlogPage, PeopleAndProjectsPage, SubscriptionPage } from "../../pages";



export const routes = [
    {path: PEOPLE_AND_PROJECTS, Element: PeopleAndProjectsPage},
    {path: MY_BLOG, Element: MyBlogPage},
    {path: SUBSCRIPTIONS, Element: SubscriptionPage},
]

