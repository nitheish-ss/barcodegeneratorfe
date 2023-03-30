import { getDevices } from "../services/deviceService";
import { FaPen, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6c757d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const DeviceTable = () => {
  const [devices, setDevices] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getDevicesData();
  }, [pageNo, perPage]);
  const getDevicesData = async () => {
    const result = await getDevices(pageNo, perPage);
    setCount(result?.count);
    setDevices(result?.data);
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(+event.target.value);
    setPageNo(0);
  };

  console.log(devices);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "81vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Brand</StyledTableCell>
              <StyledTableCell>Model</StyledTableCell>
              <StyledTableCell>Imei</StyledTableCell>
              <StyledTableCell>RAM</StyledTableCell>
              <StyledTableCell>ROM</StyledTableCell>
              <StyledTableCell>Device Condition</StyledTableCell>
              <StyledTableCell>Purchased From</StyledTableCell>
              <StyledTableCell>Purchased Contact</StyledTableCell>
              <StyledTableCell>Purchase Cost</StyledTableCell>
              <StyledTableCell>Purchase Date</StyledTableCell>
              <StyledTableCell>Sold To</StyledTableCell>
              <StyledTableCell>Sold Contact</StyledTableCell>
              <StyledTableCell>Sold Price</StyledTableCell>
              <StyledTableCell>Sold Date</StyledTableCell>
              <StyledTableCell>Profit</StyledTableCell>
              <StyledTableCell>Tools</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices &&
              devices.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item?._id}>
                    <TableCell>{pageNo * perPage + 1 + index}</TableCell>
                    <TableCell>{item?.brand}</TableCell>
                    <TableCell>{item?.model}</TableCell>
                    <TableCell>{item?.imei}</TableCell>
                    <TableCell>{item?.ram}</TableCell>
                    <TableCell>{item?.rom}</TableCell>
                    <TableCell>
                      {item?.deviceCondition
                        ? item?.deviceCondition.slice(0, 20)
                        : ""}
                    </TableCell>
                    <TableCell>{item?.purchasedFrom}</TableCell>
                    <TableCell>{item?.purchasedFromContactNo}</TableCell>
                    <TableCell>{item?.purchaseCost}</TableCell>
                    <TableCell>
                      {item?.purchaseDate &&
                        new Date(item?.purchaseDate).toLocaleDateString(
                          "en-GB",
                          {
                            timeZone: "Asia/Kolkata",
                          }
                        )}
                    </TableCell>
                    <TableCell>{item?.soldTo}</TableCell>
                    <TableCell>{item?.soldToContactNo}</TableCell>
                    <TableCell>{item?.soldPrice}</TableCell>
                    <TableCell>
                      {item?.soldDate &&
                        new Date(item?.soldDate).toLocaleDateString("en-GB", {
                          timeZone: "Asia/Kolkata",
                        })}
                    </TableCell>
                    <TableCell>{item?.profit}</TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center justify-content-center gap-5 px-2">
                        <button
                          style={{
                            border: "0px",
                            backgroundColor: "transparent",
                          }}
                        >
                          <FaPen />
                        </button>
                        <button
                          style={{
                            border: "0px",
                            backgroundColor: "transparent",
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={perPage}
        page={pageNo}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DeviceTable;
