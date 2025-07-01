import fetch from 'node-fetch';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const apiKey = process.env.API_KEY_511;
    const result = await fetch(`https://api.511.org/transit/TripUpdates?agency=RG&api_key=${apiKey}`);
    const text = await result.text();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching from 511 API');
  }
}
