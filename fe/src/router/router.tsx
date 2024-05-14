import Layout from '@components/Layout';
import GamePage from '@pages/GamePage';
import HomePage from '@pages/HomePage';
import SignInPage from '@pages/SignInPage';
import SignUpPage from '@pages/SignUpPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTE_PATH } from './constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route
        element={
          <ProtectedRoute needAuth={false} redirectRoute={ROUTE_PATH.HOME} />
        }
      >
        <Route path={ROUTE_PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTE_PATH.SIGN_UP} element={<SignUpPage />} />
      </Route>
      <Route
        element={<ProtectedRoute needAuth redirectRoute={ROUTE_PATH.SIGN_IN} />}
      >
        <Route path={ROUTE_PATH.HOME} element={<HomePage />} />
        <Route path={`${ROUTE_PATH.GAME}/:gameId`} element={<GamePage />} />
      </Route>
    </Route>
  )
);
