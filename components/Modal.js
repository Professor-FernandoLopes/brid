import {Button,Modal,Form} from 'react-bootstrap'
import React, { useRef, useEffect, useState } from 'react';
import styles from "./button.module.scss"

// quando clicar no botão do modal scrdt tem que setar o estado do Main como scrdt
// onClick setCurrentForm scrdt examplo uso do modal:
/* o componente SymbolModal foi renderizado no component Symbols
para ter acesso a propriedade data.
No caso do SymbolRow este foi renderizado no componet Symbols para
invocar uma função deste por meio do evento onClick.
No caso ao clicar no botão(onClick) dentro do componente SymbolRow
é selecionada a propriedade onClick por meio de props.onClick, que por sua vez
dentro do componente Symbols chama a função onEditClick

Nesses dois casos eu renderizei os componentes dentro de Symbols.

*/


export default function SymbolModal(props) {

    const [show, setShow] = useState(false);

   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    function handlePropsScrdt() {
      let p;
      p = props.onClick
       p(); handleClose()
    }
    
    function handlePropsCrdt(){
      let c;
      c = props.setCrdt
      c();handleClose()
    }
    

    return(

        <div className={styles.footer}>
          
        <Button  variant="light" onClick={handleShow} style={{width:"110px", height:"20px"
    ,paddingTop:"0px", paddingBottom:"0px", marginTop:"0px", marginBottom:"0px"
    ,borderRadius:"20px", position:"relative", marginLeft:"290px", boxSizing:"border-box"
    , backgroundColor:"#b8b8b8" }}  >
        
        <span className="text" style={{marginLeft:"10px", fontSize:"12px", fontWeight:"bold", alignContent:"center", alignItems:"center", display:"flex"}}> 
    swap bridge
        </span>
        <span className="text2" style={{marginLeft:"9px", position:"absolute"
    , fontSize:"12px", marginTop:"0px", fontWeight:"bold" }}>
            
        </span>
     </Button>
     <img src="/images/CRDT.png" alt="girl coding" className="img-responsive"
    
    style={{width:"30px", height:"30px", 
      position:"relative",
        borderRadius:"10px"
     }} />

    

<Modal show={show} className = {styles.primaryModal}  onHide={handleClose} >
        
          <Modal.Title className = {styles.titleModal}>Select a bridge</Modal.Title>
        
        <Modal.Body className={styles.modalBody}>
       
  

  
  
  <Button  variant="light" onClick={handlePropsScrdt}style={{width:"110px", height:"30px"
    ,paddingTop:"0px", paddingBottom:"0px", marginTop:"12px", marginBottom:"0px"
    ,borderRadius:"20px", position:"absolute", marginLeft:"0px"
    , backgroundColor:"#b8b8b8" }} >
        
        <span className="text" style={{marginLeft:"17px", fontSize:"10px", fontWeight:"bold"}}> 
        SCRDT/BSCRDT
        </span>
        
     </Button>
     
     <img src="/images/logoscrdt.jpg" alt="girl coding" className="img-responsive"
    
    style={{width:"20px", height:"20px", 
     marginBottom:"0px", marginTop:"20px", position:"absolute"
     , paddingBottom:"0px",  marginLeft:"5px", marginRight:"80px", borderRadius:"10px",
   
      }} />


        </Modal.Body>
        <Modal.Footer >
        <Button  variant="light" onClick={handlePropsCrdt}style={{width:"100px", height:"30px"
    ,paddingTop:"0px", paddingBottom:"0px", marginTop:"0px", marginBottom:"4px"
    ,borderRadius:"20px", position:"absolute", marginLeft:"300px"
    , backgroundColor:"#b8b8b8" }} >
        
        <span className="text" style={{marginLeft:"16px", fontSize:"10px", fontWeight:"bold"}}> 
        CRDT/BCRDT
        </span>
        
     </Button>
     
     <img src="/images/CRDT.png" alt="girl coding" className="img-responsive"
    
    style={{width:"25px", height:"25px", 
     marginBottom:"1px", marginTop:"0px", position:"absolute"
     , paddingBottom:"0px",  marginLeft:"100px", marginRight:"75px", borderRadius:"10px",
   
      }} />


        
        
        </Modal.Footer>
      </Modal>


        </div>
    )
}
