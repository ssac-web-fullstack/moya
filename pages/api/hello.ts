// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  name: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    console.log(req.body.title);
    await axios.post('http://localhost:3001/api/0.1/chat', {
      title: req.body.title,
    });
  }
  // res.status(200).json({ name: 'John Doe' });
}
export default handler;
