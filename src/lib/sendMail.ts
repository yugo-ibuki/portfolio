export interface IFormInputs {
  name: string
  belonging: string
  email: string
  content: string
}

export const sendMail = async (data: IFormInputs) => {
  try {
    const res = await fetch('/api/send', {
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        belonging: data.belonging,
        message: data.content
      }),
      headers: {
        'contentType': 'application/json'
      },
      method: 'POST'
    })
    console.log('メールが送信されました。')
    console.log(res.status)
  } catch(e) {
    console.error(e)
  }
}