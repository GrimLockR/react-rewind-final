import React from 'react'

//formulario para adcionar um estudio novo
class Formulario extends React.Component{

constructor(props){
    super(props);
    //variavei para guardarem os dados introduzidos
    this.state={
        Estudio:"",
        Pais:""
    }
}
//hnadler que processa os dados fornecidos pelo o formulário
handlerSubmitForm=(evento)=>{
    //impedir que o formulario envie automaticamente os dados para o servidor
    //essa tarefa e realizado pelo o componente <App />
    evento.preventDefault();
    //prepara os dados para serem enviados para a App
    let dadosForm={
        Estudio:this.state.Estudio,
        Pais:this.state.Pais
        
    }
    //realiza a exportação do dados para a App
    this.props.dadosRecolhidos(dadosForm);
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
                     <div className="col-md-10">
                Estudio:<input type="text" className="form-control" value={this.state.Estudio} required onChange={this.handlerEstudioAdicao}/><br/>
                Pais:<input type="text" className="form-control" value={this.state.Pais} required onChange={this.handlerPaisAdicao}/><br/>
                </div>
                </div>
                <input type="submit" value="Adicionar estudio" className="btn btn-outline-primary"/><br/>
            </form>
        )
    }
}

export default Formulario