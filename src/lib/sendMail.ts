'use server'

import * as sgMail from '@sendgrid/mail'
import { contentToSender } from '@lib/mailTemplate/toSender'
import { contentToMe } from '@lib/mailTemplate/toMe'
import { NextResponse } from 'next/server'

export interface IFormInputs {
  name: string
  belonging: string
  email: string
  content: string
}

export const sendMail = async (data: IFormInputs) => {
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY as string)

  const msgToSender = makeMailSenderObject(data)
  const msgToMe = makeToMeMailObject(data)
  try {
    await sgMail.send(msgToSender)
    await sgMail.send(msgToMe)
  } catch (error) {
    console.error(error)
    throw error
  }

  await NextResponse.json({ status: 'ok' })
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
  to: process.env.NEXT_PUBLIC_MY_EMAIL,
  from: 'support@y-ibuki91.app',
  subject: 'お問合せがありました。',
  text: contentToMe({
    name: data.name,
    email: data.email,
    belonging: data.belonging,
    message: data.content,
  }),
})
