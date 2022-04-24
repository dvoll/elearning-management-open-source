import React from "react"
import { useColorMode, Switch, Flex, FormControl, FormLabel } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <FormControl display='flex' alignItems='center'>
      <FormLabel htmlFor='dark-mode-switch' mb='1'>
        Dark mode
      </FormLabel>
      <Switch
        id="dark-mode-switch"
        colorScheme="green"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
  </FormControl>
  )
}
