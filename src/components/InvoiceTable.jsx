
import { TablePagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { useState } from 'react';
import '../assets/styles/invoice-table.scss';

InvoiceTable.propTypes = {
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired
}

export default function InvoiceTable({ headers, rows }) {
    const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(5);

    function handleChangePage(event, newpage) {
        setpg(newpage);
    }

    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }
    return (
        <>
            <TableContainer className='fix-table-head' component="div">
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map(header => <TableCell key={header}>{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(pg * rpg, pg * rpg + rpg).map((row, i) => (
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
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}