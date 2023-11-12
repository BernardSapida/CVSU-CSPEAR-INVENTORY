import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  async afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();

    // console.log(auth)
    // console.log("req")
    // console.log(req)
    console.log(data)
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};