# Shark - AI-Driven Marine Insights

A comprehensive marine data platform that unifies ocean, fisheries, otolith, and DNA data for sustainable marine management through advanced AI-powered analytics and visualization.

## Features

- **AI Assistant**: Powered by NVIDIA Llama-3.1-Nemotron-70B-Instruct for marine data analysis
- **Interactive Visualizations**: Real-time maps and charts for marine ecosystem analysis
- **Species Identification**: AI-powered taxonomy and image-based species recognition
- **eDNA Analysis**: Environmental DNA sample processing and biodiversity assessment
- **Otolith Analysis**: Age estimation and species identification from otolith images
- **Comprehensive Datasets**: Access to oceanographic, fisheries, and biodiversity data
- **API Access**: RESTful API for programmatic data access

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shark-marine-platform
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Add your NVIDIA API key to `.env`:
   - Go to [https://build.nvidia.com/](https://build.nvidia.com/)
   - Sign up/Login
   - Navigate to the API section
   - Generate an API key
   - Add it to your `.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. Start the development server:
```bash
npm run dev
```

6. Start the backend server (in a separate terminal):
```bash
node server.js
```

## AI Assistant Configuration

The AI assistant uses Google's Gemini 1.5 Flash model for marine data analysis. To enable the AI features:

1. **Get Gemini API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Create an account or sign in
   - Generate an API key from the dashboard

2. **Configure Environment**:
   - Copy `.env.example` to `.env`
   - Add your API key: `GEMINI_API_KEY=your_key_here`

3. **AI Capabilities**:
   - Marine species identification
   - Oceanographic data analysis
   - eDNA result interpretation
   - Fisheries data insights
   - Ecosystem health assessment

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── services/           # API and external service integrations
└── types/              # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Maps**: Leaflet, React Leaflet
- **Charts**: Recharts
- **AI**: NVIDIA API (Llama-3.1-Nemotron-70B-Instruct)
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Note**: This platform is designed for marine research and conservation efforts. All data should be used responsibly and in accordance with marine protection guidelines.

url for website : https://ocean-main.onrender.com/