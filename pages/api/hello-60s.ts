// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  time: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Cache-Control", "s-maxage=60");
  res
    .status(200)
    .json({ name: "John Doe", time: Math.floor(new Date().getTime() / 1000) });
}
