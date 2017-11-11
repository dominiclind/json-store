import axios from 'axios';


const API_URL = 'https://onesignal.com/api/v1';
const APP_ID = '50cd6f81-07ff-4084-a796-f2b2cc62eef0';

const codePushApi = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
  	"Content-Type": "application/json; charset=utf-8",
  	"Authorization": "Basic ZTE4OGVlYWQtYTJkOS00YWU0LWEyZjMtMGJhMjkzZWZhYzY0"
  }
});

export const createNotification = (from, to) => {
	return codePushApi.post('/notifications', {
	  app_id: APP_ID,
	  contents: {"en": `🏆 - ${from} just finished a workout!`},
	  included_segments: ["All"]
	});
}