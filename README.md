# Discord Bot

A Discord bot with HTTP API endpoints for sending messages and managing bot invitations. Built with TypeScript, Fastify, and Discord.js.

## Features

- 🤖 Discord bot integration with Discord.js
- 🌐 HTTP API server using Fastify
- 📨 Send messages to Discord channels via API
- 🔗 Generate bot invite URLs
- 🛡️ Security with Helmet and CORS
- 📝 TypeScript with Zod validation

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Discord Bot Token

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd discord-bot
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```env
DISCORD_TOKEN=your_discord_bot_token_here
SERVER_PORT=3333
```

## Development

Start the development server with hot reload:
```bash
pnpm dev
```

The server will start on `http://localhost:3333` (or the port specified in your `.env` file).

## Production

Build the project:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Discord Bot API

#### Send Message
- **POST** `/api/discord/notify`
- Send a message to a specific Discord channel

**Request Body:**
```json
{
  "message": "Hello from the API!",
  "channelId": "123456789012345678"
}
```

**Response:**
- `200`: Message sent successfully
- `404`: Channel not found

#### Get Invite URL
- **GET** `/api/discord/invite-url`
- Get the bot's invite URL for adding to servers

**Response:**
- `200`: Discord OAuth2 invite URL

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DISCORD_TOKEN` | Your Discord bot token | Required |
| `SERVER_PORT` | HTTP server port | 3333 |

## Project Structure

```
discord-bot/
├── src/
│   └── http/
│       ├── routes/
│       │   ├── get-invite-url.ts
│       │   └── send-message.ts
│       └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies Used

- **Discord.js** - Discord bot API wrapper
- **Fastify** - Fast and low overhead web framework
- **TypeScript** - Type-safe JavaScript
- **Zod** - Schema validation

## Getting a Discord Bot Token

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section
4. Create a bot and copy the token
5. Add the bot to your server using the invite URL from the API

## License

ISC 