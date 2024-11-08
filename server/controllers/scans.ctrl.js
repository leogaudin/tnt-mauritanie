import Box from '../models/boxes.model.js';
import express from 'express'
import { generateId, isFinalDestination } from '../service/index.js';

const router = express.Router()

router.post('/scan', async (req, res) => {
	try {
		const { boxId, comment, operatorId, time, location, markedAsReceived } = req.body;

		const box = await Box.findOne({ id: boxId });

		if (!box)
			return res.status(404).json({ error: 'Box not found' });

		const schoolCoords = {
			latitude: box.schoolLatitude,
			longitude: box.schoolLongitude,
		};

		const scanCoords = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			accuracy: location.coords.accuracy
		};

		const newScan = {
			id: generateId(),
			comment,
			operatorId,
			location,
			time,
			markedAsReceived,
			finalDestination: isFinalDestination(schoolCoords, scanCoords),
		};

		box.scans = [...box.scans, newScan];
		await box.save();

		return res.status(200).json({ message: 'Scan added successfully', box });
	} catch (error) {
		console.error('Error adding scan:', error);
		return res.status(500).json({ error: 'An error occurred while adding the scan' });
	}
});

export default router;
