import  NoteContext from "./noteContext";

import {useState} from 'react';


const NoteState = (props) =>{

    const s1 = {
        
        "name" : "Ankit",
        "class" : "5e"


    }

    const [state , setState] = useState(s1);

    const update =()=>{

        setTimeout(() => {

            setState({
                "name":"Rahul",

                "class":"41k"
            })
            
        }, 1000);


    }

    return (
  

         <NoteContext.Provider value={{state ,update}}>

           {props.children}



         </NoteContext.Provider>




    )



}


export default NoteState ;