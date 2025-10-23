import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';

/**
 * @page HomePage
 * @summary Welcome page with quiz introduction and start button
 * @domain core
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-2xl shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-naruto-yellow mb-4">
          Quiz Naruto
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Teste seus conhecimentos sobre o mundo ninja!
        </p>
        <p className="text-lg text-gray-200 mb-8">
          Responda perguntas sobre personagens, jutsus, clãs e muito mais do universo de Naruto.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/quiz')}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          Começar Quiz
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
