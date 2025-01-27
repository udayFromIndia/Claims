import { Button, Container, Paper, styled, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material"
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useApi } from "../hooks/axios";
import { toast } from "react-toastify";


const List = () => {
    const [claim_list, setClaim_list] = useState([])
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // Get Claim Type List
    const onSuccess = (response: AxiosResponse | any) => {
        const claim_data = response?.data
        const claim_list = claim_data?.map((items: any) => {
            return {
                claim_id: items?.claimsId,
                name: items?.fullName,
                gender: items?.gender,
                pan_number: items?.pan,
            }
        })
        setClaim_list(claim_list)
    }

    const onFailure = (error: AxiosError | any) => {
        toast.error(error?.data?.message ?? "Semething went wrong")
    }

    const { callFetch, isloading } = useApi({ onSuccess, onFailure })
    useEffect(() => {
        callFetch("get", "/api/Claims")
    }, [])

    // Delete Claim
    const onSuccessDelete = (response: AxiosResponse | any) => {
        callFetch("get", "/api/Claims")
        toast.success(response?.data?.message ?? "Semething went wrong")
    }

    const onFailureDelete = (error: AxiosError | any) => {
        toast.error(error?.data?.message ?? "Semething went wrong")
    }
    const { callFetch: callFetchDelete, } = useApi({ onSuccess: onSuccessDelete, onFailure: onFailureDelete })


    return (
        <Container>
            <div className="px-10 mt-5">
                <div className="grid grid-cols-12">
                    <div className="col-span-12  flex justify-center text-3xl font-medium text-blue-600 font-serif">
                        Claim List
                    </div>
                </div>
                <div className="flex justify-end mt-3">
                    <Link to={"/"}>
                        <Button variant="contained" startIcon={<AddIcon />}>
                            <span>
                                Add
                            </span>
                        </Button>
                    </Link>
                </div>
                <div className="col-span-12 lg:col-span-10 xl:col-span-6 mt-5">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Gender</StyledTableCell>
                                    <StyledTableCell>Pan number</StyledTableCell>
                                    <StyledTableCell>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    claim_list?.map((items: any) => {
                                        return (<>
                                            <StyledTableRow
                                                key={items?.claim_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >

                                                <StyledTableCell component="th" scope="row">
                                                    {items?.name}
                                                </StyledTableCell>
                                                <StyledTableCell >{items?.gender}</StyledTableCell>
                                                <StyledTableCell >{items?.pan_number}</StyledTableCell>
                                                <StyledTableCell >
                                                    <div className="flex gap-3 items-center">
                                                        <Tooltip title="Edit" arrow placement="top">
                                                            <Link to={`/?id=${items?.claim_id}`}>
                                                                <button style={{ cursor: "pointer" }}>
                                                                    <EditIcon color="primary" />
                                                                </button>
                                                            </Link>
                                                        </Tooltip>
                                                        <Tooltip title="Delete" arrow placement="top">
                                                            <button onClick={() => {
                                                                callFetchDelete('delete', `/api/Claims/${items?.claim_id}`)
                                                            }}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <DeleteIcon color="error" />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Container>
    )
}

export default List
