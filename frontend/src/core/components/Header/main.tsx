import { Link } from 'react-router-dom';

/**
 * @component Header
 * @summary Application header with navigation
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const Header = () => {
  return (
    <header className="bg-naruto-dark/80 backdrop-blur-md border-b border-naruto-orange/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-display font-bold text-naruto-yellow">
              Quiz Naruto
            </span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:text-naruto-yellow transition-colors font-medium"
            >
              Início
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
