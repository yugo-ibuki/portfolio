import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseError } from '@sendgrid/helpers/classes'
import { contentToSender } from '@lib/mailTemplate/toSender'
import { contentToMe } from '@lib/mailTemplate/toMe'
import * as sgMail from '@sendgrid/mail'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY as string)
    const body = JSON.parse(req.body)

    const msgToSender = {
      to: body.email,
      from: 'support@y-ibuki91.app',
      subject: 'Thank you for contacting',
      text: contentToSender({ name: body.name, email: body.email, belonging: body.belonging, message: body.message }),
    }
    const msgToMe = {
      to: process.env.NEXT_PUBLIC_MY_EMAIL,
      from: 'support@y-ibuki91.app',
      subject: 'お問合せがありました。',
      text: contentToMe({ name: body.name, email: body.email, belonging: body.belonging, message: body.message }),
    }
    try {
      await sgMail.send(msgToSender)
      await sgMail.send(msgToMe)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  await res.status(200).end()
}

export default handler
