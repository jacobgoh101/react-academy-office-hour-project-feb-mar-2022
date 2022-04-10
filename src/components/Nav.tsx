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
import { useAuth } from '../hooks/use-auth.hook';
import { RouterLink } from './router-link';

const avatarGenerator = new AvatarGenerator();

export default function Nav() {
  const { user, signOut } = useAuth();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <RouterLink href="/">Invoice App</RouterLink>
            </Box>
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
                  {user && <Box mr={3}>{user.name} </Box>}
                  {user && (
                    <Avatar
                      size={'sm'}
                      src={avatarGenerator.generateRandomAvatar(user.id)}
                    />
                  )}
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={(_) => signOut()}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
