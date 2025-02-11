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
import { Link } from 'react-router-dom';
import { Eye, Send , FileUp } from 'lucide-react';
interface Data {
     id: number;
     name: string;
     file: JSX.Element;
     price: string;
     created_at: string;
     status: string;
     action: JSX.Element;
}

function createData(
     id: number,
     name: string,
     file: JSX.Element,
     price: string,
     created_at: string,
     status: string,
     action: JSX.Element,
): Data {
     return {
          id,
          name,
          file,
          price,
          created_at,
          status,
          action,
     };
}

const ActionButtons = () => (
     <div style={{ display: 'flex', gap: '10px' }}>
       <Link to={'/admin-manage-detail-guest-offers'}>
       <button
         style={{
           backgroundColor: '#00CFFF',
           border: 'none',
           borderRadius: '8px',
           width: '40px',
           height: '40px',
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           cursor: 'pointer',
         }}
       >
         <Eye color="white" size={20} />
       </button>
       </Link>
       <button
         style={{
           backgroundColor: '#FF4500',
           border: 'none',
           borderRadius: '8px',
           width: '40px',
           height: '40px',
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           cursor: 'pointer',
         }}
       >
         <Send color="white" size={20} />
       </button>
     </div>
   );

const OfferFileIcon: React.FC = () => {
     const styles: React.CSSProperties = {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       width: '40px',
       height: '40px',
       borderRadius: '8px',
       backgroundColor: '#FFECEC',
       cursor: 'pointer',
     };
   
     return (
       <div style={styles}>
         <FileUp color="#FF0000" size={24} />
       </div>
     );
   };

const StatusLabel: React.FC<{ status: string }> = ({ status }) => {
     if(status == 'Done'){
          const styles: React.CSSProperties = {
               display: 'inline-block',
               padding: '5px 10px',
               borderRadius: '8px',
               color: '#4CAF50',
               fontWeight: 'bold',
               fontSize: '14px',
               textAlign: 'center' as const,
             };
          return <span style={styles}>{status}</span>;
     }else if(status == 'On Progress'){
          const styles: React.CSSProperties = {
               display: 'inline-block',
               padding: '5px 10px',
               borderRadius: '8px',
               color: '#FA7A5D',
               fontWeight: 'bold',
               fontSize: '14px',
               textAlign: 'center' as const,
             };
          return <span style={styles}>{status}</span>;
     }
   };

// Dummy data
const rows = [
     createData(1, 'Edward Panjaitan', <OfferFileIcon/>, '357', '17 Jan 2025, 17:04', 'Done', <ActionButtons />),
     createData(1, 'William Situmorang', <OfferFileIcon/>, '357', '17 Jan 2025, 17:04', 'Done',<ActionButtons />),
     createData(1, 'Josep Napitupulu', <OfferFileIcon/>,'321', '17 Jan 2025, 17:04', 'Done', <ActionButtons />),
     createData(1, 'Gilbert Marpaung', <OfferFileIcon/>, '350','17 Jan 2025, 17:04', 'Done', <ActionButtons />),
];


type Order = 'asc' | 'desc';



interface HeadCell {
     disablePadding: boolean;
     id: keyof Data;
     label: string;
     numeric: boolean;
}

const headCells: readonly HeadCell[] = [
     { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
     { id: 'file', numeric: true, disablePadding: false, label: 'Offer File' },
     { id: 'price', numeric: true, disablePadding: false, label: 'Offer Price' },
     { id: 'created_at', numeric: true, disablePadding: false, label: 'Register At' },
     { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
     { id: 'action', numeric: true, disablePadding: false, label: 'Manage Account' },
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
                              align={headCell.numeric ? 'left' : 'left'}
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

export default function DataTableGuestOffers() {
     const [order, setOrder] = React.useState<Order>('asc');
     const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
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
               row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.created_at.toString().includes(searchQuery),
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
                                                                 {row.name}
                                                            </TableCell>
                                                            <TableCell>{row.file}</TableCell>
                                                            <TableCell>{row.price}€</TableCell>
                                                            <TableCell>{row.created_at}</TableCell>
                                                            <TableCell><StatusLabel status={row.status}/></TableCell>
                                                            <TableCell>{row.action}</TableCell>
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
