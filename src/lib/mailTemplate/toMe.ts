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
You got a mail.\n

name: ${name}\n

email: ${email}\n

belonging: ${belonging}\n

content: ${message}\n
`