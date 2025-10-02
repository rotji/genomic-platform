# 🧬 Genomic Platform Frontend

A comprehensive Web3-native genomic analysis platform that democratizes DNA/RNA analysis with AI-powered genetic code generation capabilities. Built for hospitals, researchers, biotechnology companies, and communities worldwide.

## 🚀 Current Features

### ✅ **Core Platform**
- **React 19 Frontend**: Modern React with TypeScript and responsive design
- **Authentication System**: Sign up/sign in with secure session management
- **Responsive Navigation**: Mobile-friendly interface with user state management
- **Page Structure**: Home, Upload, Results, and Documentation pages

### ✅ **AI Genetic Code Generation** 
- **NVIDIA BioNeMo EVO2 Integration**: State-of-the-art protein and DNA design
- **Multi-Modal AI**: Support for multiple genetic generation models
- **Custom Genetic Sequences**: On-demand protein, enzyme, and therapeutic design
- **Business Applications**: Drug discovery, agriculture, biotechnology

### 🔄 **In Development**
- **File Upload System**: Drag-and-drop for FASTA, VCF, BAM files
- **Classical Genomic Analysis**: Mutation detection, sequence alignment
- **Web3 Integration**: Stacks blockchain with Clarity smart contracts
- **Advanced AI Features**: Genetic optimization and therapeutic design

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI/UX**: CSS Modules + Lucide React icons + React Hot Toast
- **Routing**: React Router v6 with nested layouts
- **Authentication**: React Context + localStorage persistence
- **File Handling**: React Dropzone (planned)
- **Blockchain**: Stacks blockchain + Clarity smart contracts (planned)
- **AI Integration**: NVIDIA BioNeMo EVO2 + custom models (documented)

## 📁 Current Project Structure

```
src/
├── components/          # UI components
│   ├── Layout.tsx      # Main layout with navbar/footer
│   ├── Navbar.tsx      # Navigation with auth integration
│   ├── Footer.tsx      # Footer component
│   ├── SignUp.tsx      # User registration form
│   ├── SignIn.tsx      # User login form
│   └── *.module.css    # Component-specific styles
├── pages/              # Page components
│   ├── Home.tsx        # Landing page with hero section
│   ├── Upload.tsx      # File upload interface (basic)
│   ├── Results.tsx     # Analysis results display
│   └── Docs.tsx        # Documentation hub
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication context and state
├── types/              # TypeScript definitions
│   └── auth.ts         # Authentication types
├── assets/             # Static assets
└── main.tsx           # App entry point
```

## 📚 Documentation

### Comprehensive Guides Available:
- **[AI Genetic Generation](./docs/ai-genetic-generation.md)** - NVIDIA BioNeMo EVO2 integration guide
- **[Complete Todo List](./docs/to%20do%20lists.md)** - 57-item development roadmap
- **[Platform Architecture](./docs/)** - 15+ documentation files covering all aspects

### Key Documentation Files:
- `first-documentation.md` - Project overview and vision
- `ui-ux.md` - Design system and user experience
- `pitch-deck.md` - Business case and market analysis
- `chatgpt-limitations.md` - AI development considerations

## 🏗️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/rotji/genomic-platform-frontend.git
cd genomic-platform-frontend

# Install dependencies
npm install

# Start development server (handles PowerShell execution policy)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm run dev

# Open browser to http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server at localhost:5173
- `npm run build` - Build for production deployment
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking

## 🎯 Development Progress

### ✅ **Completed (Items 1-6)**
- [x] **Project Foundation**: Vite + React 19 + TypeScript setup
- [x] **UI Components**: Responsive navbar, footer, layout system
- [x] **Page Structure**: Home, Upload, Results, Documentation pages  
- [x] **Authentication**: Sign up/sign in with form validation
- [x] **AI Documentation**: Comprehensive NVIDIA BioNeMo EVO2 integration guide
- [x] **Development Workflow**: Git setup, ESLint, Prettier configuration

### 🔄 **In Progress (Item 7)**
- [ ] **File Upload UI**: Drag-and-drop for genomic files (FASTA, VCF, BAM)

### 📋 **Roadmap (Items 8-57)**
- [ ] **Genomic Analysis Engine**: Classical bioinformatics pipelines
- [ ] **Stacks Web3 Integration**: Blockchain data storage and NFTs
- [ ] **AI Genetic Generation**: Live NVIDIA BioNeMo EVO2 integration
- [ ] **Multi-Domain Modules**: Healthcare, research, agriculture applications
- [ ] **Enterprise Features**: Advanced analytics, collaboration tools

## 🔐 Authentication System

### Current Implementation:
- **Sign Up**: `/signup` - Name, email, password with validation
- **Sign In**: `/signin` - Email and password authentication  
- **Session Management**: localStorage persistence across browser sessions
- **Navbar Integration**: Dynamic user menu with sign out functionality
- **Form Validation**: Password matching, length requirements, error handling

### Usage:
```bash
# Access auth routes
http://localhost:5173/signup   # User registration
http://localhost:5173/signin   # User login
http://localhost:5173/         # Main app (authenticated state)
```

## 🤖 AI Genetic Code Generation

### Documented Capabilities:
- **Protein Design**: Custom enzyme and therapeutic protein generation
- **DNA Sequences**: Optimized genetic constructs for specific applications
- **Drug Discovery**: AI-powered molecular design and optimization
- **Agricultural Applications**: Crop improvement and pathogen resistance
- **Research Tools**: Custom genetic constructs for experimental use

### Integration Status:
- ✅ **Documentation Complete**: Comprehensive implementation guide
- ✅ **Business Model**: Revenue streams and market analysis documented  
- 🔄 **Technical Integration**: NVIDIA BioNeMo EVO2 API implementation planned
- 🔄 **UI Components**: Genetic generation interface design in progress

## 🤝 Contributing

### Development Workflow:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing code style (ESLint + Prettier configured)
4. Test your changes thoroughly
5. Commit with descriptive messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a detailed Pull Request

### Code Standards:
- **TypeScript**: Strict typing enabled, no `any` types
- **React 19**: Modern hooks and patterns, no class components
- **CSS Modules**: Component-scoped styling, responsive design
- **ESLint**: Code quality enforcement with React and TypeScript rules

## 🌟 Key Differentiators

### **Unique Value Propositions:**
1. **AI-First Approach**: NVIDIA BioNeMo EVO2 integration for genetic design
2. **Web3 Native**: Blockchain-verified data provenance and NFT integration
3. **Multi-Domain Platform**: Healthcare, research, agriculture, forensics support
4. **No-Code Genomics**: Accessible to non-bioinformatics experts
5. **Global Accessibility**: Democratizing genomic analysis worldwide

### **Target Markets:**
- **Healthcare**: Hospitals, clinics, personalized medicine
- **Research**: Universities, biotechnology companies, pharmaceutical
- **Agriculture**: Crop optimization, pathogen resistance, sustainability
- **Enterprise**: Custom genetic engineering, drug discovery platforms

## 📊 Current Status

### **Deployment Ready:**
- ✅ Development environment configured and running
- ✅ Authentication system functional
- ✅ Responsive UI components complete
- ✅ Documentation comprehensive and up-to-date
- ✅ Code quality tools (ESLint, Prettier) configured

### **Next Milestones:**
1. **File Upload Interface** (Item 7) - Immediate next step
2. **Genomic Analysis Pipeline** (Items 8-15) - Core functionality
3. **Web3 Integration** (Items 16-25) - Blockchain features
4. **AI Generation Interface** (Items 26-35) - NVIDIA BioNeMo EVO2
5. **Production Deployment** (Items 36-45) - Scaling and optimization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Important Links

- **[Live Demo](http://localhost:5173)** - Development server
- **[Complete Documentation](./docs/)** - 15+ comprehensive guides
- **[Development Roadmap](./docs/to%20do%20lists.md)** - 57-item todo list
- **[AI Integration Guide](./docs/ai-genetic-generation.md)** - NVIDIA BioNeMo EVO2
- **[Stacks Documentation](https://docs.stacks.co/)** - Web3 blockchain platform

## 📞 Support & Contact

For questions, feature requests, or technical support:
- **Issues**: Open a GitHub issue with detailed description
- **Discussions**: Use GitHub Discussions for general questions
- **Documentation**: Check the [docs folder](./docs/) for comprehensive guides

---

**🚀 Building the future of AI-powered genomic analysis on Web3** 🧬⛓️

*Last Updated: September 30, 2025 - Authentication system completed, file upload next*
```
