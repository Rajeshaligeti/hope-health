# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/19b8a4e1-8239-46cf-8465-8de70704f625

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/19b8a4e1-8239-46cf-8465-8de70704f625) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables
cp .env.example .env
# Edit .env with your actual API keys and configuration

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Environment Variables

This project requires several environment variables to be set up. A template is provided in `.env.example`. To set up your environment:

1. Copy `.env.example` to `.env`
2. Fill in the following variables in your `.env` file:

- `VITE_SUPABASE_PROJECT_ID`: Your Supabase project ID
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase publishable key
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_GEMINI_API_KEY`: Your Google Gemini API key
- `VITE_GOOGLE_API_KEY`: Your Google API key for additional services

Note: Never commit your `.env` file or share your API keys. The `.env` file is already in `.gitignore` to prevent accidental commits.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/19b8a4e1-8239-46cf-8465-8de70704f625) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
