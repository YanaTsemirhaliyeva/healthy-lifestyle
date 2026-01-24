import './App.css';

import { Outlet } from 'react-router';

import { Layout } from '~/components/layout/Layout';
import { ScrollToTop } from '~/hooks/scroll-to-top';

function App() {

    return (
        <>
            <ScrollToTop />
            <Layout>
                <Outlet />
            </Layout>
        </>
    );
}

export default App;
