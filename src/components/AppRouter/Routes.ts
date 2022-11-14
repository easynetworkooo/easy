import {
    COMMUNITY, CREATE_PROJECT,
    MESSAGES,
    MY_BLOG,
    PEOPLE_AND_PROJECTS,
    SUBSCRIPTIONS,
    WALLET,
    PROJECTS, USERS
} from "../../constants/nameRoutesConsts";
import {
    CommunityPage, CreateProjectPage,
    MessagesPage,
    MyBlogPage,
    PeopleAndProjectsPage,
    SubscriptionPage,
    WalletPage,
    UserPage,
    ProjectPage
} from "../../pages";


export const routes = [
    {path: PEOPLE_AND_PROJECTS, Element: PeopleAndProjectsPage},
    {path: MY_BLOG, Element: MyBlogPage},
    {path: SUBSCRIPTIONS, Element: SubscriptionPage},
    {path: MESSAGES, Element: MessagesPage},
    {path: COMMUNITY, Element: CommunityPage},
    {path: WALLET, Element: WalletPage},
    {path: CREATE_PROJECT, Element: CreateProjectPage},
    {path: USERS + '/:nickname', Element: UserPage},
    {path: PROJECTS + '/:projectId', Element: ProjectPage},
]

