import React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  Flex,
  Box
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon, AddIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, useRowSelect } from "react-table";

import { deleteTodo } from "../../slices/todoSlice";

export default function Todo() {
  const data = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const route = useRouter();

  const deleteTodos = (id) => {
    dispatch(deleteTodo(id));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (row) => (
          <div>
            <Button
              colorScheme="red"
              onClick={(e) => deleteTodos(row.row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const handleClick = () => {
    route.push('/todo/add-todo');
  }

  return (
    <Flex width="full" mt={4}>
      <Box width="full">
      <Button leftIcon={<AddIcon />} colorScheme="green" ml={1} onClick={() => handleClick()}>Add New</Button>
      <Table variant="striped" {...getTableProps()} mt={2}>
        <Thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <Tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumn } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  return (
                    <Th key={key} {...restColumn}>
                      {column.render("Header")}
                      <chakra.span pl="4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <Tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, restCellProps } = cell.getCellProps();
                  return (
                    <Td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      </Box>
    </Flex>
  );
}
