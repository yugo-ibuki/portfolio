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
お問合せがありました。

名前: ${name}

メールアドレス: ${email}

所属: ${belonging}

内容: ${message}
`