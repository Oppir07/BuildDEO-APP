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
import { Eye, PencilLine, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Data {
     id: number;
     category_name: string;
     created_at: string;
     action: JSX.Element;
}

function createData(
     id: number,
     category_name: string,
     created_at: string,
     action: JSX.Element,
): Data {
     return {
          id,
          category_name,
          created_at,
          action,
     };
}

const ActionButtons = () => (
     <div style={{ display: 'flex', gap: '10px' }}>
       <button
          onClick={showModalDetail}
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
       <button
         style={{
           backgroundColor: '#FFA500',
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
         <PencilLine color="white" size={20} />
       </button>
       <button
          onClick={showConfirmationModal}
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
         <Trash2 color="white" size={20} />
       </button>
     </div>
   );

const showConfirmationModal = async () => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "Are you sure want to delete this category?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#2FB142',
          cancelButtonColor: '#808080',
          confirmButtonText: 'Delete'
        });
      
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Category successfully deleted.',
            'success'
          );
        }
      };

const showModalDetail = () => {
  Swal.fire({
    title: '<strong>Painters</strong>',
    html: `
      <p style="margin: 0; color: #333;">17 Jan 2025, 17:04<br></br></p>
      <p style="margin: 0; color: #333; text-align: left;"><strong>Total Surface Area to Be Painted: </strong>Helps in estimating the amount of paint and labor required.</p>
      <p style="margin: 0; color: #333; text-align: left;"><strong>Type of Surfaces:</strong> Different surfaces (e.g., drywall, wood, metal) require specific preparation and paint types.</p>
      <p style="margin: 0; color: #333; text-align: left;"><strong>Condition of Surfaces:</strong> Identifying issues like peeling paint, cracks, or mold informs necessary prep work like sanding or priming.</p>
      <p style="margin: 0; color: #333; text-align: left;"><strong>Color Choices and Finishes:</strong> Determines the type of paint and number of coats needed.</p>
      <p style="margin: 0; color: #333; text-align: left;"><strong>Special Techniques:</strong> Techniques like faux finishes or murals may require specialized skills or additional time.</p>
      <p style="margin: 0; color: #333; text-align: left;"><strong>Preferred Paint Brands or Eco-friendly Options:</strong> Some clients may have brand preferences or desire low-VOC paints.</p>
      <p style="margin: 0; color: #333; text-align: left;"><strong>Project Timeline and Access Availability:</strong> Scheduling ensures minimal disruption to the client's routine.</p>
    `,
    confirmButtonText: 'OK',
    background: '#fff',
    confirmButtonColor: '#2FB142',
    customClass: {
      title: 'swal-title',
      htmlContainer: 'swal-text'
    },
    width: 600,
    padding: '3em',
    color: '#333',
    showCloseButton: true
  });
};




// Dummy data
const rows = [
     createData(1,'Painters','17 Jan 2025, 17:04', <ActionButtons />),
     createData(1,'Floor Layer','17 Jan 2025, 17:04', <ActionButtons />),
     createData(1,'Drywaller','17 Jan 2025, 17:04', <ActionButtons />),
     createData(1,'Heating installer','17 Jan 2025, 17:04', <ActionButtons />),

];


type Order = 'asc' | 'desc';

interface HeadCell {
     disablePadding: boolean;
     id: keyof Data;
     label: string;
     numeric: boolean;
}

const headCells: readonly HeadCell[] = [
     { id: 'category_name', numeric: true, disablePadding: false, label: 'Category Name' },
     { id: 'created_at', numeric: true, disablePadding: false, label: 'Created At' },
     { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
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
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                         <TextField
                              variant="outlined"
                              size="small"
                              placeholder="Search..."
                              onChange={onSearchChange}
                         />
                         <Link to={'/admin-add-category'}>
                              <button
                                   style={{
                                        backgroundColor: '#E31E24',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '8px 16px',
                                        cursor: 'pointer',
                                        fontSize: '16px'
                                   }}
                              >
                                   + Add category
                              </button>
                         </Link>
                    </div>
               )}
          </Toolbar>
     );
}

export default function DataTableManageService() {
     const [order, setOrder] = React.useState<Order>('asc');
     const [orderBy, setOrderBy] = React.useState<keyof Data>('category_name');
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
               row.category_name.toString().includes(searchQuery.toLowerCase()) ||
               row.created_at.toString().includes(searchQuery.toLowerCase())
     );


     const emptyRows =
          page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

     const location = useLocation();

     useEffect(() => {
          if (location.state?.categoryAdded) {
               Swal.fire({
                    title: 'Success!',
                    text: 'Category has been successfully added.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
               });
          }
     }, [location.state]);

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
                                                            <TableCell align="left">{row.category_name}</TableCell>
                                                            <TableCell align="left">{row.created_at}</TableCell>
                                                            <TableCell align="left">{row.action}</TableCell>
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
