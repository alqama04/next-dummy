import { NextResponse, NextRequest } from "next/server";
import { connectSrt } from "@/utils/db";
import mongoose from "mongoose";
import { Location } from '@/utils/models/location'



export async function GET() {
    await mongoose.connect(connectSrt)
    let result = await Location.find({})
    return NextResponse.json({ result: result, success: true })

}
export async function POST(request) {

    await mongoose.connect(connectSrt)
    const payload = await request.json()
  
    console.log(payload)
    if (!payload.longitude) {
        return NextResponse.json({ message: "", success: false })
    }
    const location = await new Location({
        long: payload.longitude,
        latitude: payload.latitude,
        name: payload.name
    })

    await location.save()

    return NextResponse.json({ message: "Session Expired! Request The Payee to Reschedule it", success: true })
}