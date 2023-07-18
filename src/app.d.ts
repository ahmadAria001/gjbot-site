// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			errorId: string;
		}
		interface Locals {
			isInit: boolean | false;
			user: {
				username: string | null;
				email: string | null;
				avatar: string | null;
				id: string | null;
			};
		}
		interface PageData {
			authorized: boolean;
		}
		// interface Platform {}
	}
}

export {};
