const { INCREMENTO, DECREMENTO } = require('../action-types');

const initialState = {
  contador: 150,
  test: "test",
  test2: []
}

// Nuestro reducer que maneja nuestros dos casos de acción incremento y decremento.
// Recibe el estado de nuestro store, junto con una action creada por nuestro action creator. 
// ¿Qué tiene que hacer el reducer con el contador de cada caso?

function contador(state = initialState, action) {
  switch(action.type) {
    case INCREMENTO:
      return {
        ...state,
        contador: ++state.contador 
      }
    case DECREMENTO:
      return {
        ...state,
        contador: --state.contador 
      }
    default:
      return {
        ...state
      }
  }
}

module.exports = contador;