let images = [
  "https://via.placeholder.com/300x200?text=Default+1",
  "https://via.placeholder.com/300x200?text=Default+2",
  "https://via.placeholder.com/300x200?text=Default+3"
];

export default function handler(req, res) {
  // ✅ Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Handle GET
  if (req.method === "GET") {
    return res.status(200).json(images);
  }

  // ✅ Handle POST
  if (req.method === "POST") {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "Image URL is required" });
    }
    images.push(url);
    return res.status(201).json({ message: "Image added" });
  }

  // ✅ Handle DELETE
  if (req.method === "DELETE") {
    const { url } = req.body;
    images = images.filter(img => img !== url);
    return res.status(200).json({ message: "Image deleted" });
  }

  // ❌ Method Not Allowed
  return res.status(405).json({ message: "Method not allowed" });
}
