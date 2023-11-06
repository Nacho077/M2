var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
    // if (matchFunc(startEl)) { // matcheando los hijos
    //   // todo / si es true pushea dicho elemento en el arr
    //   resultSet.push(startEl);
    // }
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl) === true) {
    resultSet.push(startEl)
  }

  for(let i = 0; i < startEl.children.length; i++) { // childNode() [h1, h2, div, p, p]
    resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, startEl.children[i]))
  }

  return resultSet

  // =========================================================

  // for (let i = 0; i < startEl.children.length; i++) { // matcheando los hijos
  //   //todo / verifica por cada iteracion si es un elemento
  //   if (startEl.children[i].nodeType === 1) {
  //     // todo / verifica si matchfunc da true o false. comparando el elemento obtenido porla iteracion y el obtenido por parametro dado por el usuario.
  //     if (matchFunc(startEl.children[i])) {
  //       // todo / si es true pushea dicho elemento en el arr
  //       resultSet.push(startEl.children[i]);
  //     }
  //     //todo / la recursion la hace para buscar dentro de ese elemento.
  //     resultSet = resultSet.concat(
  //       traverseDomAndCollectElements(matchFunc, startEl.children[i])
  //     );
  //   }
  // }

  // ===========================================

  // function traverse(startEl) {
  //   if (matchFunc(startEl)) {
  //     resultSet.push(startEl);
  //   }

  //   for (var i = 0; i < startEl.children.length; i++) {
  //     traverse(startEl.children[i]);
  //   }
  // }

  // traverse(startEl);

  // return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) { // .class
  // tu código aquí
  // if (selector[0] === '#') { // selector.startsWith('#')
  //   return 'id'
  // }

  // if (selector[0] === '.') { // selector.charAt(0)
  //   return 'class'
  // }

  // if (selector.includes('.')) { // selector.split('.') => .class => [class] // tag.class => [tag, class]
  //   return 'tag.class'
  // }

  // return 'tag'

  // var arreglo = Array.from(selector); // [., c, l, a, s, s]
  // if (arreglo[0]==="#") return "id"
  // if (arreglo[0]===".") return "class"
  // for(var i =1; i < arreglo.length; i++){
  //   if (arreglo[i]===".") return "tag.class"
  //   if (arreglo[i]===">") return "child"
  // }
  // return "tag";

  switch(selector[0]) {
    case '.':
      return 'class'
    case '#':
      return 'id'
    default:
      return selector.includes('.') ? 'tag.class' : 'tag'
  }
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

// "Hola como andas".slice(1, 6) => "ola c"

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { // <div className='test' id='id'>
    matchFunction = element => element.id == selector.slice(1) // id == #id => # + id === selector
  } else if (selectorType === "class") {
    matchFunction = element => {
      var classList = element.classList
      return classList.contains(selector.slice(1)) // selector.replace('.', 'A') ".cl.a.ss." => "AclAaAssA"
      // classList.contains(selector.split('.')[0]) => ".class" => ["class"]
    }
  } else if (selectorType === "tag.class") {
    matchFunction = element => {
      var [tag, clas] = selector.split('.') // [tag, class]
      // return element.tagName === tag.toUpperCase() && element.classList.contains(clas)
      return matchFunctionMaker(tag)(element) && matchFunctionMaker("." + clas)(element)
    }
  } else if (selectorType === "tag") {
    matchFunction = element => {
      return element.tagName === selector.toUpperCase()
    }
  }

  return matchFunction;
};

var $ = function (selector) { // .clase - #id - div - div.class
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
