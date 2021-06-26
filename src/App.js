import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Tabela from './Tabela';
import Formulario from './Formulario';
import FormularioEdit from './FormularioEdit';


async function getEstudios(){
  let resposta = await fetch("api/EstudiosAPI");
  if(!resposta.ok){
    console.error("Não foi possivel ler os dados da API" + resposta.status);
  }
  return await resposta.json();
}

async function adicionaEstudio(novoEstudio) {
  // https://developer.mozilla.org/pt-BR/docs/Web/API/FormData
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
  let formData = new FormData();
  formData.append("estudio", novoEstudio.Estudio);
  formData.append("pais", novoEstudio.Pais);

  let resposta = await fetch("api/EstudiosAPI", {
    method: "POST",
    body: formData
  });

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos escrever os dados na API. Código: " + resposta.status);
  }
  return await resposta.json();
}

async function editEstudio(estudioEditado){
  
  let resposta = await fetch("api/EstudiosAPI/"+estudioEditado.Id);
  let estudio =  await resposta.json();

  let formData = new FormData();
  formData.append("id",estudio.id);
  formData.append("estudio",estudioEditado.Estudio);
  formData.append("pais",estudioEditado.Pais);

  let respostaEdit = await fetch("api/EstudiosAPI/"+estudioEditado.Id, {
    method: "PUT",
    body: formData
  });

  if (!respostaEdit.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos escrever os dados na API. Código: " + resposta.status);
  }
}

function refresh(){
  window.location.reload(false);
}

async function apagaOEstudio(index){
  let resposta = await fetch("api/EstudiosAPI/"+index);
  let estudio =  await resposta.json();
  
  let formData = new FormData();
  formData.append("id",estudio.id);
  formData.append("estudio",estudio.estudio);
  formData.append("pais",estudio.pais);
  formData.append("estado","apagado");
  let respostaEdit = await fetch("api/EstudiosAPI/"+index, {
    method: "PUT",
    body: formData
  });

  if (!respostaEdit.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos escrever os dados na API. Código: " + resposta.status);
  }
  
}

class App extends React.Component{

constructor(props){
  super(props);
  this.state={
    //vai conter os dados dos estudios
    estudios:[],
    
    loadstate:"",

    estudioEdit:[{id:0,estudio:"",pais:""}],

    errorMessage:null
  }
}



componentDidMount(){
  
  this.loadEstudios();
}

async loadEstudios(){

  //1. Buscar os dados da API (fetch)
  //2. Atualizar os dados da state
  try{
    this.setState({loadstate:"Carregando dados"})
    let estudiosVindosDaAPI = await getEstudios();

    this.setState({estudios:estudiosVindosDaAPI,loadstate:"Sucesso"});
  }catch(erro){
    this.setState({loadstate:"erro",errorMessage:erro.toString()})
    console.error("Erro ao ler as os dados dos Estudios da API",erro);
  }
}

handlerGuardaEstudio = async (dadosDaSerieACarregar) => {
  // Tarefas
  // 1. gerar os dados a exportar
  // 2. enviá-los para a API
  // 3. efetuar o Reload da tabela

  // 1. - já está feito. É o parâmetro de entrada nesta função

  try {
    // 2. 
    await adicionaEstudio(dadosDaSerieACarregar);

    // 3.
    await this.loadEstudios();

    
  } catch (erro) {
    console.error("não consegui inserir os dados do estudio", erro);
  }

}

handlerEditarEstudio = async (dadosDoEstudioACarregar)=>{
  try{
    
    await editEstudio(dadosDoEstudioACarregar);
    await this.loadEstudios();
  }catch(erro){
    console.error("Não consegui editar os dados do estudio",erro);
  }
}

apagaEstudio=async(index)=>{
  try{
    await apagaOEstudio(index);

    await this.loadEstudios();
  }
  catch(erro){
  console.error("não consegui apagar os dados do estudio",erro);
  }
}

editaEstudio= async(index)=>{
  try{
    let resposta = await fetch("api/EstudiosAPI/"+index);
    const json =  await resposta.json();
    
    await this.setState({estudioEdit:json});
  }catch(erro){

  }
}




render(){
  
  const {estudios} = this.state;

  switch(this.state.loadstate){
    case"Carregando dados":
    return <p>A carregar os dados. Aguarde, por favor...</p>
    case"erro":
    return <p>Ocorreu um erro: {this.state.errorMessage+'.' ?? "Não sabemos qual."}</p>
    case"Sucesso":
    
  
  return (
    <div className="container">
      <tr >
      <td>
      <h4>Adicione um estudio| </h4>
      <hr></hr>
      <Formulario dadosRecolhidos={this.handlerGuardaEstudio}/>
      </td>
      
      <td>
      <h4> Edite um estudio</h4>
      <hr></hr>
      <FormularioEdit dadosAEditar={this.state.estudioEdit} dadosEditRecolhidos={this.handlerEditarEstudio}/>
      </td>
      </tr>
      <h4>Lista de estudios</h4>
      <hr></hr>
      <Tabela dadosEstudios={estudios} idEditar={this.editaEstudio} id={this.apagaEstudio}/><br></br>
      
      
    </div>
  )
  default : return null
}
}
}
export default App;
