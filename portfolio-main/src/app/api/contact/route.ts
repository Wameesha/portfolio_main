import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { firstName, lastName, email, contactNumber, subject, message } = body

        // Validate required fields
        if (!firstName || !lastName || !email || !subject || !message) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            )
        }

        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || 'wamandinumaneth@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
                        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Phone:</strong> ${contactNumber}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                    </div>
                    
                    <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
                        <h3 style="color: #374151; margin-top: 0;">Message</h3>
                        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 15px; background-color: #f9fafb; border-radius: 8px; font-size: 12px; color: #6b7280;">
                        <p>This email was sent from your portfolio contact form on ${new Date().toLocaleString()}.</p>
                        <p>Reply directly to this email to respond to ${firstName}.</p>
                    </div>
                </div>
            `,
            replyTo: email, // This allows you to reply directly to the person who contacted you
        }

        // Send email
        await transporter.sendMail(mailOptions)

        console.log('✅ Email sent successfully to wamandinumaneth@gmail.com')
        console.log(`📧 From: ${firstName} ${lastName} (${email})`)
        console.log(`📱 Phone: ${contactNumber}`)
        console.log(`📄 Subject: ${subject}`)
        console.log('---')

        return NextResponse.json({ 
            success: true, 
            message: 'Email sent successfully!' 
        })

    } catch (error) {
        console.error('❌ Email sending failed:', error)
        
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to send email. Please try again or contact me directly.' 
            },
            { status: 500 }
        )
    }
}
