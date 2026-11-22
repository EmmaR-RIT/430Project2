import _ from 'underscore';
import mongoose from 'mongoose';

const sanitizeInput = (string) => _.escape(string).trim();


const SpeedrunSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		trim: true,
		set: sanitizeInput,
	},
	game: {
		type: String,
		required: true,
		trim: true,
		set: sanitizeInput,
	},
	time: {
		type: Number,
		min: 0,
		required: true,
	},
	videoLink: {
		type: String,
		required: true,
		trim: true,
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account',
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
});


SpeedrunSchema.statics.toAPI = (doc) => {
	return {
		user: doc.user,
		game: doc.game,
		time: doc.time,
	};
};


const SpeedrunModel = mongoose.model('Speedrun', SpeedrunSchema);
export default SpeedrunModel;
