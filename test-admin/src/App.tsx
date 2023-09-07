import { Admin, Resource, ShowGuesser, Layout } from "react-admin";
import { dataProvider } from './dataProvider';
import { UserList } from "./components/users";
import { PostList, PostEdit, PostCreate } from "./components/posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from './Dashboard';
import { authProvider } from './authProvider';
import { AlbumList } from "./components/albums";
import { i18nProvider } from './i18nProvider';
import ThemeToggler from "./hooks/theme";
import { MyAppBar } from './components/appbar';
import CustomLoginPage from './components/loginPage';

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;


export const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} i18nProvider={i18nProvider}
        darkTheme={{ palette: { mode: 'dark' } }} loginPage={CustomLoginPage} >

        <Resource
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
            options={{ label: 'Posts' }}
        />

        <Resource
            name="users"
            list={UserList}
            show={ShowGuesser}
            recordRepresentation="name"
            icon={UserIcon}
            options={{ label: 'Usuarios' }}
        />
        <Resource
            name="albums"
            list={AlbumList}
            icon={PostIcon}
            options={{ label: 'Albumes' }}
        />

    </Admin >
); 