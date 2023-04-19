import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseError } from '@sendgrid/helpers/classes'
import { contentToSender } from '@lib/mailTemplate/toSender'
import { contentToMe } from '@lib/mailTemplate/toMe'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const sgMail = require('@sendgrid/mail')
    console.log(process.env.NEXT_PUBLIC_SENDGRID_KEY)
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
    const body = JSON.parse(req.body)

    const msgToSender = {
      to: body.email,
      from: 'support@y-ibuki91.app',
      subject: 'Thank you for contacting',
      text: contentToSender({ name: body.name, email: body.email, belonging: body.belonging, message: body.message }),
    }
    const msgToMe = {
      to: process.env.NEXT_PUBLIC_MY_EMAIL,
      from: body.email,
      subject: 'お問合せがありました。',
      text: contentToMe({ name: body.name, email: body.email, belonging: body.belonging, message: body.message }),
    }
    ;(async () => {
      try {
        await sgMail.send(msgToSender)
        await sgMail.send(msgToMe)
      } catch (error) {
        const err = error as ResponseError
        if (err.response) {
          console.error(err.response.body)
        }
        throw err
      }
    })()
  }

  res.status(200).end()
}

export default handler
