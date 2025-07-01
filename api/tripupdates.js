import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_KEY_511;
    const response = await fetch(`https://api.511.org/transit/TripUpdates?agency=RG&api_key=${apiKey}`);
    const data = await response.text();

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).send(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send('Error fetching 511 data');
  }
}
