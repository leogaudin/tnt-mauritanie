import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Box = new Schema(
	{
		id: { type: String, required: true },
		project: { type: String, required: true },
		wilaya: { type: String, required: true },
		moughataa: { type: String, required: true },
		commune: { type: String, required: true },
		school: { type: String, required: true },
		htName: { type: String, required: false },
		htPhone: { type: String, required: false },
		adminId: { type: String, required: true },
		createdAt: { type: Date, required: true },
		scans: { type: Array, required: false },
		schoolLatitude: { type: Number, required: true},
		schoolLongitude: { type: Number, required: true},
		statusChanges: { type: Object, required: false },
	}
)

export default mongoose.model('boxes', Box);
