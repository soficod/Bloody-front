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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import CollapsibleTable from './CollapsibleTable';
import CircularProgress from '@mui/material/CircularProgress';

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
      const [person,setPerson] = React.useState([]);
      const [open, setOpen] = React.useState(false);
      
      const  [loading, setLoading] = React.useState(true);
       useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/people/")
        .then(res=>{
            setPerson(res.data.data)
            console.log(res.data.data)
            setLoading(false);
            
        })
        .catch(err=>{setLoading(false); console.log(err)})
      },[]);
    
    return(
    
        <>
       
         
          {
            loading ? 
            <CircularProgress style={{marginTop: "60px"}}/>
            :
            <CollapsibleTable data={person}/>
          }
            <PieChart width={400} height={400}>
                <Pie
                    data={person}
                    labelLine={true}
                    outerRadius={80}
                    label={(entry) => entry.name}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {person.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
           
        </>
    )
}

export default DashBoard;