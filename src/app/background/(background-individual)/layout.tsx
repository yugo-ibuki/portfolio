import type { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

const BackgroundLayout: FC<Props> = ({ children }) => {
  return <Box className={'mt-[25px]'}>{children}</Box>
}

export default BackgroundLayout
