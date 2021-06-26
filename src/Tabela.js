
import React from 'react'

function CabecalhoTabela(){
    return(
        <thead>
                    <tr>
                        <td>
                            Estudio
                        </td>
                        <td>
                            Pais
                        </td>
                    </tr>
        </thead>
    )
}

const CorpoTabela=(props)=>{
    const rows=props.dadosDosEstudios.map((row)=>{
    return(
        <tr key={row.id}>
            <td>
                {row.estudio}
            </td>
            <td>
                {row.pais}
            </td>
            <td>
                <button onClick={()=>props.EstudioAEditar(row.id)} class="btn btn-info">Editar</button>
            </td>
            <td>
            <button onClick={()=>props.EstudioAApagar(row.id)} class="btn btn-danger">Apagar</button>
            </td>
        </tr>   
    )
    })
    return(<tbody>{rows}</tbody>)
}

class Tabela extends React.Component{
    render(){
        const {dadosEstudios,id,idEditar}=this.props
        return (
            <table className="table table-striped">
                <CabecalhoTabela/>
                <CorpoTabela dadosDosEstudios={dadosEstudios} EstudioAEditar={idEditar} EstudioAApagar={id}/>
            </table>
        )
    }
}

export default Tabela 