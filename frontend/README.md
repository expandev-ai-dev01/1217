# Quiz Naruto v3

Um quiz interativo com perguntas e respostas sobre conhecimentos gerais do anime Naruto.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Entry point
│   ├── providers.tsx      # Providers globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes UI genéricos
│   ├── lib/              # Configurações de bibliotecas
│   └── utils/            # Funções utilitárias
├── domain/               # Domínios de negócio (features)
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3001`

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Convenções de Código

- Use TypeScript para todos os arquivos
- Siga a estrutura de pastas definida
- Use componentes funcionais com hooks
- Documente componentes com JSDoc
- Use TailwindCSS para estilização
- Mantenha componentes pequenos e focados

## Licença

MIT