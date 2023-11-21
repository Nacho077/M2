import React from "react";
import styledSpecies from "./Species.module.css";

export default function Species({ species, handleSpecies, handleAllSpecies }) {
  return <div className={styledSpecies.divContent}>
    <h2>Species</h2>
    {species.map((specie, idx) =>(
      <button
        key={idx}
        onClick={handleSpecies}
        value={specie}
        name={specie}
      >{specie}</button>))}
      <button onClick={handleAllSpecies}>All Animals</button>
  </div>
}
