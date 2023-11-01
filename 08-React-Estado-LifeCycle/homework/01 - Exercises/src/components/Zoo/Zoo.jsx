import React from "react";
// eslint-disable-next-line no-unused-vars
import Animals from "../Animals/Animals";
// eslint-disable-next-line no-unused-vars
import Species from "../Species/Species";
import styledZoo from "./Zoo.module.css";

export default function Zoo() {
  /* Escribe acá tu código */
  const [zoo, setZoo] = React.useState({
    zooName: "",
    animals: [],
    species: [],
    allAnimals: []
  })

  React.useEffect(() => {
    fetch('http://localhost:3001/zoo')
    .then(res => res.json())
    .then(data => setZoo({
      ...zoo,
      animals: data.animals,
      species: data.species,
      allAnimals: data.animals
    }))
    .catch(error => alert(error))
  }, [])

  const handleInputChange = ({target: {value}}) => {
    setZoo({
      ...zoo,
      zooName: value
    })
  }

  const handleSpecies = event => {
    const filterAnimals = zoo.allAnimals.filter(animal => animal.specie == event.target.value)
    setZoo({
      ...zoo,
      animals: filterAnimals
    })
  }

  const handleAllSpecies = () => {
    setZoo({
      ...zoo,
      animals: zoo.allAnimals
    })
  }

  return (
    <div>
      <label>Zoo Name:</label>
      <input type="text" onChange={handleInputChange} value={zoo.zooName} />
      <h1>{zoo.zooName}</h1>
      <Species
        species={zoo.species}
        handleSpecies={handleSpecies}
        handleAllSpecies={handleAllSpecies}
      />
      <Animals animals={zoo.animals} />
    </div>
  );
}
