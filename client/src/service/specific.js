// Here are all the country-specific configurations, to facilitate the process of adapting the application to a new country.

// TnT + name of the country + flag
export const name = 'TnT Mauritanie 🇲🇷';

export const colors = {
	lightest: '#FFF0ED',
	light: '#F79F97',
	main: '#D01C1F',
	dark: '#85040F',
	darkest: '#380008',
};

// The corresponding API URL
export const API_URL =
						process.env.NODE_ENV === 'development'
						?
						'http://localhost:3000/api'
						:
						'https://tnt-mauritanie-api.vercel.app/api';

// Fields that should be: displayed as information, or the full representation of the object
// Used in:
// - PDFExport.jsx
// - UploadBoxes.jsx
// - csv.js
// MUST MATCH boxFields VARIABLE IN server/models/boxes.model.js
export const boxFields = {
	project: { type: String, required: true },
	wilaya: { type: String, required: true },
	moughataa: { type: String, required: true },
	commune: { type: String, required: true },
	school: { type: String, required: true },
	htName: { type: String, required: false },
	htPhone: { type: String, required: false },
};

// Fields that characterize a school in the GPS update list
// Used in:
// - UpdateGPS.jsx
// - csv.js
export const gpsUpdateFields = [
	'school',
	'wilaya',
]

// Fields that characterize a school in the Delivery report
// Used in:
// - Report.jsx
export const reportFields = [
	'school',
	'wilaya',
]

// Keys that should not be available to the user (e.g. when filtering)
// Used in:
// - BoxFiltering.jsx
// - BoxModal.jsx
export const excludedKeys = [
	'_id',
	'__v',
	'id',
	'adminId',
	'scans',
	'schoolLatitude',
	'schoolLongitude',
	'statusChanges',
	'progress',
	'content',
	'lastScan',
	'packingListId',
];
