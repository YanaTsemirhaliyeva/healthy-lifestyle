import { createBrowserRouter } from 'react-router';

import App from '~/app/App.tsx';
import { AppRoute } from '~/consts/consts';
import { Articles } from '~/pages/articles';
import { ErrorPage } from '~/pages/error';
import { FortuneWheel } from '~/pages/fortune-wheel';
import { Home } from '~/pages/home';
import { TestsPage } from '~/pages/tests-page';


export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [

                {
                    path: AppRoute.Index,
                    element: <Home />,
                },
                {
                    path: AppRoute.Fortune,
                    element: <FortuneWheel />
                },
                {
                    path: AppRoute.Tests,
                    element: <TestsPage />
                },
                {
                    path: AppRoute.Articles,
                    element: <Articles />
                },
                {
                    path: AppRoute.NotFound,
                    element: <ErrorPage />,
                },
            ],
        },
        {
            path: '*',
            element: <ErrorPage />,
        },
    ],

    {
        basename: import.meta.env.BASE_URL,
    },
);
