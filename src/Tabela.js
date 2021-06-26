
import React from 'react'

//componete que é utilizada para a construção da tabela
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

/**
 * componente que representa o Corpo da Tabela
 * Esta versão da componente recebe como parâmetro o conjunto das 'props'
 * existentes no projeto
 */
const CorpoTabela=(props)=>{
    // vamos recuperar os dados do parâmetro de entrada: dadosDosEstudios
    // o 'map' funciona como um 'foreach' que irá iterar todos os items dos dados lidos
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
        // ler os dados que foram/são fornecidos à Tabela,
        // como parâmetro de entrada/saída
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