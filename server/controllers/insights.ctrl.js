import express from 'express';
import Admin from '../models/admins.model.js';
import Box from '../models/boxes.model.js';
import { requireApiKey } from '../service/apiKey.js';
import { handle200Success } from '../service/errorHandlers.js';
import { sampleToTimeline } from '../service/stats.js';

const router = express.Router();

router.post('/insights', async (req, res) => {
	try {
		const { id, publicInsights } = req.body;
		if (typeof publicInsights !== 'boolean')
			return res.status(400).json({ message: 'Missing publicInsights' });

		const admin = await Admin.findOne({ id });
		if (!admin)
			return res.status(404).json({ message: 'Admin not found' });

		admin.publicInsights = publicInsights;
		await admin.save();
		return res.status(200).json({ message: 'Successfully set insights to ' + publicInsights });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.get('/insights/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const admin = await Admin.findOne({ id });
		if (!admin)
			return res.status(404).json({ message: 'Admin not found' });

		return res.status(200).json({ publicInsights: admin.publicInsights });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

router.get('/timeline', async (req, res) => {
	const { id, filters } = req.body;
	const user = Admin.findOne({ id });

	const apiKeyRequired = !user.publicInsights;

	const getTimeline = () => {
		const boxes = Box.find({ ...filters });
		return handle200Success(res, sampleToTimeline(boxes));
	}

	if (apiKeyRequired) {
		return requireApiKey(req, res, getTimeline);
	} else {
		return getTimeline();
	}
});

export default router;