import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from '@radix-ui/react-menubar';
import { Link } from 'react-router-dom';
interface Data {
     id: number;
     service_id: number;
     request_id: number;
     seller_id: number;
     price: number;
     description:string;
     status:string;
     action: JSX.Element;
}

function createData(
     id: number,
     service_id: number,
     seller_id: number,
     request_id: number,
     price: number,
     description:string,
     status:string,
     action: JSX.Element,
): Data {
     return {
          id,
          service_id,
          seller_id,
          action,
          request_id,
          price,
          description,
          status
     };
}

const Action = () => (
     <Menubar >
          <MenubarMenu>
               <MenubarTrigger className='font-bold text-[24px]'>...</MenubarTrigger>
               <MenubarContent style={{ position: 'relative', zIndex: 1000 }} className='bg-white shadow border w-[100px] text-start p-2 rounded pointer'>
                    <MenubarItem className='hover:bg-gray-700 transition duration-200 cursor-pointer hover:text-white p-2 rounded' >
                         <Link to={'/provider-manage/details'}>View</Link>
                    </MenubarItem>

                    <MenubarItem className='hover:bg-gray-700 transition duration-200 cursor-pointer hover:text-white p-2 rounded'>Delete</MenubarItem>
               </MenubarContent>
          </MenubarMenu>
     </Menubar>

)

// Dummy data
const rows = [
     createData(1,1,1,1,1,'description','Acc', <Action />),
     createData(1,1,1,1,1,'description','Acc', <Action />),
     createData(1,1,1,1,1,'description','Acc', <Action />),
     createData(1,1,1,1,1,'description','Acc', <Action />),

];



type Order = 'asc' | 'desc';



interface HeadCell {
     disablePadding: boolean;
     id: keyof Data;
     label: string;
     numeric: boolean;
}

const headCells: readonly HeadCell[] = [
     { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
     { id: 'service_id', numeric: true, disablePadding: false, label: 'User ID' },
     { id: 'seller_id', numeric: true, disablePadding: false, label: 'Basket ID' },
     { id: 'request_id', numeric: false, disablePadding: false, label: 'Payment Methode' },
     { id: 'price', numeric: true, disablePadding: false, label: 'Category ID' },
     { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
     { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
     { id: 'action', numeric: true, disablePadding: false, label: 'Manage Offers' },
];

interface EnhancedTableProps {
     numSelected: number;
     onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
     onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
     order: Order;
     orderBy: string;
     rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
     const { order, orderBy, onRequestSort } = props;
     const createSortHandler =
          (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
               onRequestSort(event, property);
          };

     return ( //head table
          <TableHead className="bg-[#F6F5F2] !font-bold">
               <TableRow>
                    <TableCell padding="checkbox">

                    </TableCell>
                    {headCells.map((headCell) => (
                         <TableCell
                              key={headCell.id}
                              align={headCell.numeric ? 'center' : 'left'}
                              padding={headCell.disablePadding ? 'none' : 'normal'}
                              sortDirection={orderBy === headCell.id ? order : false}
                              sx={{ fontWeight: 'bold', backgroundColor: '#F6F5F2' }}
                         >
                              <TableSortLabel
                                   active={orderBy === headCell.id}
                                   direction={orderBy === headCell.id ? order : 'asc'}
                                   onClick={createSortHandler(headCell.id)}
                              >
                                   {headCell.label}
                                   {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                             {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                   ) : null}
                              </TableSortLabel>
                         </TableCell>
                    ))}
               </TableRow>
          </TableHead>
     );
}

interface DataTableProviderProps {
     numSelected: number;
     onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function DataTableProvider(props: DataTableProviderProps) {
     const { numSelected, onSearchChange } = props;

     return (
          <Toolbar
               sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: (theme) =>
                         numSelected > 0
                              ? alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                              : 'inherit',
               }}
          >
               <Box display="flex" alignItems="center" justifyContent={'space-between'} gap={2}>
                    {numSelected > 0 ? (
                         <Typography color="inherit" variant="subtitle1" component="div">
                              {numSelected} selected
                         </Typography>
                    ) : (
                         <Typography variant="h6" id="tableTitle" component="div">
                              Data Account Providers
                         </Typography>
                    )}

               </Box>
               {numSelected > 0 ? (
                    <Tooltip title="Delete">
                         <IconButton>
                              <DeleteIcon />
                         </IconButton>
                    </Tooltip>
               ) : (
                    <TextField
                         variant="outlined"
                         size="small"
                         placeholder="Search..."
                         onChange={onSearchChange}
                    />
               )}
          </Toolbar>
     );
}

export default function DataTableOffer() {
     const [order, setOrder] = React.useState<Order>('asc');
     const [orderBy, setOrderBy] = React.useState<keyof Data>('service_id');
     const [selected, setSelected] = React.useState<readonly number[]>([]);
     const [page, setPage] = React.useState(0);
     const [dense, setDense] = React.useState(false);
     const [rowsPerPage, setRowsPerPage] = React.useState(5);
     const [searchQuery, setSearchQuery] = React.useState('');

     const handleRequestSort = (
          event: React.MouseEvent<unknown>,
          property: keyof Data,
     ) => {
          const isAsc = orderBy === property && order === 'asc';
          setOrder(isAsc ? 'desc' : 'asc');
          setOrderBy(property);
     };

     const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
               const newSelected = rows.map((n) => n.id);
               setSelected(newSelected);
               return;
          }
          setSelected([]);
     };


     const handleChangePage = (event: unknown, newPage: number) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (
          event: React.ChangeEvent<HTMLInputElement>,
     ) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(event.target.value);
     };

     const filteredRows = rows.filter(
          (row) =>
               row.id.toString().includes(searchQuery.toLowerCase()) ||
               row.service_id.toString().includes(searchQuery.toLowerCase()) ||
               row.seller_id.toString().includes(searchQuery.toLowerCase()) ||
               row.request_id.toString().includes(searchQuery.toLowerCase()) ||
               row.description.toString().includes(searchQuery.toLowerCase()) ||
               row.status.toString().includes(searchQuery.toLowerCase()) ||
               row.price.toString().includes(searchQuery),
     );


     const emptyRows =
          page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;


     //load data
     return (
          <Box sx={{ width: '100%' }}>
               <Paper sx={{ width: '100%', mb: 2 }}>
                    <DataTableProvider numSelected={selected.length} onSearchChange={handleSearchChange} />
                    <TableContainer>
                         <Table
                              sx={{ minWidth: 750 }}
                              aria-labelledby="tableTitle"
                              size={dense ? 'small' : 'medium'}
                         >
                              <EnhancedTableHead
                                   numSelected={selected.length}
                                   order={order}
                                   orderBy={orderBy}
                                   onSelectAllClick={handleSelectAllClick}
                                   onRequestSort={handleRequestSort}
                                   rowCount={filteredRows.length}
                              />
                              <TableBody>
                                   {filteredRows.length > 0 ? (
                                        filteredRows
                                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                             .map((row, index) => {

                                                  const labelId = `enhanced-table-checkbox-${index}`;

                                                  return (
                                                       <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.id}
                                                       >
                                                            <TableCell padding="checkbox">
                                                            </TableCell>
                                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                                 {row.id}
                                                            </TableCell>
                                                            <TableCell align="center">{row.service_id}</TableCell>
                                                            <TableCell align="center">{row.seller_id}</TableCell>
                                                            <TableCell align="center">{row.request_id}</TableCell>
                                                            <TableCell align="center">{row.price}</TableCell>
                                                            <TableCell align="center">{row.description}</TableCell>
                                                            <TableCell align="center">{row.status}</TableCell>
                                                            <TableCell align="center">{row.action}</TableCell>
                                                       </TableRow>
                                                  );
                                             })
                                   ) : (
                                        <TableRow>
                                             <TableCell colSpan={6} align="center">
                                                  Data Not Found
                                             </TableCell>
                                        </TableRow>
                                   )}
                                   {emptyRows > 0 && (
                                        <TableRow
                                             style={{
                                                  height: (dense ? 33 : 53) * emptyRows,
                                             }}
                                        >
                                             <TableCell colSpan={6} />
                                        </TableRow>
                                   )}
                              </TableBody>

                         </Table>
                    </TableContainer>
                    <TablePagination
                         rowsPerPageOptions={[5, 10, 25]}
                         component="div"
                         count={filteredRows.length}
                         rowsPerPage={rowsPerPage}
                         page={page}
                         onPageChange={handleChangePage}
                         onRowsPerPageChange={handleChangeRowsPerPage}
                    />
               </Paper>
               <FormControlLabel
                    control={<Switch checked={dense} onChange={(event) => setDense(event.target.checked)} />}
                    label="Dense padding"
               />
          </Box>
     );
}
