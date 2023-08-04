import { OPENAI_KEY } from '$env/static/private';
import { OpenAIApi, Configuration } from 'openai';
let openAi: OpenAIApi;

export const getModel = () => {
	const config = new Configuration({ apiKey: OPENAI_KEY });
	const Ai = new OpenAIApi(config);
	openAi = Ai;

	return openAi;
};

export { openAi };
