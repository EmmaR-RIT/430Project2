import _ from 'underscore';
import mongoose from 'mongoose';

const setUser = (name) => _.escape(name).trim();


const SpeedrunSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		trim: true,
		set: setUser,
	},
	time: {

	},
	splits: {

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
	};
};
