import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Col, FormGroup, Input, Label } from 'reactstrap'

const UsuariosList = ({
    setUser,
    setUsersList,
    user,
    usersList,
    colSize
}) => {
    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, [])

    const getUsers = async () => {
        await axios.get(UrlNodeServer.usuariosDir.usuarios, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    const ptoVtaData = [
                        {
                            id: false,
                            nombre: '',
                            apellido: '',
                            usuario: 'Todos'
                        },
                        ...respuesta.body.data, 
                    ]    
                    console.log('ptoVtaData :>> ', ptoVtaData);
                    setUsersList(
                        ptoVtaData.map((item, key) => {
                            if (user.id === 0) {
                                if (key === 0) {
                                    setUser(item)
                                }
                            }
                            return (
                                <option value={JSON.stringify(item)} key={key} >{`(Usuario: ${item.usuario}) ${item.nombre} ${item.apellido}`}</option>
                            )
                        })
                    )
                } else {
                    mydata()
                }
            }).catch(() => { mydata() })
    }

    const mydata = async () => {
        await axios.get(UrlNodeServer.usuariosDir.sub.mydata, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        })
            .then(res => {
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    const ptoVtaData = respuesta.body
                    setUsersList(
                        ptoVtaData.map((item, key) => {
                            if (user.id === 0) {
                                if (key === 0) {
                                    setUser(item)
                                }
                            }
                            return (
                                <option value={JSON.stringify(item)} key={key} >{`(Usuario: ${item.usuario}) ${item.nombre} ${item.apellido}`}</option>
                            )
                        })
                    )
                } else {

                }
            }).catch((error) => { console.log('error :>> ', error); })
    }

    return (
        <Col md={colSize} >
            <Label for="ptoVtaTxt">Usuarios</Label>
            <FormGroup>
                <Input type="select" id="ptoVtaTxt" onChange={e => setUser(JSON.parse(e.target.value))} value={JSON.stringify(user)}>
                    {usersList}
                </Input>
            </FormGroup>
        </Col>
    )
}

export default UsuariosList