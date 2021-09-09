import React from 'react'
import {Button} from 'react-bootstrap'

export default function But() {



    return(

        <div>
        <Button  variant="light" style={{width:"110px", height:"40px"
    ,paddingTop:"0px", paddingBottom:"0px", marginTop:"20px", marginBottom:"0px"
    ,borderRadius:"20px", position:"absolute", marginLeft:"310px", boxSizing:"border-box"
    , backgroundColor:"#b8b8b8" }}  >
        
        <span className="text" style={{marginLeft:"20px", fontSize:"14px", fontWeight:"bold"}}> 
        CRDT
        </span>
        <span className="text2" style={{marginLeft:"9px", position:"absolute"
    , fontSize:"12px", marginTop:"5px", fontWeight:"bold" }}>
            
        </span>
     </Button>
     <img src="/images/CRDT.png" alt="girl coding" className="img-responsive"
     style={{width:"30px", height:"30px", 
     marginBottom:"85px", marginTop:"26px", position:"absolute"
     , paddingBottom:"0px",  marginLeft:"317px", justifyContent:"left"
     }} />

        </div>
    )
}