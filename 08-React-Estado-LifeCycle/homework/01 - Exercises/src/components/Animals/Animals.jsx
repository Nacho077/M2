import React from 'react';
import styledAnimals from './Animals.module.css'

export default (props) => {

    return <div className={styledAnimals.container}>
      {props.animals.map((anim, idx) => (
        <div className={styledAnimals.containerAnimals} key={idx}>
          <h5>{anim.name}</h5>
          <img src={anim.image} alt={anim.name} width='300px' />
          <span>{anim.specie}</span>
        </div>
      ))}
    </div>
  
}
