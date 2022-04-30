import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseError } from '@sendgrid/helpers/classes'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
    const body = JSON.parse(req.body)

    const content = `
    お問合せを受け付けました。\r\n
    名前: ${body.name}\r\n
    メールアドレス: ${body.email}\r\n
    所属: ${body.belonging}\r\n
    内容: ${body.message}\r\n
    `
    const msgToSender = {
      to: body.email,
      from: 'support@y-ibuki91.app',
      subject: 'お問合せありがとうございました。',
      text: content,
      html: content,
    }
    const msgToMe = {
      to: process.env.NEXT_PUBLIC_MY_EMAIL,
      from: body.email,
      subject: 'お問合せがありました。',
      text: content,
      html: content,
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
      }
    })()
  }

  res.status(200)
}

export default handler
