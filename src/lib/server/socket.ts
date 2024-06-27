import { Token } from '$lib/db/schemas/token';
import { CustomTokenDefinition } from '$lib/db/schemas/token-definition';
import type { ServerHandledMessages, TokensMessageCategory } from '$lib/messages';
import { MessageHandler, publicResponse, type CategoryHandlers } from '$lib/socket';
import { Connection } from './connection';

export interface HandlerOptions {
	dispatcher: Connection;
}

export class ServerMessageHandler extends MessageHandler<ServerHandledMessages, HandlerOptions> {
	tokens: CategoryHandlers<TokensMessageCategory, ServerHandledMessages, HandlerOptions> = {
		handleTokenCreate: async (payload, { dispatcher }) => {
			const token = await Token.create({
				definition: await CustomTokenDefinition.findById(payload.tokenDefinition),
				position: payload.position
			});

			await dispatcher.session?.campaign?.updateOne({
				$push: {
					'scenes.0.tokens': token
				}
			});

			return publicResponse({
				token
			});
		},

		handleTokenMove: async (payload) => {
			console.log('move token', payload);

			return {
				forwardedResponse: payload
			};
		}
	};
}

export const serverMessageHandler = new ServerMessageHandler();
