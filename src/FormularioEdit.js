import React from 'react'

class FormularioEdit extends React.Component{

constructor(props){
    super(props);

    this.state={
        Estudio:"",
        Pais:"",
        Id:0
    }
}

async componentWillReceiveProps(nextprops){
    const {dadosAEditar}=nextprops;
    if(dadosAEditar.estudio!==undefined){
        
    await this.setState({Estudio:dadosAEditar.estudio})
    await this.setState({Pais:dadosAEditar.pais})
    await this.setState({Id:dadosAEditar.id})
    }
}

handlerSubmitForm=(evento)=>{
    evento.preventDefault();
    let dadosForm={
        Id:this.state.Id,
        Estudio:this.state.Estudio,
        Pais:this.state.Pais
        
    }
    this.props.dadosEditRecolhidos(dadosForm);
}

handlerEstudioAdicao=(evento)=>{
    this.setState({Estudio:evento.target.value});

}

handlerPaisAdicao=(evento)=>{
    this.setState({Pais:evento.target.value});
}

    render(){
        
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