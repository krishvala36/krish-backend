let images = [
  "https://via.placeholder.com/300x200?text=Default+1",
  "https://via.placeholder.com/300x200?text=Default+2",
  "https://via.placeholder.com/300x200?text=Default+3"
];

export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(images);
  } else if (method === 'POST') {
    const { url } = req.body;
    if (url && !images.includes(url)) {
      images.push(url);
      res.status(201).json({ message: 'Image added' });
    } else {
      res.status(400).json({ message: 'Invalid or duplicate URL' });
    }
  } else if (method === 'DELETE') {
    const { url } = req.body;
    images = images.filter(img => img !== url);
    res.status(200).json({ message: 'Image deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
