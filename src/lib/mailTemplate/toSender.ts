export const contentToSender = ({
  name,
  email,
  belonging,
  message
}: {
  name: string
  email: string
  belonging: string
  message: string
}) => `
お問合せを受け付けました。

名前: ${name}

メールアドレス: ${email}

所属: ${belonging}

内容: ${message}
`