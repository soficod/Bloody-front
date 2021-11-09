axios.post('http://127.0.0.1:8000/api/points/check')
.then(res => 
{
  console.log(res);
  setActivestep((activeStep)=> activeStep+1);
})
.catch(err => 
{
  console.log(err.response.data)
  let errors = {}
  if(err.response.status === 422)
  {
    Object.keys(err.response.data.errors).forEach(key => 
    {
      errors[key] = err.response.data.errors[key][0];
    })
    setError(errors)
  }
})