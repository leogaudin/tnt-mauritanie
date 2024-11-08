import { handle400Error, handle200Success, handle404Error } from '../errorHandlers.js';
import { requireApiKey } from '../apiKey.js';

export const deleteOne = (Model) => async (req, res) => {
	try {
		requireApiKey(req, res, async () => {
			const instance = await Model.findOneAndDelete({ id: req.params.id });

			if (!instance) {
				return handle404Error(res);
			}

			return handle200Success(res, instance);
		});
	} catch (error) {
		console.error(error);
		return handle400Error(res, error);
	}
};
