import React from 'react'

class FormularioEdit extends React.Component{

constructor(props){
    super(props);
    //variavei para guardarem os dados introduzidos
    this.state={
        Estudio:"",
        Pais:"",
        Id:0
    }
}

//recebe os dados do parent e ira escreve os dados selecionados nas textbox
async componentWillReceiveProps(nextprops){
    const {dadosAEditar}=nextprops;
    if(dadosAEditar.estudio!==undefined){
        
    await this.setState({Estudio:dadosAEditar.estudio})
    await this.setState({Pais:dadosAEditar.pais})
    await this.setState({Id:dadosAEditar.id})
    }
}
//hnadler que processa os dados fornecidos pelo o formulário
handlerSubmitForm=(evento)=>{
    //impedir que o formulario envie automaticamente os dados para o servidor
    //essa tarefa e realizado pelo o componente <App />
    evento.preventDefault();
    let dadosForm={
        //prepara os dados para serem enviados para a App
        Id:this.state.Id,
        Estudio:this.state.Estudio,
        Pais:this.state.Pais
        
    }
    //realiza a exportação do dados para a App
    this.props.dadosEditRecolhidos(dadosForm);
}
//processa os dados , dados pelo utilizador em relação do nome do estudio
handlerEstudioAdicao=(evento)=>{
        // guardar os dados recolhidos sobre o nome do estudio

    this.setState({Estudio:evento.target.value});

}
//processa os dados , dados pelo utilizador em relação ao país do estudio

handlerPaisAdicao=(evento)=>{
        // guardar os dados recolhidos sobre o país do estudio

    this.setState({Pais:evento.target.value});
}

    render(){
   // ler os dados que foram fornecidos à Tabela como parâmetro de entrada/saída
 
        const {Estudio,Pais}=this.state;

        return(
            <form onSubmit={this.handlerSubmitForm}>
                <div className="row">
                     <div className="col-md-12">
                Estudio:<input type="text" id="estudio" className="form-control" value={this.state.Estudio} required onChange={this.handlerEstudioAdicao}/><br/>
                Pais:<input type="text" id="pais" className="form-control" value={this.state.Pais} required onChange={this.handlerPaisAdicao}/><br/>
                </div>
                </div>
                <input type="submit" value="Editar estudio" className="btn btn-outline-primary"/><br/>
            </form>
        )
    }
}

export default FormularioEdit