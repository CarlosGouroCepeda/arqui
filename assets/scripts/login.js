const mensajeError = document.getElementsByClassName("error")[0]

document.getElementById("login-form").addEventListener("submit",async (e)=>{
  e.preventDefault();
  const username = e.target.children.user.value;
  const password = e.target.children.password.value;
  const res = await fetch("https://arqui-backend.azurewebsites.net/api/usuarios/login",{
    method:"POST",
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username,password
    })
  });
  console.log(res);

  if(!res.ok) return mensajeError.classList.toggle("escondido",false);
 
  if(res.ok){
    alert("INICIO DE SESION CORRECTO!");
    window.location.href = '../platos.html';
  }
})
