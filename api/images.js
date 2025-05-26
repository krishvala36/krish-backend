let images = [
  "https://via.placeholder.com/300x200?text=Default+1",
  "https://via.placeholder.com/300x200?text=Default+2",
  "https://via.placeholder.com/300x200?text=Default+3"
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(images);
  } 
  else if (req.method === 'POST') {
    const { url } = req.body;
    if (url && !images.includes(url)) {
      images.push(url);
      return res.status(201).json({ message: 'Image added' });
    } else {
      return res.status(400).json({ message: 'Invalid or duplicate URL' });
    }
  } 
  else if (req.method === 'DELETE') {
    const { url } = req.body;
    const index = images.indexOf(url);
    if (index !== -1) {
      images.splice(index, 1);
      return res.status(200).json({ message: 'Image deleted' });
    } else {
      return res.status(404).json({ message: 'Image not found' });
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
