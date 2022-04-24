import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  usePagination,
} from '@ajna/pagination';
import {
  ArrowUpDownIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
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
import { useEffect } from 'react';
import { Column, Row, SortingRule, useSortBy, useTable } from 'react-table';
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
  onSort?: (sortBy: SortingRule<D>) => void;
  pagination?: ReturnType<typeof usePagination>;
}) {
  const {
    columns,
    data,
    isLoading,
    isError,
    errorMessage = 'Failed to Load Data',
    sortable = false,
    onSort,
    pagination,
  } = props;
  const [_, setLocation] = useLocation();

  function handleRowClick(row: Row<D>) {
    return () => row.original.rowHref && setLocation(row.original.rowHref);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: {
      //@ts-ignore
      sortBy,
    },
  } = useTable<D>(
    {
      columns,
      data,
      //@ts-ignore
      disableSortBy: !sortable,
      manualSortBy: true,
      disableMultiSort: true,
    },
    useSortBy
  );

  useEffect(() => {
    onSort?.(sortBy[0]);
  }, [sortBy]);

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
                      ) : (
                        // @ts-ignore
                        !column.disableSortBy && (
                          <ArrowUpDownIcon aria-label="sortable" />
                        )
                      )
                    }
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {isLoading ? (
            <Tr>
              <Td colSpan={columns.length}>
                <Progress my={20} size="xs" isIndeterminate />
              </Td>
            </Tr>
          ) : !rows.length ? (
            <Tr>
              <Td colSpan={columns.length}>
                <Heading
                  size="md"
                  my={20}
                  textAlign={'center'}
                  fontWeight={'bold'}
                >
                  No data available
                </Heading>
              </Td>
            </Tr>
          ) : (
            rows.map((row) => {
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
            })
          )}
          {isError && (
            <Tr>
              <Td colSpan={columns.length}>
                <StandardErrorMessage>{errorMessage}</StandardErrorMessage>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {pagination && (
        <Pagination
          pagesCount={pagination.pagesCount}
          currentPage={pagination.currentPage}
          onPageChange={pagination.setCurrentPage}
        >
          <PaginationContainer justify={'center'} mt={6}>
            <PaginationPrevious mx={1}>Previous</PaginationPrevious>
            <PaginationPageGroup>
              {pagination.pages.map((page: number) => (
                <PaginationPage
                  px={4}
                  mx={1}
                  key={`pagination_page_${page}`}
                  page={page}
                  colorScheme={
                    page === pagination.currentPage ? 'blue' : undefined
                  }
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext mx={1}>Next</PaginationNext>
          </PaginationContainer>
        </Pagination>
      )}
    </Box>
  );
}
