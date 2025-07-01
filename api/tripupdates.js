import fetch from 'node-fetch';

export default async function handler(req, res) {
  // 1) CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // 2) Fetch 511 data
  try {
    const key = process.env.API_KEY_511;
    const r = await fetch(`https://api.511.org/transit/TripUpdates?agency=RG&api_key=${key}`);
    if (!r.ok) throw new Error(`511 responded ${r.status}`);
    const text = await r.text();

    // 3) Return to client
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(text);
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).send("Error fetching 511 data");
  }
}
