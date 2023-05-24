const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    apellido: false,
    correo: false
};

const validarFormulario = (e) => {
    switch (e.target.name){
          case "nombre":
          validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
            case "apellido":
                validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
            case "correo":
                validarCampo(expresiones.correo, e.target, 'correo');
            break;
        }
}

const validarCampo = (expresion, input, campo)=>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo_${campo} .invalid-feedback`).classList.remove('invalid-feedback-activo');
        campos[campo] = true;
        console.log("Es correcto")
    }else{
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo_${campo} .invalid-feedback`).classList.add('invalid-feedback-activo');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    if(campos.nombre && campos.apellido){
        formulario.reset();
        console.log("funciona")

        document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
        document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
        setTimeout(()=>{
            document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
        }, 5000);

    }else{
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
    }
});

