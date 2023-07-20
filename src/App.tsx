import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { MainWrapper } from 'modules/wrappers/MainWrapper/MainWrapper';
import { AuthWrapper } from 'modules/wrappers/AuthWrapper';
import { TestingWrapper } from 'modules/wrappers/TestingWrapper';
import { PrivateRoute } from 'modules/wrappers/PrivateRoute';
import { PublicRoute } from 'modules/wrappers/PublicRoute';

import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';

const ForgotPasswordPage = lazy(() => import('pages/ForgotPasswordPage'));
const HomePage = lazy(() => import('pages/HomePage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const TestingPage = lazy(() => import('pages/TestingPage'));
const TestPage = lazy(() => import('pages/TestPage'));
const TaskPage = lazy(() => import('pages/TaskPage'));

import useAppDispatch from 'hooks/useAppDispatch';
import useGetDataFromUrl from 'hooks/useGetDataFromUrl';
import { currentUser } from '../src/redux/auth/auth-operations';
import { userAuth } from '../src/redux/auth/auth-slice';
import { ROUTES } from 'routes/routes.const';
import { IReduxAuthUser } from 'constants/types';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();
  const { data, dataParams, location } = useGetDataFromUrl<IReduxAuthUser>('userData');

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    if (dataParams && data && location.pathname === '/') {
      dispatch(userAuth(data));
    }
  }, [data, dataParams, dispatch, location]);

  return (
    <>
      <Routes>
        <Route
          element={
            <PublicRoute>
              <AuthWrapper />
            </PublicRoute>
          }
        >
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.REGISTER}
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.FORGOT_PASS}
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <MainWrapper />
            </PrivateRoute>
          }
        >
          <Route
            path={ROUTES.HOME}
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route
            path={ROUTES.TEST}
            element={
              <PrivateRoute>
                <TestPage />
              </PrivateRoute>
            }
          />

          <Route
            path={ROUTES.TASK}
            element={
              <PrivateRoute>
                <TaskPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <TestingWrapper />
            </PrivateRoute>
          }
        >
          <Route
            path={ROUTES.TESTING}
            element={
              <PrivateRoute>
                <TestingPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
