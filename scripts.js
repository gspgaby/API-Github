class Model {
    constructor(){
        this._nome = "";
        this._login = "";
        this._repositorio = "";
    }

    Usuario(nomeDeUsuario){
        let request = new XMLHttpRequest
        request.addEventListener ('load', () => {
            if (request.status === 200) {
                let info = JSON.parse(request.responseText)
                this.atualiza(info)
            } else {
                erro(request.status)
            }
        })
        request.open("GET", `https://api.github.com/users/${nomeDeUsuario}`, false)
        request.send()
    }

    Repositorio (nomeDeUsuario) {
        let request = new XMLHttpRequest
        request.addEventListener ('load', () => {
            if (request.status === 200) {
                let info = JSON.parse(request.responseText)
                this.repositorio = info;
            }
        })
        request.open("GET", `https://api.github.com/users/${nomeDeUsuario}/repos`, false)
        request.send()
    }

    atualiza(info) {
        this._nome = info.name ;
        this._login = info.login;
    }
        getNome(){
            return this._nome;
        }
        getLogin(){
            return this._login;
        }
}

function erro (numErro) {
    body.innerHTML = ` <section id="container-erro">
    <p>
        ERRO ${numErro}
    </p>
    
    <a href="index.html">tente novamente</a>
</section>`
}

class Viewer {
    MostrarUsuario(info) {
        let nome = document.querySelector("#nome")
        nome.innerText = info.getNome()

        let login = document.querySelector("#username")
        login.innerText = info.getLogin()
    }

    MostrarRepositorio(info) {
        let repositorios = info.repositorio
        for(let repo of repositorios) {

            let repoind = document.querySelector("#repositoriosUsuario")
            let buttons = document.createElement("div")
            buttons.classList.add("buttons")
            repoind.appendChild(buttons)
    
            let link = document.createElement("a")
            link.classList.add("link")
            link.innerText = repo.name
            link.href = repo.html_url
            buttons.appendChild(link)
    
            let paragrafo = document.createElement("p")
            paragrafo.classList.add("paragrafo")
            paragrafo.innerText = repo.language
            buttons.appendChild(paragrafo)
        }   
    }
}

class Controller {
    ProcurarUsuario(nomeDeUsuario){
        let model = new Model
        model.Usuario (nomeDeUsuario) 

        let viewer = new Viewer
        viewer.MostrarUsuario (model)
    }

    ProcurarRepositorio (nomeDeUsuario) {
        let model = new Model
        model.Repositorio (nomeDeUsuario) 

        let viewer = new Viewer
        viewer.MostrarRepositorio (model)
    }
}

let botao = document.querySelector("#botao");
let body = document.querySelector("body")

let controller = new Controller
botao.addEventListener('click' , function () {
    let search = document.querySelector("#search");
    
    let nomeDeUsuario = search.value
    body.innerHTML = ` <section id="container">
        <h2 class="titulo">
            Projeto Resilia - API Github
        </h2>
<main>
        <div id="perfil">
        <h2 class="titulo">
            Perfil do Usuário
        </h2>
        <img id="imgPerfil" src="./images/GITHUB.png" alt="">
            <p id="nome">Nome</p>
            <p id="username">Usuario</p><br>
            
        </div>
        <div id="repositorio">
            <header>
                <h2 class="titulo">Meus repositórios</h2>
            </header>
        <div id="repositoriosUsuario">
            
        </div>
    </div>
</main>

<footer id-"footer">
<div id="socialMedia">
            <a href="https://www.facebook.com/gaby.dossantospereira/"><img class="midia" src="./images/facebook.png" alt=""></a>
            <a href="https://github.com/gspgaby"><img class="midia" src="./images/GITHUB.png" alt=""></a>
            <a href="https://www.linkedin.com/in/gabriella-dos-santos-pereira-762a7819a/"><img class="midia" src="./images/linkedin.jpg" alt=""></a>
            </div>
</footer>
</section>`
    controller.ProcurarUsuario(nomeDeUsuario);
    controller.ProcurarRepositorio(nomeDeUsuario);
})  
