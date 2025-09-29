# 🧬 Genomic Platform Frontend

A Web3-native genomic analysis platform that democratizes DNA/RNA analysis for hospitals, researchers, and communities worldwide.

## 🚀 Features

- **Classical Genomic Analysis**: Mutation detection, sequence alignment, drug resistance screening
- **Web3 Integration**: Built on Stacks blockchain with Clarity smart contracts
- **Multi-Domain Support**: Healthcare, research, education, agriculture, forensics
- **Secure & Private**: End-to-end encryption with blockchain-verified data provenance
- **User-Friendly**: No bioinformatics expertise required

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Blockchain**: Stacks blockchain + Clarity smart contracts
- **Styling**: CSS Modules + Responsive design
- **Routing**: React Router v6
- **State Management**: React hooks + Context API
- **File Handling**: React Dropzone for DNA/RNA uploads

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (Home, Upload, Results, etc.)
├── styles/             # CSS modules and global styles
├── utils/              # Utility functions and API clients
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🏗️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/rotji/genomic-platform-frontend.git
cd genomic-platform-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🎯 Roadmap

### Phase 1: Foundation (Items 1-15)
- [x] Basic project setup and structure
- [x] Core UI components and routing
- [ ] File upload functionality
- [ ] Basic genomic analysis

### Phase 2: Core Features (Items 16-35)
- [ ] Stacks.js Web3 integration
- [ ] Smart contract interactions
- [ ] Classical genomic analysis pipeline
- [ ] User dashboard and authentication

### Phase 3: Advanced Features (Items 36-55)
- [ ] NFT integration for genomic data
- [ ] Multi-domain modules (healthcare, research, etc.)
- [ ] Global surveillance and analytics
- [ ] Enterprise features and scaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](./docs/) - Comprehensive project documentation
- [Todo List](./docs/to%20do%20lists.md) - Complete build roadmap
- [Stacks Documentation](https://docs.stacks.co/) - Stacks blockchain docs

## 📞 Support

For questions and support, please open an issue or contact the development team.

---

**Building the future of genomic analysis on Web3** 🧬⛓️
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
