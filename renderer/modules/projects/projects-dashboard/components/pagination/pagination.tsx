import React, { useEffect } from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const MIN_ROWS = 10;
export const PAGINATION_MIN_ROWS = MIN_ROWS;

interface ProjectsPaginationProps {
  count: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (page: number) => void;
}

export default function ProjectsPagination(
  props: ProjectsPaginationProps
): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(MIN_ROWS);

  useEffect(() => {
    setRowsPerPage(rowsPerPage);
    setPage(0);
  }, [props.count]);

  const handleChangePage = (_: unknown, newPage: number) => {
    props.onPageChange(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const selectedRowsPerPage = parseInt(event.target.value);
    props.onRowsPerPageChange(selectedRowsPerPage);
    props.onPageChange(0);
    setRowsPerPage(selectedRowsPerPage);
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      labelRowsPerPage="Projects per page:"
      count={props.count}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPageOptions={[MIN_ROWS, 15, 20, 30]}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
