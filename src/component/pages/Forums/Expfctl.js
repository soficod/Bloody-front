import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
const Expfctl = ({parents,maladies,setMaladies})=>{

const [localMaladie,setLocalMaladie] = React.useState([]);
const [search,setSearch] = React.useState("");

    useEffect(()=>{
        if(typeof(parents) != "undefined")
        {
            setLocalMaladie(parents.filter(m=>{
                return m.id == 28
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
       
            <h1 style={{textAlign:"center",marginBottom:"60px",height:"50px",color:"rgb(79, 78, 78,0.9", backgroundColor:"rgb(143, 199, 255,0.2)"}}>Exploration fonctionnelle </h1>
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
                placeholder="Chercher..."
                inputProps={{ 'aria-label': 'search google maps' }}
            />
           
            </Paper>
        {
            localMaladie.filter(p=>{
                return p.children.filter(c=> c.title.toLowerCase().includes(search.toLowerCase())).length>0
            }).map((parent, index_parent) => 
                <>  
                    {
                        parent.children.filter(c=> c.title.toLowerCase().includes(search.toLowerCase())).map(child=>
                            <Box sx={{display:'flex',flexDirection:'column',m:3}}>
                                <FormControlLabel 
                                    control={
                                        <Checkbox  
                                            checked={typeof(maladies[parent.id]) != "undefined" && maladies[parent.id].filter(c => c.id == child.id).length > 0}
                                            defaultChecked={typeof(maladies[parent.id]) != "undefined" && maladies[parent.id].filter(c => c.id == child.id).length > 0}
                                            onChange={(e) => {
                                                if(e.target.checked)
                                                {
                                                    if(typeof(maladies[parent.id]) != "undefined")
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
                                                            [{
                                                                id: child.id,
                                                                value: true
                                                            }]
                                                        })
                                                    }
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
export default Expfctl;