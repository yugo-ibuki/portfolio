export const contentToMe = ({
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
お問合せがありました。\n

名前: ${name}\n

メールアドレス: ${email}\n

所属: ${belonging}\n

内容: ${message}\n
`