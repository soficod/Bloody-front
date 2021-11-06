import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';


import FormControlLabel from '@mui/material/FormControlLabel';

const Maladies = ({parents,maladies,setMaladies})=>{



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
        {
            parents.map((parent, index_parent) => 
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
                        parent.children.map(child=>
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
export default Maladies;