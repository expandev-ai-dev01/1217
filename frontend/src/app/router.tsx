import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { RootLayout } from '@/pages/layouts/RootLayout';

const HomePage = lazy(() => import('@/pages/Home'));
const QuizPage = lazy(() => import('@/pages/Quiz'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

/**
 * @component AppRouter
 * @summary Main application routing configuration with lazy loading
 * @type router-configuration
 * @category navigation
 */
export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="quiz"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <QuizPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
