import '@tanstack/react-start/server-only'

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
  sgMail.setApiKey(process.env.SENDGRID_KEY as string)

  const msgToSender = makeMailSenderObject(data)
  const msgToMe = makeToMeMailObject(data)
  try {
    await sgMail.send(msgToSender)
    await sgMail.send(msgToMe)
  } catch (error) {
    console.error(error)
    throw error
  }

  return Response.json({ status: 'ok' })
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
