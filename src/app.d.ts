// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			errorId: string;
		}
		interface Locals {
			isInit: boolean;
			user: {
				username: string | null;
				email: string | null;
				avatar: string | null;
				id: string | null;
				banner: string | null;
				banner_color: string | null;
			};
		}
		interface PageData {
			authorized: boolean;
		}
		// interface Platform {}
	}
}

export {};
