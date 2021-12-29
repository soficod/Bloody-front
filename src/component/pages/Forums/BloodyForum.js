import * as React from 'react';
import Personalinfo from './Personalinfo';
import Box from '@mui/material/Box';
import Questions from './Questions';
import Maladies from './Maladies';
import axios from 'axios'
import ResultsPage from './ResultsPage';
import Swal from 'sweetalert2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DashBoard from './DashBoard'
import Form from './Form';
import Medicament from './Medicament';
import Risque from './Risque';
import Vaccin from './Vaccin';
import Expfctl from './Expfctl';
import Chirurgie from './Chirurgie'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";


const BloodyForum = ()=>{
  const [person,setPerson] =React.useState({});
  const steps = ["Informations","Questionnaire","Maladies","Médicaments","Comportement à risque","Exploration fonctionnelle","Chirurgie","Vaccins"]
  const handleClickButton=()=>{
    axios.post('http://127.0.0.1:8000/api/people',info)
    .then(res=>{
        Swal.fire({
            title:"Prise de sang effectuée avec succés",
            icon:"success",
            showConfirmButton:true,
            confirmButtonText:"OK",
            confirmButtonColor:"#1976D2",
            
          })
          setPerson({...person,id:res.data.data.id});
          console.log(res.data.data.id);
          
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
    const goNext = () => 
    {
      switch(activeStep)
      {
        case 0: {
         
          setLoading(true)
          axios.post('http://127.0.0.1:8000/api/people/validate',info)
          .then(res=>
            {
             
              setActivestep((activeStep)=> activeStep+1);
             
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
              
          })
          .catch(err =>
            {
              setLoading(false);
          
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
        
          setLoading(true)
          axios.post('http://127.0.0.1:8000/api/people/check-donation', info)
          .then(res=>
            {
              if(!res.data.data.isAble)
              {
                Swal.fire({
                  title:"Contre indication définitive.",
                  html:`<h5 style='color:rgb(99, 99, 98)'>`+`${res.data.data.result != null?res.data.data.result:"" }` +` </br>` +` ${res.data.data.volume != null?res.data.data.volume:""}`+ `</br>` +`${res.data.data.comment != null ? res.data.data.comment : ""}` +`</h5>`,
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
                    weight:null,
                    answers:[]
                   
                  })
                  setError({
                    fname:'',
                    lname:'',
                    sex: '',
                    address:'',
                    email:'',
                    phone:'',
                    birthdate:'',
                  
                
                

                
                  });
                  setMaladies({});
                  setActivestep(0);
                  setValue({});
                  setChecked(false);
                })
                return;
              }
           
              axios.get('http://127.0.0.1:8000/api/points')
              .then(res=>
              {
               
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                setParents((parents) => res.data.data)
                setActivestep((activeStep)=> activeStep+1);
                console.log(res.data.data);
              })
              .catch(err => setLoading(false))
            })
            .catch(err=>{
            
             
          setLoading(false)
              if(err.response.status == 422)
              {
                  let errors = {...error}
                  Object.keys(err.response.data.errors).forEach(key => 
                   
                    errors[key] = err.response.data.errors[key][0]
                    
                  );
                  setError(errors);
              }

            })
          break;
        }
      
        case 2:{
          
            quest.first_qest == "non"?
             Swal.fire({
                 title:" Contre indication définitive",
                 html:`<h5 style='color:rgb(99, 99, 98)'>Le patient ne se sent pas en forme pour donner son sang.</h5>`,
                 icon:"error",
                 showConfirmButton:true,
                 confirmButtonText:"OK",
                 confirmButtonColor:"#1976D2"
                 
                 
             })
             .then((res) => {
              
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
              
            
           
          })
           
        
           
            :
            setActivestep((activeStep)=> activeStep+1);
            
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          break;
        }
     
        case 3:{
            
          setActivestep((activeStep)=> activeStep+1);
  
        
           break;
          }
          case 4:{setActivestep((activeStep)=> activeStep+1);
            
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
           break;
            }
          case 5:{setActivestep((activeStep)=> activeStep+1);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
           break;
          }
          case 6:{setActivestep((activeStep)=> activeStep+1);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            break;
            }
          case 7:{ 
            const arr_maladies = [];
         
            Object.keys(maladies).forEach(key => 
            {
              for(let id of maladies[key])
              {
                arr_maladies.push(id);
              }
            
            })
  
        
            let local_info = {...info, answers:arr_maladies}; 
            setInfo({...info, answers:arr_maladies});
            setLoading(true)    
            axios.post('http://127.0.0.1:8000/api/people/check',local_info)
            .then(res=>
            {
              setResult((result) => res.data.data.results.results);
              setSubResult((result=>res.data.data.results));
              console.log(res)
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
              setActivestep((activeStep)=> activeStep+1);
            
             
            
            
            })
            .catch(err => {
             
              setLoading(false)
             
            })
           
            break;
              }
          case 8:{setActivestep((activeStep)=> activeStep+1);
            break;
              }
      }
    
    

    }
    
    const [value,setValue]= React.useState({});
    const[donorTypeValue,setDonorTypeValue] = React.useState({})
    const [loading,setLoading]=React.useState(false);
    const [postData,setPostData]= React.useState([]);
    const [activeStep,setActivestep]=React.useState(0);
    const [quest,setQuest] = React.useState({
      first_qest:"",
      sec_qest:""
    })
    const [info, setInfo] = React.useState({
      fname:'',
      lname: '',
      sex: '',
      address:'',
      phone: '',
      birthdate:new Date(''),
      email:'',
      type:'',
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
    
    
  
    })
  
    
    const[result,setResult]=React.useState([])
    const[subResult,setSubResult]=React.useState([])
    const [parents,setParents]= React.useState([])
   
    
    const [checked,setChecked]=React.useState(false);
    const [valueChecked,setValueChecked] = React.useState(false);
    
    
    React.useEffect(() => 
    {
       setLoading(false);
    }, [activeStep])
    
    const renderSwitch =(steps)=>{
      switch(steps){
        case 0:
          return <Personalinfo 
          error={error} 
          info={info} 
          setInfo={setInfo} 
          setError={setError}
          />

        case 1:
          return <Questions
          donorTypeValue ={donorTypeValue} 
          setDonorTypeValue= {setDonorTypeValue}
          value={value} setValue={setValue} 
          valueChecked ={valueChecked } 
          setValueChecked={setValueChecked}
          setChecked={setChecked}
          setError={setError} 
          error={error} 
          checked={checked}
          setChecked={setChecked}
          answers={info}
          setAnswers={setInfo} />

        case 2:
          return <Maladies 
            parents={parents}
            maladies={maladies} 
            setMaladies={setMaladies}
            quest={quest}
            setQuest={setQuest}
            />
        
        case 3:return <Medicament 
            parents={parents}
            maladies={maladies} 
            setMaladies={setMaladies}/>
        
        case 4:return <Risque
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 5:return <Expfctl
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 6:return <Chirurgie
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 7:return <Vaccin
        parents={parents}
        maladies={maladies} 
        setMaladies={setMaladies}/>

        case 8: return <ResultsPage 
        setChecked={setChecked}
        setValue={setValue} 
        info={info}
        setError={setError}
        result={result} 
        setInfo={setInfo}
        setActivestep={setActivestep}
        setMaladies={setMaladies}
        setQuest={setQuest}
        handleClick={handleClick}
        handleClickButton={handleClickButton}
        subResult = {subResult}
        setSubResult = {setSubResult}
        />
    
      }

  
    }

    const [selectedTab, setSelectedTab] = React.useState(0) 

    return(
    <div style={{
     
      width: "100vw",
      height: "100vh",
      paddingTop:"30px"
    }}>
     <Box  

        sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
          marginTop:'100px',
          maxWidth: "1000px",
          width:'90%',
          margin:'auto',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          
          
        }}>
         
        <Tabs  
             
              value={selectedTab}
              onChange={(e, newVal) => setSelectedTab(newVal)}
              centered
        >
            <Tab 
              label="formulaire" 
              component={Link}
              to={"/"}
             
            />
            <Tab 
              label="DashBoard"
              component={Link}
              to={"/dashboard"}
            />
        </Tabs>
        <Routes>
          <Route 
            exact path="/"
            element={
              <Form
                steps={steps}
                activeStep={activeStep}
                renderSwitch={renderSwitch}
                goNext={goNext}
                setActivestep={setActivestep}
                loading={loading}
                error={error}
              />
            }
          />
          <Route 
            path="/dashboard"
            element={
              
            <DashBoard />
            }
          />
        </Routes>
     </Box>
    </div>
    )

}
export default BloodyForum;