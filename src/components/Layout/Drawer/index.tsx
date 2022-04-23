import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import type { FC } from 'react'

export const Menu: FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <GiHamburgerMenu onClick={onOpen} width={80} />
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
          <DrawerBody>
            { children }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}