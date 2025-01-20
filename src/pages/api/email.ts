import { NextApiRequest, NextApiResponse } from 'next';
import { Email } from '@/app/resources/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(302, `mailto:${Email}`);
}