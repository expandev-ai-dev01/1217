/**
 * @component Footer
 * @summary Application footer with copyright information
 * @domain core
 * @type layout-component
 * @category layout
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-naruto-dark/80 backdrop-blur-md border-t border-naruto-orange/20 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-300">
          <p className="text-sm">© {currentYear} Quiz Naruto v3. Todos os direitos reservados.</p>
          <p className="text-xs mt-2 text-gray-400">
            Naruto é uma marca registrada de Masashi Kishimoto.
          </p>
        </div>
      </div>
    </footer>
  );
};
