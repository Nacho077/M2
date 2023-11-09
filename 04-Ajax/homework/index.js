const boton = $('#boton') // document.getElementById('boton')

boton.click(() => { // boton.addEventLIstener('click', () => {})
    const listaAmigos = $('#lista')
    const img = $('#gif')

    if (boton.text() == 'Ver Amigos') {
        boton.text('Ocultar')
        $.get('http://localhost:5000/amigos', amigos => {
            listarAmigos(amigos)
        })

        img.css('display', 'none')
    } else {
        boton.text('Ver Amigos')
        listaAmigos.empty()

        img.css('display', 'block')
    }
})

$('#search').click(() => {
    const id = $('#input').val()
    
    if(id){
        if(isNaN(Number(id))) {
            alert('el id deben ser numeros')
        }

        $.get(`http://localhost:5000/amigos/${id}`, friend => {
            $('#amigo').text(friend.name)
        })

        $('#input').val('')
    } else {
        alert('Agrega un id')
    }
})

$('#delete').click(() => {
    const id = $('#inputDelete').val()

    $.ajax({
        url: `http://localhost:5000/amigos/${id}`,
        type: "DELETE",
        success: result => {
            if(boton.text() !== 'Ver Amigos') {
                listarAmigos(result)
            }

            $('#success').text(`El amigo con id ${id} fue eliminado exitosamente`)

            $('#inputDelete').val('')
        }
    })
})

const listarAmigos = amigos => {
    const listaAmigos = $('#lista')
    listaAmigos.empty()

    for(let i = 0; i < amigos.length; i++) {
        var friend = amigos[i]
        const li = `<li>${friend.name}</li>` //document.createElement('li')
        listaAmigos.append(li) // listaAmigos.appendChild(li)
    }
}
