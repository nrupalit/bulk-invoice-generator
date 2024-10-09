
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

InvoiceTable.propTypes = {
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
}

export default function InvoiceTable({ headers, rows }) {
    const [page, setPage] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return (
        <>
            <TableContainer className='fixedhead' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow
                                key={i}
                            >
                                {headers.map((header, idx) => {
                                    return <TableCell key={idx}>{row[header]}</TableCell>
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={10}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </TableContainer>
        </>
    );
}