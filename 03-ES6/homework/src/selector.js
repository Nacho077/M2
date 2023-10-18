var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  // let recorrerDom = function(element) {
  //   if(matchFunc(element)) resultSet.push(element)

  //   let childrens = element.children
  //   for(let i = 0; i < childrens.length; i++) {
  //     recorrerDom(childrens[i])
  //   }
  // }
  
  if(matchFunc(startEl)) resultSet.push(startEl)

  let childrens = startEl.children
  for(let i = 0; i < childrens.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, childrens[i])
    resultSet = [...resultSet, ...result]
  }

  return resultSet
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) { // #asdsa => "id", .asdfg => "class"
  // tu código aquí
  if(selector.startsWith("#")) return "id"
  if(selector.startsWith(".")) return "class"
  if(!selector.includes(".") && !selector.includes(" ")) return "tag" // se puede con regex /[.\s]+/
  return "tag.class"
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  console.log(selector) // div.class
  // div
  // .class

  if (selectorType === "id") {
    matchFunction = function(element) { // #id
      // return element.id === selector.slice(1)
      return "#" + element.id === selector // id === #id
    }
  } else if (selectorType === "class") { //.test
    matchFunction = function(element) { // <div class="hola test"/>
      //return element.className.includes(selector.slice(1)) // "hola test"
      return element.classList.contains(selector.slice(1)) // ["hola", "test"]
    }
  } else if (selectorType === "tag.class") { // div.class
    let [tag, classNames] = selector.split(".") // [div, class]
    // let tag = selector.split(".")[0] // div
    // let classNames = selector.split(".")[1] // class
    matchFunction = function(element) {
      return (matchFunctionMaker(tag)(element) && matchFunctionMaker("." + classNames)(element)) // div
      // return (element.tagName.toLowerCase() === tag.toLowerCase() && element.classList.contains(classNames))
    }
  } else if (selectorType === "tag") { // div
    matchFunction = function(element) {
      return element.tagName === selector.toUpperCase()
    }
  }

  return matchFunction;
};

// let tagFunction = matchFunctionMaker("div") // = function(element){...}
// tagFunction(element)

// matchFunctionMaker("div")(element)

var $ = function (selector) { // $("#asdsad") // .asdsad // div // div.asdfas
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
