import { Client, TextChannel } from "discord.js";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export async function sendMessage(app: FastifyInstance, client: Client) {
	app.withTypeProvider<ZodTypeProvider>().post('/notify', {
		schema: {
			body: z.object({
				message: z.string(),
				channelId: z.string()
			}),
			response: {
				200: z.string(),
				404: z.string()
			}
		}
	}, async (request, reply) => {
		const { message, channelId } = request.body;

		const channel = client.channels.cache.get(channelId) as TextChannel;

		if (channel) {
			channel.send(message);

			reply.status(200).send('Notification sent');
		} else {
			reply.status(404).send('Channel not found');
		}
	})
}
