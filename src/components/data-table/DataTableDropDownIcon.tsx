import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export function DataTableDropDownIcon(props: { children: ReactNode }) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BsThreeDotsVertical />}
        variant={'outline'}
        onClick={(e) => e.stopPropagation()}
      />
      <MenuList onClick={(e) => e.stopPropagation()}>{props.children}</MenuList>
    </Menu>
  );
}
