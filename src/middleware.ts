import { jwtVerify, importJWK } from "jose";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    let token = request.cookies.get("token")?.value as string;
    const pathname = request.nextUrl.pathname;
    console.log("pathname :>> ", pathname);

    if (pathname !== "/signin") {
      const secretJWK = {
        kty: "oct",
        k: process.env.JOSE_SECRET
      };

      const secretKey = await importJWK(secretJWK, "HS256");
      const { payload } = await jwtVerify(token, secretKey);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(
        "user",
        JSON.stringify({ username: payload.username })
      );

      const response = NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });

      return response;
    } else {
      if (token) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }
  } catch (error) {
    console.log("error", error);
    request.cookies.delete("token");
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/", "/[slug]", "/my-favorite"]
};
