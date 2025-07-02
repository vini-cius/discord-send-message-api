import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { Client, GatewayIntentBits } from 'discord.js';

import { fastify } from 'fastify'
import { sendMessage } from './routes/send-message';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { getInviteUrl } from './routes/get-invite-url';

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

app.register(fastifyHelmet)
app.register(fastifyCors)

app.register((instance) => {
	instance.get('/health', async (request, reply) => {
		return { ok: true }
	})
})

app.register((instance) => sendMessage(instance, client), { prefix: '/api/discord' })
app.register((instance) => getInviteUrl(instance, client), { prefix: '/api/discord' })

app.listen({ port: Number(process.env.SERVER_PORT) || 3333 }, () => {
	console.info(`🚀 Server running on http://localhost:${process.env.SERVER_PORT}`)

	client.once('ready', () => {
		console.log('Bot is ready!');
	});

	client.login(process.env.DISCORD_TOKEN);
})
