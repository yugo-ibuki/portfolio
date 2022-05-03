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
The mail is sent. Please wait for the reply.\n

name: ${name}\n

email: ${email}\n

belonging: ${belonging}\n

content: ${message}\n
`