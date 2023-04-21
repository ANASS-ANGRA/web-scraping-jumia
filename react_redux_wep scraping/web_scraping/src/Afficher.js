import React, { useState ,useEffect } from 'react';
import axios from 'axios'



function Contenu(){
     const[data,setdata]=useState([])
     const [current, setCurrent] = useState(1);

     const handleNext = () => {
       if (current < 4) {
         setCurrent(current + 1);

       }
     }
   
     const handlePrev = () => {
       if (current > 1) {
         setCurrent(current - 1);
       }
     }
   

   
   

    useEffect(()=>{
         const a=axios.get(`http://127.0.0.1:5000/scraping/${current}`).then((Response)=>
          setdata(Response.data)
         )
    })
    console.log(data[0])
    const a =data.map((e)=>{
      return(
         <div className="col" key={e.desc}>
            <div className="card h-100">
           <img src={e.image_url} className="card-img-top" alt="..."/>
           <div className="card-body">
             <h5 className="card-title">{e.desc}</h5>
             <h3 className="card-text">prix:{e.prix}</h3>
             <p>promo{e.promo}</p>
             <p>old prix{e.old_prix}</p>
           </div>
         </div>
         </div>
         )

      
        
     
    })
    console.log(a)
    return(
      <div>
       <div className='row row-cols-1 row-cols-md-3 g-2'>
          {a}
       </div>
       <button onClick={handlePrev}>Précédent</button>
         <button onClick={handleNext}>Suivant</button>
       </div>
    )
}


export default Contenu