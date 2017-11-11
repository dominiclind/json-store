/* 

	Notifiy all users when someone has done a workout.

	@user - user that has performed the workout
	@workout - details on that workout?

*/ 

import { createNotification } from '../../push';

export default function(req,res) {
	const { user, workout } = req.body;
	const { displayName } = user;

	createNotification(displayName)
	.then(response => {
		res.json({
			msg: 'success'
		});
	})
	.catch(error => {
		console.log(error);
	});
	
}