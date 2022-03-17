import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { AvatarGenerator } from 'random-avatar-generator';

const avatarGenerator = new AvatarGenerator();

export default function Nav() {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>Invoice App</Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Flex alignItems={'center'}>
                  <Box mr={3}>Username </Box>
                  <Avatar
                    size={'sm'}
                    // TODO: use user ID to generate avatar
                    src={avatarGenerator.generateRandomAvatar('2')}
                  />{' '}
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
