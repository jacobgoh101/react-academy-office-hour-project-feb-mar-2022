import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  chakra,
  Heading,
  Progress,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Column, useSortBy, useTable } from 'react-table';

export function DataTable<D extends object>(props: {
  columns: Column<D>[];
  data: D[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  sortable?: boolean;
}) {
  const {
    columns,
    data,
    isLoading,
    isError,
    errorMessage = 'Failed to Load Data',
    sortable = false,
  } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<D>(
      {
        columns,
        data,
        //@ts-ignore
        disableSortBy: !sortable,
      },
      useSortBy
    );

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // @ts-ignore
              <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <chakra.span pl="4">
                  {
                    // @ts-ignore
                    column.isSorted ? (
                      // @ts-ignore
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null
                  }
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {isLoading && (
          <Tr>
            <Td colSpan={columns.length}>
              <Progress my={20} size="xs" isIndeterminate />
            </Td>
          </Tr>
        )}
        {isError && (
          <Tr>
            <Td colSpan={columns.length}>
              <Heading
                size="md"
                my={20}
                textAlign={'center'}
                fontWeight={'bold'}
              >
                {errorMessage}
              </Heading>
            </Td>
          </Tr>
        )}
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
