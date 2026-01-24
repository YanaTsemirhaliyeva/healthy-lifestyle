import { createBrowserRouter } from 'react-router';

import App from '~/app/App.tsx';
// import { ProtectedRouteElement } from '~/components/protected-route/ProtectedRoute';
import { AppRoute } from '~/consts/consts';
import { ErrorPage } from '~/pages/error';
import { FortuneWheel } from '~/pages/fortune-wheel';
import { Home } from '~/pages/home';
import { Projective } from '~/pages/projective';


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
                    path: AppRoute.Projective,
                    element: <Projective />
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
