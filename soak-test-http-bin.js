import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 400 }, // ramp up to 400 users
        { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
        { duration: '2m', target: 0 }, // scale down. (optional)
    ],
};

const API_BASE_URL = 'https://httpbin.org';

export default function () {
    http.batch([
        ['GET', `${API_BASE_URL}/get`],
        ['POST', `${API_BASE_URL}/post`, JSON.stringify({ data: 'example' }), { headers: { 'Content-Type': 'application/json' } }],
        ['PUT', `${API_BASE_URL}/put`, JSON.stringify({ data: 'example' }), { headers: { 'Content-Type': 'application/json' } }],
        ['DELETE', `${API_BASE_URL}/delete`],
    ]);

    sleep(1);
}
