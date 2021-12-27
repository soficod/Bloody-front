import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';


import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
const Maladies = ({quest,setQuest,parents,maladies,setMaladies})=>{

const [localMaladie,setLocalMaladie] = React.useState([]);
const [search,setSearch] = React.useState("");
const table = [4,5,6,7,8,9,10,11,12,13,25,26,27,28]
    useEffect(()=>{
        if(typeof(parents) != "undefined")
        {
            setLocalMaladie(parents.filter(m=>{
               return m.id != 26 && m.id != 4 && m.id != 5 && m.id != 6 && m.id != 7 && m.id != 8 && m.id != 9 && m.id != 10 && m.id != 11 && m.id != 12 && m.id != 13 && m.id !=25 && m.id != 27 && m.id != 28
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
                      <Box sx={{
                width:'100%',
            

            }}>
               <p style={{fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}>Vous sentez-vous en forme pour donner votre sang?</p>
               <FormGroup sx={{pl:"30px"}}>
               <RadioGroup
                    onChange={e=>setQuest({...quest,first_qest:e.target.value})}
                    name="radio-buttons-group"
                    value={quest.first_qest}
                    defaultValue={quest.first_qest}
                >
                    <FormControlLabel  value="oui" control={<Radio  />} label="Oui" />
                     
                    <FormControlLabel value="non" control={<Radio  />} label="Non" />
                 
                </RadioGroup>
                </FormGroup>
   
               <p style={{fontSize:'1.5em',backgroundColor:'rgb(154, 196, 237,0.2)',padding:"20px"}}>Avez vous (ou avez vous eu) une maladie?</p>
               <FormGroup sx={{pl:"30px"}}>
               <RadioGroup
                    sx={{marginBottom:"20px"}}
                    name="radio-buttons-group"
                    onChange={e=>setQuest({...quest,sec_qest:e.target.value})}
                   
                    value={quest.sec_qest}
                    defaultValue={quest.sec_qest}
                >
                    <FormControlLabel  value="oui" control={<Radio  />} label="Oui" />
                     
                    <FormControlLabel value="non" control={<Radio  />} label="Non" />
                 
                </RadioGroup>
                </FormGroup>
               
           
            <Paper sx={{marginBottom:"50px"}}>
            <IconButton type="submit" sx={{pl:0, p: '20px' }} aria-label="search">
                <SearchIcon sx={{color:"#1976D2"}} />
            </IconButton>
            <InputBase
                onChange={e=>setSearch(e.target.value)}
                sx={{width:"70%", ml:0 , flex: 1 }}
                placeholder="Chercher Maladies"
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
                        
                        (search.length > 0  || Object.keys(maladies).indexOf(""+parent.id) != -1) &&
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
</Box>
)

}
export default Maladies;