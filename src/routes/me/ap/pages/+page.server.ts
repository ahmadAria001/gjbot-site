import { getRoutes } from '$lib/server/models/pages.models.js';

export const load = async ({ locals }) => {
	let parsedPage: any = [];
	try {
		const pagesData = (await getRoutes()).content;
		pagesData?.map(async (val: any) => {
			parsedPage.push({
				_id: val._id.toString(),
				title: val.title,
				path: val.path
			});
		});
	} catch (error) {
		throw error;
	}

	// parsedPage.push({
	// 	_id: val._id.toString(),
	// 	title: val.title,
	// 	path: val.path,
	// 	accessPermissions: val.accessPermissions,
	// 	updatePermissions: val.updatePermissions,
	// 	deletePermissions: val.deletePermissions,
	// 	userPermissions: val.userPermissions,
	// 	rolePermissions: val.rolePermissions,
	// 	disabledUserPermissions: val.disabledUserPermissions,
	// 	disabledRolePermissions: val.disabledRolePermissions
	// });

	return { pageData: parsedPage };
};
