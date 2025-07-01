import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Step 1: Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Step 2: Respond immediately to preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Step 3: Continue with fetch if it's a GET
  try {
    const apiKey = process.env.API_KEY_511;
    const apiRes = await fetch(`https://api.511.org/transit/TripUpdates?agency=RG&api_key=${apiKey}`);
    const data = await apiRes.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send('Error fetching 511 data');
  }
}
