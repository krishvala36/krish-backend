let images = [
  "https://via.placeholder.com/300x200?text=Default+1",
  "https://via.placeholder.com/300x200?text=Default+2",
  "https://via.placeholder.com/300x200?text=Default+3"
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(images);
  } else if (req.method === "POST") {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "URL is required" });
    images.push(url);
    res.status(201).json({ message: "Image added" });
  } else if (req.method === "DELETE") {
    const { url } = req.body;
    images = images.filter(img => img !== url);
    res.status(200).json({ message: "Image deleted" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
