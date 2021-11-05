import * as React from 'react';
import Personalinfo from './Personalinfo';
import Box from '@mui/material/Box';
import { AssignmentReturnedTwoTone } from '@mui/icons-material';
import Questions from './Questions';
import Maladies from './Maladies';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import {bg1} from './background';
import axios from 'axios'
import ResultsPage from './ResultsPage';
import Swal from 'sweetalert2'

const BloodyForum = ()=>{
    
    const steps = ["étape 1","étape 2","étape 3"]

    const goNext = () => 
    {
      switch(activeStep)
      {
        case 0: {
          axios.post('http://127.0.0.1:8000/api/people/validate',info)
          .then(res=>
            {
              console.log(res);
              setActivestep((activeStep)=> activeStep+1);
              
            })
            .catch(err =>
              {
                console.log(err.response.data)
                let errors=[];
                if(err.response.status == 422)
                {
                  Object.keys(err.response.data.errors).forEach(key => 
                    {
                      errors[key] = err.response.data.errors[key][0];
                    })
                    setError(errors)
                }

              })
          break;
        }
        case 1: {
          
          
         
          axios.post('http://127.0.0.1:8000/api/people/check-donation', info)
          .then(res=>
            {
              console.log(res);
              if(!res.data.data.result)
              {
                Swal.fire({
                  title:"Contre indication définitive.",
                  text:res.data.data.explanation,
                  icon:"error",
                  showConfirmButton:true,
                  confirmButtonText:"OK",
                  confirmButtonColor:"#1976D2"
                }).then((res) => {
                  
                  setInfo({
                    fname:'',
                    lname: '',
                    sex: '',
                    address:'',
                    phone: '',
                    birthdate:new Date(''),
                    email:'',
                    bloodType:'',
                    answers:[]
                  })
                  setActivestep(0);
                })
                return;
              }
              axios.get('http://127.0.0.1:8000/api/points')
              .then(res=>
              {
                console.log(res.data.data)
                setParents(res.data.data)
                
                setActivestep((activeStep)=> activeStep+1);
              })
              .catch(err =>console.log(err))
            })
            .catch(console.log)

          /**/
          
          break;
        }
        case 2:{
          
          const arr_maladies = [];
          console.log(maladies)
          Object.keys(maladies).forEach(key => 
          {
            for(let id of maladies[key])
            {
              arr_maladies.push(id);
            }
          
          })

          console.log(arr_maladies);
          let local_info = {...info, answers:arr_maladies}; 
          //we're not updating the state, le tableau rani nmeddo direct lel variable locale
          //had la variable locale c'est bach neba3toha f axios
          setInfo({...info, answers:arr_maladies});
          //dork le state yetbedel lwa9t li i7ab we don't care
          //idk if fhamtini :'( yeah c bon      
          axios.post('http://127.0.0.1:8000/api/people/check',local_info)
          .then(res=>
          {
            setResult(res.data.data.results)
            setPerson(res.data.data.person)
            console.log(result)
          
          })
          .catch(err =>console.log(err))
         
          setActivestep((activeStep)=> activeStep+1);
          break;
        }
        case 3:
   
          setActivestep((activeStep)=> activeStep+1);

      }
    }
    const [postData,setPostData]= React.useState([]);
    const [activeStep,setActivestep]=React.useState(0);
    const [info, setInfo] = React.useState({
      fname:'',
      lname: '',
      sex: '',
      address:'',
      phone: '',
      birthdate:new Date(''),
      email:'',
      bloodType:'',
      answers:[]
    })

    const [maladies,setMaladies] = React.useState({});
    
    const [error, setError] = React.useState({
      fname:'',
      lname:'',
      sex: '',
      address:'',
      email:'',
      phone:'',
      birthdate:'',
      bloodType:''  
    })
  
    
    const[result,setResult]=React.useState([])
    const [parents,setParents]= React.useState([])

    const [person,setPerson] =React.useState({});
    const [checked,setChecked]=React.useState([false,false]);

    const renderSwitch =(steps)=>{
      switch(steps){
        case 0:
          return <Personalinfo error={error} info={info} setInfo={setInfo} />
        case 1:
          return <Questions checked={checked} setChecked={setChecked} answers={info} setAnswers={setInfo} />
        case 2:
          return <Maladies 
            parents={parents}
            maladies={maladies} 
            setMaladies={setMaladies}
          />
        case 3: return <ResultsPage info={info} result={result} person={person}/>
   
        
      }
  
    }
    return(
    <div style={{
     
      width: "100vw",
      height: "100vh",
      paddingTop:"50px"
    }}>
     <Box  

        sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          marginTop:'100px',
          maxWidth: "900px",
          width:'90%',
          margin:'auto',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          backgroundColor: "white"
          
        }}>
        <Box sx={{ width: '100%', m:6 }}>
          
           <Stepper activeStep={activeStep} alternativeLabel>

            {steps.map((label) => (
              
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

        </Box>
       
          {
            renderSwitch(activeStep)
          }
          <Box sx={{width:'100%',display: 'flex', flexDirection: 'row-reverse', pt: 2 ,justifyContent:'space-between'}}>
           
         {
          (activeStep==steps.length)?
          <Button
           variant="contained" 
           disabled={activeStep === 3}
           sx={{ m: 5 }}
           onClick={()=>{setActivestep((activeStep)=> activeStep+1)}}

           >
             Next</Button>
             :
             <Button
             variant="contained" 
             sx={{ m: 5 }}
             onClick={()=>{
               goNext();
             }}
  
             >
               Next </Button>
         }
          

        
          
          <Button
           variant="contained"
            sx={{ m: 5 }}
            disabled={activeStep === 0}
            onClick={()=>{setActivestep((activeStep)=> activeStep-1)}}
            >Previous </Button>
          </Box>
          

     </Box>
    </div>
    )

}
export default BloodyForum;