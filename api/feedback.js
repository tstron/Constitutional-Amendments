/**
 * Vercel serverless function: accept feedback form submissions and store in MongoDB Atlas.
 * Set MONGODB_URI in Vercel environment variables.
 */

// eslint-disable-next-line no-undef
const { MongoClient } = require("mongodb");

const ALLOWED_ORIGINS = [
  "https://restorerepresentation.org",
  "https://www.restorerepresentation.org",
  "https://tstron.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:5500",
];

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_PER_IP = 3;

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function setCors(res, origin) {
  const allowOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

async function getCollection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  const client = new MongoClient(uri);
  if (global.mongodbClient) {
    return global.mongodbClient.db("restorerepresentation").collection("feedback");
  }
  await client.connect();
  global.mongodbClient = client;
  return client.db("restorerepresentation").collection("feedback");
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || "";
  setCors(res, origin);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { name, email, message, amendment, website } = body || {};

    // Honeypot: bots often fill hidden "website" field
    if (website) {
      res.status(400).json({ error: "Invalid submission." });
      return;
    }

    const nameTrim = typeof name === "string" ? name.trim() : "";
    const emailTrim = typeof email === "string" ? email.trim() : "";
    const messageTrim = typeof message === "string" ? message.trim() : "";

    if (!nameTrim || !emailTrim || !messageTrim) {
      res.status(400).json({ error: "Name, email, and message are required." });
      return;
    }

    if (messageTrim.length > 5000) {
      res.status(400).json({ error: "Message is too long." });
      return;
    }

    const ip = getClientIp(req);
    const collection = await getCollection();

    // Rate limit by IP
    const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
    const recentCount = await collection.countDocuments({
      ip,
      createdAt: { $gte: since },
    });
    if (recentCount >= RATE_LIMIT_MAX_PER_IP) {
      res.status(429).json({
        error: "Too many submissions from your address. Please try again later.",
      });
      return;
    }

    const doc = {
      name: nameTrim,
      email: emailTrim,
      message: messageTrim,
      amendment: amendment && typeof amendment === "string" ? amendment.trim() : null,
      ip,
      createdAt: new Date(),
    };

    await collection.insertOne(doc);
    res.status(201).json({ ok: true, message: "Thank you. Your feedback has been received." });
  } catch (err) {
    console.error("Feedback API error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
}
