import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';

/**
 * @page NotFoundPage
 * @summary 404 error page
 * @domain core
 * @type error-page
 * @category public
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-2xl shadow-2xl">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-naruto-orange mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Página não encontrada</h2>
        <p className="text-lg text-gray-200 mb-8">Parece que você se perdeu no caminho ninja...</p>
        <Button variant="primary" size="lg" onClick={() => navigate('/')}>
          Voltar para o Início
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
