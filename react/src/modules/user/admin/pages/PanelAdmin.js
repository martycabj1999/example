import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TableSortLabel
} from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { stableSort, getSorting } from './tablefunctions'
import { Container, Typography, Box, Divider } from '@material-ui/core'
import IconInactive from '@material-ui/icons/RemoveCircleOutline'
import IconActive from '@material-ui/icons/CheckCircleOutline'
import Modal from '../components/Modal'
import { green, red } from "@material-ui/core/colors"
import ModalUpdatePassword from '../components/ModalUpdatePassword'
import { RepositoryFactory } from '../../../../repositories/RepositoryFactory'

const userRepository = RepositoryFactory.get('user')

function EnhancedTableHead(props) {

  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: "name",
      disableOrder: true,
      label: "Name"
    },
    { id: "email", disableOrder: false, label: "Email" },
    { id: "phone", disableOrder: false, label: "Phone" },
    { id: "role", disableOrder: false, label: "Role" },
    { id: "state", disableOrder: false, label: "State" },
    { id: "options", disableOrder: true, label: "Actions" },
  ];


  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  iconActive: {
    color: green[500],
  },
  iconInactive: {
    color: red[500],
  },
  typography: {
    margin: theme.spacing(2, 2, 2, 0),
  },
  box: {
    padding: theme.spacing(0, 2, 2, 0),
  },
}));

export default function PanelAdmin() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("username");
  const [page, setPage] = React.useState(0);
  const dense = true; //cambiar a false para tener modificar el tamaño de la tabla
  const rowsPerPage = 5
  const [users, setUsers] = React.useState([])
  const [dataSuccess, setDataSucess] = React.useState(false)

  useEffect(() => {
    fetchUsersAndRoles();
  }, []);

  const fetchUsersAndRoles = async () => {
    let response = await userRepository.getUsers()
    setUsers(response);
    setDataSucess(true);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const addUser = user => {
    setUsers([...users, user])
  }

  const updateUserTable = (id, updatedUser) => {
    setUsers(users.map(user => user.id === id ? updatedUser : user));
  }

  return (
    <Container>
      <Box display={"flex"}>
        <Box margin={0}>
          <Typography
            variant={"h5"}
            style={{ marginLeft: 0 }}
            className={classes.typography}
          >
            User
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"}>
        <Box className={classes.box}>
          <Modal
            color='primary'
            titleModal={"Add a new user"}
            type='addUser'
            dataUsers={users}
            newUser={addUser}
          >
          </Modal>
        </Box>
      </Box>
      <Divider />
      {dataSuccess ?
        (<Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(users, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.role_id === 1 ? "Admin" : "User"}</TableCell>
                        <TableCell>{row.state
                          ? (<IconActive className={classes.iconActive} />)
                          : (<IconInactive className={classes.iconInactive} />)}
                        </TableCell>
                        <TableCell>
                          <Modal
                            titleModal={"Edit user"}
                            dataUser={row}
                            type='updateUser'
                            newUser={updateUserTable}
                          />
                          <ModalUpdatePassword
                            titleModal={"Edit password of "}
                            dataUser={row}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage={"List per page"}
            rowsPerPageOptions={[4]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </Paper>) : null}
    </Container>
  );
}
