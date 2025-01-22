import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_vercel|.*\\..*|bsky|signal|contact|email|discord|mxm|twitter|youtube|github|it-never-ends|linkedin|once-ui|resume|spotify|soultaker|termux|termuxdl|.well-known).*)',
    '/(en|id)/:path*',
  ],
};