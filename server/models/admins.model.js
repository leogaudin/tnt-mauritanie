import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Admin = new Schema(
	{
		id: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		apiKey: { type: String, required: true },
		displayName: { type: String, required: true },
		createdAt: { type: Date, required: true },
		publicInsights: { type: Boolean, required: true },
	}
)

export default mongoose.model('admins', Admin);
