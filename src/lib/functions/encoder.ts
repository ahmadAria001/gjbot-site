import Cryptr from 'cryptr';
import { SECRETS_ENCODER_KEY } from '$env/static/private';

const cryptr = new Cryptr(SECRETS_ENCODER_KEY, {
	pbkdf2Iterations: 10348,
	saltLength: 20
});

const encrypt = (target: string): string => {
	return cryptr.encrypt(target);
};
const dencrypt = (target: string): string => {
	return cryptr.decrypt(target);
};

export { encrypt, dencrypt };
