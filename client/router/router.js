import Home from '../components/Home';
import Article from '../components/Article';

const router = [
    { path: '/', component: Home, exact: true },
    { path: '/Article', component: Article }
];

export default router;