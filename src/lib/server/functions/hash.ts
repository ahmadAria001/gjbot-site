// HearthlessEveryUnseenHope_1232141#@$@#(&*
import { SALT_ROUND } from '$env/static/private';
import bcrypt from 'bcrypt';

export const toHash = async (target: string) => {
	const salt = await bcrypt.genSalt(Number.parseInt(SALT_ROUND));
	const result = await bcrypt.hash(target, salt);

	return result;
};

export const compareHash = (target: string, hash: string) => {
	return bcrypt.compareSync(target, hash);
};
