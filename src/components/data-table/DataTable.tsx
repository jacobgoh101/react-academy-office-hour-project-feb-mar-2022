import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box,
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
import { Column, Row, useSortBy, useTable } from 'react-table';
import { useLocation } from 'wouter';
import { TableData } from '../../types/listing.types';
import { StandardErrorMessage } from '../StandardErrorMessage';

export function DataTable<D extends TableData>(props: {
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
  const [_, setLocation] = useLocation();

  function handleRowClick(row: Row<D>) {
    return () => row.original.rowHref && setLocation(row.original.rowHref);
  }

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
    <Box overflowX="auto">
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
                <StandardErrorMessage>{errorMessage}</StandardErrorMessage>
              </Td>
            </Tr>
          )}
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onClick={handleRowClick(row)}
                cursor={row.original.rowHref ? 'pointer' : undefined}
              >
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
