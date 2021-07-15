import React from 'react';


const SpacesCards = (props) => {
 
  const allSpaces = props.allSpaces

  return(
      <>
      <h2>Our spaces</h2>
      <div>
        {allSpaces.map(item => {
          return(
       
            <div key={item._id}>
              <h4>Name: {item.spaceName}</h4>
              <h4>Type: {item.spaceType}</h4>
              <h4>Image: {item.imageUrlSpace}</h4>
              {item.services.map(item => {
                return(
                  <>
                  <h4>Services:</h4> 
                   <p key={item._id}>{item.product}</p>
                  </>
                )                
              })}
              {/* {item.price.map(item => {
                return(
                  <>
                  <h4>Price:</h4> 
                   <p key={item._id}>{item.duration}, {item.price}</p>
                  </>
                )                
              })}               */}
           </div>     
          )
        })}        

      </div>
      </>
    )
  
}

export default SpacesCards;