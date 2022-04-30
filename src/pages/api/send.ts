import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseError } from '@sendgrid/helpers/classes'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_KEY)
    const body = JSON.parse(req.body)

    const msg = {
      to: body.email,
      from: 'support@example.com',
      subject: 'お問合せありがとうございました。',
      text: 'お問合せを受け付けました。回答をお待ちください。' + req.body.message,
      html: 'お問合せを受け付けました。回答をお待ちください。' + req.body.message,
    }
    console.log(msg)
    ;(async () => {
      try {
        const res = await sgMail.send(msg)
        console.log(res)
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
