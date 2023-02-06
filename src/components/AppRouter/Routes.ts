import {
    COMMUNITY, CREATE_PROJECT,
    MESSAGES,
    MY_BLOG,
    CONTENT,
    SUBSCRIPTIONS,
    WALLET,
    PROJECTS, USERS, MY_PROJECTS
} from "../../constants/nameRoutesConsts";
import {
    CommunityPage, CreateProjectPage,
    MessagesPage,
    MyBlogPage,
    ContentPage,
    SubscriptionPage,
    WalletPage,
    UserPage,
    ProjectPage,
    MyProjectsPage
} from "../../pages";


export const routes = [
    {path: CONTENT, Element: ContentPage},
    {path: MY_BLOG, Element: MyBlogPage},
    {path: SUBSCRIPTIONS, Element: SubscriptionPage},
    {path: MESSAGES, Element: MessagesPage},
    {path: COMMUNITY, Element: CommunityPage},
    {path: WALLET, Element: WalletPage},
    {path: CREATE_PROJECT, Element: CreateProjectPage},
    {path: USERS + '/:nickname', Element: UserPage},
    {path: PROJECTS + '/:projectId', Element: ProjectPage},
    {path: MY_PROJECTS, Element: MyProjectsPage},
]

