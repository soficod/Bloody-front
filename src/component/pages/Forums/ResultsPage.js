import React from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Swal from 'sweetalert2';
import axios from 'axios';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SaveIcon from '@mui/icons-material/Save';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
const ResultsPage = ({subResult,setQuest,person,setPerson,info,setChecked,result,setInfo,setActivestep, setMaladies,setError,setValue})=>{

    
    const handleQuitter=()=>{
        
        Swal.fire({
            title:"Voulez-vous vraiment quitter cette page ",
            icon:"question",
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton:false,
           cancelButtonText:"Annuler",
            denyButtonText:"Quitter"
          })
          .then((res) => {
              if(res.isDenied)  {
                setInfo({
                    fname:'',
                    lname: '',
                    sex: '',
                    address:'',
                    phone: '',
                    birthdate:new Date(''),
                    email:'',
                    weight:null,
                    answers:[]
                   

                  })
                  setActivestep(0);
                  setMaladies({});
                  setError({
                    fname:'',
                    lname:'',
                    sex: '',
                    address:'',
                    email:'',
                    phone:'',
                    birthdate:'',
                   
             
                
                  });
                  setValue({});
                  setChecked(false);
                  setQuest(
                      {
                          first_qest:"",
                          sec_qest:""
                      }
                  )
              } 
            
           
          })
 }
    const handleClickButton=()=>{
        axios.post('http://127.0.0.1:8000/api/people',info)
        .then(res=>{
            Swal.fire({
                title:"Donneur enregistré avec succés",
                icon:"success",
                showConfirmButton:true,
                confirmButtonText:"OK",
                confirmButtonColor:"#1976D2",
                
            })
   
            
        })
        
        .catch(err=>{
            Swal.fire({
                title:err,
                icon:"error",
                showConfirmButton:true,
                confirmButtonText:"OK",
                confirmButtonColor:"#1976D2"
            })
        }) 
    }

    const handleClick=()=>{
        axios.post('http://127.0.0.1:8000/api/people/donate',info)
        .then(res=>{

            Swal.fire({
                title:"Prise de sang effectuée avec succés",
                icon:"success",
                showConfirmButton:true,
                confirmButtonText:"OK",
                confirmButtonColor:"#1976D2",
                
            })
            
        })
        .catch(err=>{
            Swal.fire({
                title:err,
                icon:"error",
                showConfirmButton:true,
                confirmButtonText:"OK",
                confirmButtonColor:"#1976D2"
            })
        }) 
    }
   
    return(
        <>
            
            <Box sx={{
                display:'flex',
                width: "100%",
                flexDirection:'column',
               
        }}>
           
            <h1 style={{margin:"auto",marginBottom:"60px",width:"90%",textAlign:"center",height:"50px",color:"rgb(79, 78, 78,0.9)", backgroundColor:"rgb(143, 199, 255,0.2)"}}>Resultats</h1>
            
            <Box sx={{
                width:"100%",
             }}>
                 
                {/*<Box sx={{paddingRight:'30px',height:"80px",color:"#595a5c",display:"flex",alignContent:"space-between",flexDirection:"row","&>p":{ width:"100px"}}}>
                    <p><b>Nom</b></p>
                    <p style={{textAlign:"center",color:"#7e8082",}}>{info.info.lname}</p>
                </Box> 
                <Box sx={{paddingRight:'30px',height:"80px",color:"#595a5c",display:"flex","&>p":{flexDirection:"row",width:"20%"}}}>
                    <p><b>Prénom</b></p>
                    <p style={{textAlign:"center",color:"#7e8082"}}>{info.info.fname}</p>
                </Box> 
                <Box sx={{paddingRight:'30px',height:"80px",color:"#595a5c",display:"flex","&>p":{flexDirection:"row",width:"20%"}}}>
                    <p><b>Date de naissance</b></p>
                    <p style={{textAlign:"center",color:"#7e8082"}}>{info.info.birthdate.getDate()+"/"+(info.info.birthdate.getMonth()+1)+"/"+info.info.birthdate.getFullYear()}</p>
                </Box> 
                <Box sx={{paddingRight:'30px',height:"80px",color:"#595a5c",display:"flex","&>p":{flexDirection:"row",width:"20%"}}}>
                    <p><b>Groupe sanguin</b></p>
                    <p style={{textAlign:"center",color:"#7e8082"}}>{info.info.bloodType}</p>
            </Box> */}
            <table style={{
                width: "80%",
                textAlign: "left",
                margin: "auto",
                fontSize:"1.4em",
                border:"1px solid #F5F9FD",
                backgroundColor:"#F5F9FD",
                paddingTop: "30px",
                paddingLeft: "20px"
                
            }}>
                <tr>
                    <th style={{paddingBottom:"30px",color:"#403e3e"}}>Nom</th>
                    <td style={{paddingBottom:"30px",color:"#696666"}}>{info.lname}</td>
                </tr>
                
                <tr>
                    <th style={{paddingBottom:"30px",color:"#403e3e"}}>Prénom</th>
                    <td style={{paddingBottom:"30px",color:"#696666"}}>{info.fname}</td>
                </tr>
                <tr>
                    <th style={{paddingBottom:"30px",color:"#403e3e"}}>Date de naissance</th>
                    <td style={{paddingBottom:"30px",color:"#696666"}}>{info.birthdate.getDate()+"/"+(info.birthdate.getMonth()+1)+"/"+info.birthdate.getFullYear()}</td>
                </tr>
                <tr>
                    <th style={{paddingBottom:"30px",color:"#403e3e"}}>Type de don</th>
                    <td style={{paddingBottom:"30px",color:"#696666"}}>{
                    info.donation_type=="blood"?
                    "Sang total"
                    :
                    info.donation_type=="white"?
                    "Globules blancs"
                    :
                    info.donation_type=="red"?
                    "Globules rouges"
                    :
                    info.donation_type=="platelets"?
                    "Plaquettes"
                    :
                    info.donation_type =="plasma"?
                    "Plasma"
                    :
                    ""
                    
                    
                    }</td>
                    
                </tr>
                {
                    subResult.comment&&
                    <>
                     <tr>
                    <th style={{paddingBottom:"30px",color:"#403e3e"}}>Volume à prélever</th>
                    <td style={{paddingBottom:"30px",color:"#696666"}}>{subResult.volume}</td>
                    
                </tr>

                <tr>
                    <th style={{paddingBottom:"30px",color:"#403e3e"}}>Remarque </th>
                    <td style={{paddingBottom:"30px",color:"#696666"}}>{subResult.comment}</td>
                    
                </tr>
                    </>
                }
               
            </table>

                 
                <Box sx={{width:'80%',margin:"auto",display:"flex",flexDirection:"row"}}>
                    {
                        typeof(result) != "undefined" && (result.filter(r => r.result === "cid").length > 0) ?
                            <Box sx={{margin:"auto",display:"flex",justifyContent: "center",width:"100%",backgroundColor:"rgb(252, 187, 187,0.4)"}}>
                                <HighlightOffIcon style={{fontSize: "5em", color: "red"}}/>
                                <button style={{
                                    fontSize:"1.7em", 
                                    border: "none", 
                                    backgroundColor: "rgba(0,0,0,0)",
                                    fontWeight: "bold",
                                    color:"#ff0033"
                                }}>Contre indication définitive</button>
                            </Box>
                        :
                        typeof(result) != "undefined" && (result.filter(r => r.result === "cit").length > 0) ?
                            <Box sx={{margin:"auto",display:"flex",justifyContent: "center",width:"100%",backgroundColor:"rgb(252, 229, 189,0.3)"}}>
                                <ErrorOutlineIcon style={{fontSize: "5em", color: "rgb(212, 120, 40)"}}/>
                                <button style={{
                                    fontSize:"1.7em", 
                                    border: "none", 
                                    backgroundColor: "rgba(0,0,0,0)",
                                    fontWeight: "bold",
                                    color:"rgb(212, 120, 40)"
                                }}>Contre indication temporaire</button>
                            </Box>
                        :
                            <Box sx={{margin:"auto",display:"flex",justifyContent: "center",width:"100%",backgroundColor:"rgb(91, 252, 99,0.2)"}}>
                                <CheckCircleOutlineIcon style={{fontSize: "5em", color: "rgb(76,175,80)"}}/>
                                <button style={{
                                    fontSize:"1.7em", 
                                    border: "none", 
                                    backgroundColor: "rgba(0,0,0,0)",
                                    fontWeight: "bold",
                                    color:"rgb(76,175,80)"
                                }}>Prise de sang autorisée</button>
                            </Box>
                    }
                </Box>
                {
                    typeof(result) != "undefined" && result.length > 0 ?
                    <TableContainer component={Paper} sx={{width: "80%", margin: "auto"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Nom&nbsp;de&nbsp;la&nbsp;maladie</TableCell>
                                <TableCell>Don Contre Indiqué</TableCell>
                                <TableCell>Valeurs</TableCell>
                                <TableCell>Durée</TableCell>
                                <TableCell>Commentaires</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {result.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{
                                    row.result === "cid" ?
                                    <>Contre indication définitive</>
                                    :
                                    row.result === "cit" ?
                                    <>Contre indication temporaire</>
                                    :
                                    null
                                }</TableCell>
                                  <TableCell>{row.values}</TableCell>
                                <TableCell>{row.duration}</TableCell>
                                <TableCell>{row.comment}</TableCell>

                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    null
                }
             <Box>
    
               </Box>
            </Box>
            {
                   typeof(result) != "undefined" && result.length ==0 || typeof(result) != "undefined" && (!result.filter(r => r.result === "cid").length > 0) ?
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                        <Box
                        sx={{display:"flex",flexDirection:"row"}}
                        >
                        
                            <Button
                            sx={{
                                    minWidth:"100px",
                                    textAlign:"center",
                                    margin:"50px auto",
                                    fontSize:"1.2em"

                                }} 
                            variant="outlined" 
                            startIcon={<SaveIcon />}
                            onClick={handleClickButton}
                                >
                                
                                Enregistrer le donneur
                            </Button>
                            <Button
                            sx={{
                                    minWidth:"100px",
                                    textAlign:"center",
                                    margin:"50px auto",
                                    fontSize:"1.2em"

                                }} 
                            variant="outlined" 
                            startIcon={<BloodtypeIcon/>}
                            onClick={handleClick}
                                >
                                
                                Effectuer un don 
                            </Button>
                        </Box>                             
                  <Button sx={{
                        minWidth:"100px",
                        textAlign:"center",
                        margin:"50px auto",
                        fontSize:"1.2em"

                    }} 
                    color="error"
                    variant="contained"
                    startIcon={<ExitToAppIcon />}
                    onClick={handleQuitter}
                    
                    >
                    
                    Quitter
                    </Button>
                   </Box> 
                :
                <Button sx={{
                    minWidth:"100px",
                    textAlign:"center",
                    margin:"50px auto",
                    fontSize:"1.2em"

                }} 
                color="error"
                variant="contained" 
                startIcon={<ExitToAppIcon  />}
                onClick={handleQuitter}
                
                >
                
                 Quitter
                </Button>

            }
               
            </Box>
        
        </>
    )
}
export default ResultsPage