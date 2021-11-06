import { Dashboard } from '@mui/icons-material'
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import React, { useEffect } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "rgb(219, 238, 255,0.3)",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const DashBoard =()=>{
 
      const [blood,setBlood] = React.useState([])
      useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/blood")
        .then(res=>{
            setBlood(res.data.data)
        })
        .catch(err=>{console.log(err)})
      },[]);
    
    return(
    
        <>
              <TableContainer component={Paper} sx={{width: "80%", margin: " 50px auto"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                            
                                <StyledTableCell>Groupe sanguin</StyledTableCell>
                                <StyledTableCell>Somme</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {blood.map((row) => (
                                <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.count}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            
            <PieChart width={400} height={400}>
                <Pie
                    data={blood}
                    labelLine={true}
                    outerRadius={80}
                    label={(entry) => entry.name}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {blood.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </>
    )
}

export default DashBoard;