const { INCREMENTO, DECREMENTO } = require('../action-types');

const initialState = {
  a: "",
  b: [],
  contador: 10
}

// Nuestro reducer que maneja nuestros dos casos de acción incremento y decremento.
// Recibe el estado de nuestro store, junto con una action creada por nuestro action creator. 
// ¿Qué tiene que hacer el reducer con el contador de cada caso?

function contador(state = initialState, action) { // {contador: 0}, {type: INCREMENTO}
  console.log(state, action)
  switch(action.type) {
    case INCREMENTO:
      return {
        ...state, // {a: "", b: [], contador: 0}
        contador: state.contador + 1
      }
    case DECREMENTO:
      return {
        ...state,
        contador: state.contador === 0 ? 0 : state.contador - 1
      }
    case "TEST":
      return {
        ...state,
        c: {"test": action.payload}
      }
    default: 
      return state
  }
}

module.exports = contador;