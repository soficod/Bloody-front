import { Dashboard } from '@mui/icons-material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

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