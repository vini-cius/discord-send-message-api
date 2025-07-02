import { Client } from "discord.js";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export async function getInviteUrl(app: FastifyInstance, client: Client) {
	app.withTypeProvider<ZodTypeProvider>().get('/invite-url', {
		schema: {
			response: {
				200: z.string(),
			}
		}
	}, async (_, reply) => {

		await client.application?.fetch();

		const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${client.application?.id}&permissions=2048&integration_type=0&scope=bot` || `https://discord.com/oauth2/authorize?client_id=${client.application?.id}&permissions=2048&integration_type=0&scope=bot`;

		reply.status(200).send(inviteUrl);
	})
}
