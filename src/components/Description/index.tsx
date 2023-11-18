import type { FC, ReactNode } from 'react'
import { Box, HStack } from '@chakra-ui/react'

type Props = {
  children: ReactNode
  subtitle: string
}

export const Description: FC<Props> = ({ children, subtitle }) => {
  return (
    <Box className={'mt-[20px]'}>
      <Box className={'border-4 border-gray-400 p-[10px]'}>
        <HStack>
          <Box as={'span'}>at: </Box>
          <h2 className={'font-bold text-lg'}>{subtitle}</h2>
        </HStack>
      </Box>
      <Box className={'mt-[10px] p-[10px] text-xl'}>{children}</Box>
    </Box>
  )
}
