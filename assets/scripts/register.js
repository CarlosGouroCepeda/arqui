const mensajeError = document.getElementsByClassName("error")[0]

document.getElementById("register-form").addEventListener("submit",async (e)=>{
  e.preventDefault();
  const username = e.target.children.user.value;
  const email = e.target.children.email.value;
  const password = e.target.children.password.value;
  const res = await fetch("http://localhost:3000/api/usuarios/register",{
    method:"POST",
    headers:{
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username,email,password
    })
  });
  console.log(res);

  if(!res.ok) return mensajeError.classList.toggle("escondido",false);
 
  if(res.ok){
    alert("¡REGISTRO EXITOSO!");
    window.location.href = '../login.html';
  }
})
