// // app/api/contact/route.js (or route.ts)

// import {  NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const body = await req.json();
    console.log("Parsed body:", body);
    const { name, email, message } = body;
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail", // or 'hotmail', etc., if you're not using Gmail
            auth: {
                user: process.env.EMAIL_USER!,
                pass: process.env.EMAIL_PASS!,
            },
        });

        console.log("Transporter created");

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER!,
            subject: `New message from ${name}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent:", result);

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in email route:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
