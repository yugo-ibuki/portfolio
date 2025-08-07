'use server'

import * as sgMail from '@sendgrid/mail'
import { contentToSender } from '@lib/mailTemplate/toSender'
import { contentToMe } from '@lib/mailTemplate/toMe'

export interface IFormInputs {
  name: string
  belonging: string
  email: string
  content: string
}

export const sendMail = async (data: IFormInputs) => {
  // Fixed: Removed NEXT_PUBLIC_ prefix to keep API key server-side only
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY environment variable is not set.')
  }
  sgMail.setApiKey(apiKey)

  const msgToSender = makeMailSenderObject(data)
  const msgToMe = makeToMeMailObject(data)
  try {
    await sgMail.send(msgToSender)
    await sgMail.send(msgToMe)
  } catch (error) {
    // In production, you might want to use a proper logging service
    throw error
  }

  // No need to return NextResponse here as this is a server action
  // The client handles success/error through try/catch
}

const makeMailSenderObject = (data: IFormInputs) => ({
  to: data.email,
  from: 'support@y-ibuki91.app',
  subject: 'Thank you for contacting',
  text: contentToSender({
    name: data.name,
    email: data.email,
    belonging: data.belonging,
    message: data.content,
  }),
})

const makeToMeMailObject = (data: IFormInputs) => ({
  to: process.env.MY_EMAIL,
  from: 'support@y-ibuki91.app',
  subject: 'お問合せがありました。',
  text: contentToMe({
    name: data.name,
    email: data.email,
    belonging: data.belonging,
    message: data.content,
  }),
})
