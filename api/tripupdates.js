import fetch from 'node-fetch';

const API_KEY_511 = process.env.API_KEY_511; // Set this in Vercel dashboard

export default async function handler(req, res) {
  try {
    const apiRes = await fetch(`https://api.511.org/transit/TripUpdates?agency=RG&api_key=${API_KEY_511}`);
    const data = await apiRes.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching 511 data');
  }
}
