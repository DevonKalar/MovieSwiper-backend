import OpenAI from 'openai';
import { config } from '../config/env.js';

class OpenAIService {
	private client: OpenAI;

	constructor() {
			this.client = new OpenAI({
					apiKey: config.apiKeys.openai,
			})
	}

	async createResponse(input: string, previousResponseID?: string) {
			const response = await this.client.responses.create({
					model: 'gpt-4o',
					input,
					previousResponseID,
			});
			return response;
	}

	async retrieveResponse(responseId: string) {
		const response = await this.client.responses.retrieve(responseId);
		return response;
	}
}

export const openaiService = new OpenAIService();