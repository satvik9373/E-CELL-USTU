# Contributing to E-Cell USTU

Thank you for considering contributing to the E-Cell USTU project! We welcome contributions from everyone.

## How to Contribute

### 🐛 Reporting Bugs

1. Check if the bug has already been reported in [GitHub Issues](https://github.com/satvik9373/E-CELL-USTU/issues)
2. If not, create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node.js version)

### 💡 Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with:
   - Clear description of the proposed feature
   - Use case and motivation
   - Possible implementation approach

### 🛠️ Code Contributions

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```
4. **Install** dependencies:
   ```bash
   npm install
   ```
5. **Set up** environment variables (copy `.env.example` to `.env.local`)
6. **Make** your changes following our guidelines
7. **Test** your changes thoroughly
8. **Commit** with meaningful messages:
   ```bash
   git commit -m "feat: add user notification system"
   git commit -m "fix: resolve ticket download issue"
   ```
9. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
10. **Create** a Pull Request

## Development Guidelines

### 📝 Code Style

- **TypeScript**: Use TypeScript for all new files
- **ESLint**: Follow ESLint rules (`npm run lint`)
- **Prettier**: Code is automatically formatted
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic

### 🏗️ Architecture

- **Components**: Keep components small and focused
- **Hooks**: Extract reusable logic into custom hooks
- **Types**: Define proper TypeScript interfaces
- **Database**: Use Supabase client properly
- **Auth**: Leverage Clerk authentication helpers

### 🧪 Testing

- Test your changes in different browsers
- Verify responsive design on mobile devices
- Test authentication flows
- Check database operations work correctly

### 📋 Pull Request Guidelines

- **Title**: Clear and descriptive
- **Description**: 
  - What changes were made and why
  - How to test the changes
  - Screenshots for UI changes
  - Link to related issues
- **Size**: Keep PRs focused and reasonably sized
- **Conflicts**: Resolve merge conflicts before requesting review

## Project Structure

```
app/                 # Next.js App Router pages
components/          # Reusable React components
  ├── ui/           # Base UI components (shadcn/ui)
  ├── home/         # Home page components
  └── layout/       # Layout components
lib/                # Utility functions and configurations
  ├── supabaseClient.ts    # Database client
  ├── authHelpers.ts       # Authentication utilities
  └── database.ts          # Database operations
public/             # Static assets
types/              # TypeScript type definitions
```

## Getting Help

- **Documentation**: Check [SETUP_README.md](SETUP_README.md) for detailed setup
- **Issues**: Browse existing issues for solutions
- **Discussions**: Use GitHub Discussions for questions
- **Contact**: Reach out to maintainers for urgent matters

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help create a welcoming environment

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes for significant contributions

Thank you for helping make E-Cell USTU better! 🚀