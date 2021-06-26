import React from 'react'

class Formulario extends React.Component{

constructor(props){
    super(props);

    this.state={
        Estudio:"",
        Pais:""
    }
}

handlerSubmitForm=(evento)=>{
    evento.preventDefault();
    let dadosForm={
        Estudio:this.state.Estudio,
        Pais:this.state.Pais
        
    }
    this.props.dadosRecolhidos(dadosForm);
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