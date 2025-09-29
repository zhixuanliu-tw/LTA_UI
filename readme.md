# LTA UI Application

## AWS Amplify Deployment Instructions

1. Connect your repository to AWS Amplify:
   - Go to AWS Amplify Console
   - Click "New App" > "Host Web App"
   - Choose GitHub as your repository source
   - Select this repository and branch

2. Build Settings:
   - The build settings are automatically configured through the `amplify.yml` file
   - The application will be built using the production configuration

3. Important Notes:
   - The application uses client-side routing (Angular Router)
   - Redirects are configured to handle SPA routing
   - All assets are properly configured in angular.json

## Local Development

1. Install dependencies:
```bash
npm ci
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```
