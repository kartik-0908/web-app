import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';


const isMemberRoute = createRouteMatcher(['/member(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);


export default clerkMiddleware((auth, req) => {

  const { sessionClaims } = auth()
  console.log("sessionClaims")
  console.log(sessionClaims)
  if(!sessionClaims){
    return NextResponse.redirect('/sign-in')
  }

  if (isMemberRoute(req) || isAdminRoute(req)) {
    auth().protect()
  }
  console.log("after checking auth")
  // console.log(checkRole("admin"))
  return middleware(
    req, sessionClaims?.metadata.role,
    sessionClaims?.metadata.shopDomain,
  );
});

async function middleware(request: NextRequest, role: any, shopDomain: string | undefined) {
  console.log(request.nextUrl.pathname)
  if (request.nextUrl.pathname === '/integration') {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname === '/') {
    const url = new URL(request.url);
    console.log("url")
    const shop = url.searchParams.get('shop');
    // const code = url.searchParams.get('code');

    // If 'shop' and 'code' query params are present, allow the user to proceed
    if (shop) {
      return NextResponse.next();
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
      return NextResponse.next()
    }
  }
  else if (request.nextUrl.pathname.startsWith('/member')) {
    if (role != "member") {
      return NextResponse.redirect(new URL('/permission-denied', request.url))
    }
  }
  return NextResponse.next();
}


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};