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
お問合せを受け付けました\n

名前: ${name}\n

メールアドレス: ${email}\n

所属: ${belonging}\n

内容: ${message}\n
`