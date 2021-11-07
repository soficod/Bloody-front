import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
const Medicament = ({parents,maladies,setMaladies})=>{

const [localMaladie,setLocalMaladie] = React.useState([]);
const [search,setSearch] = React.useState("");

    useEffect(()=>{
        if(typeof(parents) != "undefined")
        {
            setLocalMaladie(parents.filter(m=>{
                return m.id == 26 
            }))
        }
    },[parents])

return(
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'left',
        width:'85%',
       

        ml:5,
        '&> :not(style)' :{width:'100%'}
    }}>
       
            <h1 style={{textAlign:"center",marginBottom:"60px",height:"50px",color:"rgb(79, 78, 78,0.9", backgroundColor:"rgb(143, 199, 255,0.2)"}}>Maladies</h1>
        <Box sx={{
            my:3
        }}>
            <Paper sx={{marginBottom:"50px"}}>
            <IconButton type="submit" sx={{ p: '20px' }} aria-label="search">
                <SearchIcon  sx={{color:"#1976D2"}} />
            </IconButton >
            <InputBase
                onChange={e=>setSearch(e.target.value)}
                sx={{width:"70%", ml:0 , flex: 1 }}
                placeholder="Chercher Médicaments"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
           
            </Paper>
        {
            localMaladie.filter(p=>{
                return p.children.filter(c=> c.title.toLowerCase().includes(search.toLowerCase())).length>0
            }).map((parent, index_parent) => 
                <>  
                   
                    <Box sx={{ borderBottom:"2px solid rgb(202, 227, 252,0.4)",pl:1,marginBottom:5,backgroundColor:"rgb(202, 227, 252,0.1)" ,paddingBottom:2,"&>":{fontSize:"1.4em"}}}>
                        <FormControlLabel 
                            key={index_parent}
                            control={
                                <Checkbox 
                                    key={index_parent}
                                    value='cardio' 
                                    defaultChecked={typeof(maladies[parent.id]) != "undefined"}
                                    checked={typeof(maladies[parent.id]) != "undefined"}
                                    onChange={(e) => {
                                          
                                        if(e.target.checked)
                                        {
                                            setMaladies({...maladies, [parent.id]:[]})
                                        }
                                        else 
                                        {
                                            let tmp = {...maladies};
                                            delete tmp[parent.id];
                                            setMaladies(tmp);
                                        }
                                    }}
                                />
                            } 
                            label={parent.title} 
                        />
                    </Box>
                    {
                        
                        Object.keys(maladies).indexOf(""+parent.id) != -1 &&
                        parent.children.filter(c=> c.title.toLowerCase().includes(search.toLowerCase())).map(child=>
                            <Box sx={{display:'flex',flexDirection:'column',m:3}}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox  
                                            checked={maladies[parent.id].filter(c => c.id == child.id).length > 0}
                                            defaultChecked={maladies[parent.id].filter(c => c.id == child.id).length > 0}
                                            onChange={(e) => {
                                                if(e.target.checked)
                                                {
                                                    setMaladies({
                                                        ...maladies, 
                                                        [parent.id]: 
                                                        [...maladies[parent.id], {
                                                            id: child.id,
                                                            value: true
                                                        }]
                                                    })
                                                }
                                                else 
                                                {
                                                    setMaladies({
                                                        ...maladies, 
                                                        [parent.id]: 
                                                        maladies[parent.id].filter(m => m.id !== child.id)
                                                    })
                                                }
                                            }}
                                        />
                                    } 
                                    label={child.title} 
                                    
                                />
                            </Box>
                        )
                    }
                </>
            )
        }

    </Box>
</Box>
)

}
export default Medicament;