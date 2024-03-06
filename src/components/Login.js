import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {


    const navigate = useNavigate();
  

    const [credentials, setcredentials] = useState({email :" " , password :" "})




   const handleSubmit =async(e)=>{

    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
          
        },
       
        body: JSON.stringify({email : credentials.email ,password : credentials.password}), 
      });
      
       const json =  await response.json();
       console.log(json)


       //if user login is true then 
       if(json.success){

        //Save the auth token in localstorage
        localStorage.setItem("token", json.authToken)
        props.showAlert(" Logged in successfully" , "success ")
        navigate("/");
        
    }
    else{
        //if user credential is invalid
      
        props.showAlert(" Invalid credential" , "danger ")
    }

   
   }

   const onChange = (e)=>{


    setcredentials({...credentials ,  [e.target.name]: e.target.value}) ;
    

}




  return (


       
    <div className="container my-4"> 
    <h1>Login in to iNotebuk</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email" name="email"
            aria-describedby="emailHelp" onChange={onChange} value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"  name="password" onChange={onChange} value={credentials.password}
          />
        </div>
       
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
