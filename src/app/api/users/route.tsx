import { NextResponse } from 'next/server'
import { db } from '@/lib/db/index'

export async function GET(req: Request) {
    const data = await db.users.findMany();

    return NextResponse.json({ data })
}