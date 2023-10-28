import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import type { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  disclosure: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }
}

export const Menu: FC<Props> = ({ children, disclosure }) => {
  const { isOpen, onOpen, onClose } = disclosure
  return (
    <div>
      <GiHamburgerMenu onClick={onOpen} width={80} />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
