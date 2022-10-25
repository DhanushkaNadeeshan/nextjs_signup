import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export default async function middleware(req) {

    const { cookies } = req;

    if (req.nextUrl.pathname.startsWith('/protect')) {

        if (!cookies.key) {

            return NextResponse.rewrite(new URL('/', req.url))

        } else {

            try {
                const { payload } = await jwtVerify(cookies.key, new TextEncoder().encode(process.env.KEY));
                // get user role using payload
                return NextResponse.next();

            } catch (error) {

                return NextResponse.rewrite(new URL('/', req.url));

            }


        }
    }

}

