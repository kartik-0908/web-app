import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import {  checkRole } from './utils/roles';
import { NextRequest, NextResponse } from 'next/server';
import { setRole } from '../lib/actions';


const isMemberRoute = createRouteMatcher(['/member(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);


export default clerkMiddleware((auth, req) => {

  const { sessionClaims } = auth()
  console.log("sessionClaims")
  console.log(sessionClaims)
  if (isMemberRoute(req) || isAdminRoute(req)) {
    auth().protect()
  }
  console.log("after checking auth")
  // console.log(checkRole("admin"))
  return middleware(
    req, sessionClaims?.metadata.role,
    sessionClaims?.metadata.shopDomain,
    sessionClaims?.sub
  );
});

const fetchRole = async (id: string): Promise<string | null> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/v1/user/get-role?id=${id}`;
  const maxAttempts = 5;
  const delay = 3000; // 3 seconds delay between attempts

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(endpoint);
      // console.log(response)
      if (response.ok) {
        console.log("repose ok")
        const data = await response.json();
        console.log(data)
        if (data.role === "admin") {
          return data.role;
        }
      }
    } catch (error) {
      console.error('Error fetching role:', error);
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return null;
};


async function middleware(request: NextRequest, role: any, shopDomain: string | undefined, id: any) {
  console.log(request.nextUrl.pathname)
  if (request.nextUrl.pathname === '/') {
    if (!role) {
      if (id) {
        return NextResponse.redirect(new URL(`/apply-changes?id=${id}`, request.url))
      }
      else if (!id) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }

    if (role === "admin") {
      return NextResponse.redirect(new URL('/admin/home', request.url))
    }
    else if (role === "member") {
      return NextResponse.redirect(new URL('/member/home', request.url))
    }
    else {
      return NextResponse.redirect(new URL('/role-not-found', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log("inside /admin")
    if (role !== "admin") {
      console.log("role admin notfound but")
      return NextResponse.redirect(new URL('/permission-denied', request.url))
    }
    else {
      console.log("found role admin")
      if (!shopDomain) {
        console.log("shop domain not found")
        return NextResponse.redirect(new URL(`/enter-details?id=${id}`, request.url))
      }
    }
  }
  else if (request.nextUrl.pathname.startsWith('/member')) {
    if (!checkRole("member")) {
      return NextResponse.redirect(new URL('/permission-denied', request.url))
    }
  }
}


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};