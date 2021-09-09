import React from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import styles from './main.module.scss'
import BuyForm2 from './BuyForm2'
import Modal from './Modal'
import SellForm2 from './SellForm2'
/* Se clicar no botão vai verificar se currentForm=buy
Se tiver igual a buy o content fica igual a buyForm.
O valor default é buy, logo o content default é buyForm.
Porém, se o usuário clica no botão ele quer renderizar o sellForm.
Logo, se clicar e estiver buy tem que setar sell.
O contrário ocorrerá normalmente.
*/
function Main() { 
    let content
    
    const [currentForm, setCurrentForm] = React.useState('buy');
   
    function handle() {   
    if (currentForm=="buy") { 
   

    setCurrentForm('sell')

   
   } 


   else if(currentForm=='crdt') {
      setCurrentForm('sell')
   }
   else if(currentForm=='scrdt') {
    setCurrentForm('sell2')
 }

 else if(currentForm=='sell2') {
  setCurrentForm('scrdt')
}
  
 
    else {

    setCurrentForm('buy')
  }

}
    if(currentForm === 'buy') {
    
        content = <BuyForm/>
    } else if(currentForm==="scrdt"){
      content=<BuyForm2/>
    } else if(currentForm==="crdt"){
      content=<BuyForm/>
    } 
    else if(currentForm==="sell2"){
      content=<SellForm2/>
    } 
     else 
    content= <SellForm />
    //  content = <SellForm/>
    
    function handleScrdtForm(){

      setCurrentForm('scrdt')
    }

    function handleCrdtForm(){

      setCurrentForm('crdt')
    }
    return (
      
      <div className={styles.card}>

<Modal onClick={handleScrdtForm} setCrdt={handleCrdtForm}/> 
        
      <div className="card" style={{borderRadius:"50px", width:"500px" }} >
       
        <div className="card-body" style={{backgroundColor:"#1a2c3f", borderRadius:"50px"}}>
  
<button className={styles.button}
onClick={handle}> ↓ </button>
            {content}
           
            </div>
          </div>
          </div>
    );
   
}

export default Main;