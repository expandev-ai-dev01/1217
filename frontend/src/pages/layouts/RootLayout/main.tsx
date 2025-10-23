import { Outlet } from 'react-router-dom';
import { Header } from '@/core/components/Header';
import { Footer } from '@/core/components/Footer';

/**
 * @component RootLayout
 * @summary Main application layout with header and footer
 * @domain core
 * @type layout-component
 * @category layout
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-naruto-dark via-naruto-blue to-naruto-dark">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
