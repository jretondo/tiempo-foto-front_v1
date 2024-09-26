import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import PtosVtas from '../../vender/header/ptosVta';
import { BsCardList } from 'react-icons/bs';
import axios from 'axios';
import UrlNodeServer from '../../../../../../api/NodeServer';
import MarcasMod from '../../../../stock/components/ultMov/components/header/marcas';
import ProveedoresMod from '../../../../stock/components/ultMov/components/header/proveedores';
import ProductosFiltro from '../../../../stock/components/ultMov/components/header/productos';
import UsuariosList from '../../../../stock/components/ultMov/components/header/usersList';

const HeaderListaCaja = ({
  setListaCaja,
  pagina,
  setLoading,
  actualizar,
  group,
  setGroup,
}) => {
  const hoy1 = moment(new Date()).format('YYYY-MM-DD');
  const hoy2 = moment(new Date()).format('YYYY-MM-DD');
  const [ptosVta, setPtoVta] = useState({ id: '' });
  const [ptoVtaList, setPtoVtaList] = useState(
    <option>No hay puntos de venta relacionados</option>,
  );
  const [user, setUser] = useState({ id: '' });
  const [usersList, setUsersList] = useState(
    <option>No hay usuarios listados</option>,
  );
  const [desde, setDesde] = useState(hoy1);
  const [hasta, setHasta] = useState(hoy2);

  const [proveedor, setProveedor] = useState('');
  const [proveedoresList, setProveedoresList] = useState(
    <option>No hay proveedores listados</option>,
  );
  const [marca, setMarca] = useState('');
  const [marcasList, setMarcasList] = useState(
    <option>No hay marcas listadas</option>,
  );

  const [prodId, setProdId] = useState('');

  const getDataInvoices = async () => {
    setLoading(true);
    const query = `?userId=${user.id}&ptoVta=${
      ptosVta.id ? ptosVta.id : ''
    }&desde=${moment(desde).format('YYYY-MM-DD')}&hasta=${moment(hasta).format(
      'YYYY-MM-DD',
    )}&group=${group}&proveedor=${proveedor}&marca=${marca}&prodId=${prodId}`;

    await axios
      .get(UrlNodeServer.invoicesDir.sub.cajaListDet + '/' + pagina + query, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user-token'),
        },
      })
      .then((res) => {
        setLoading(false);
        const status = res.data.status;
        if (status === 200) {
          setListaCaja(res.data.body);
        } else {
          setListaCaja([]);
        }
      })
      .catch(() => {
        setLoading(false);
        setListaCaja([]);
      });
  };

  useEffect(() => {
    getDataInvoices();
    // eslint-disable-next-line
  }, [pagina, actualizar, group]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        getDataInvoices();
      }}
    >
      <Row>
        <Col md="8">
          <Row>
            <PtosVtas
              setPtoVta={setPtoVta}
              setPtoVtaList={setPtoVtaList}
              ptoVtaList={ptoVtaList}
              ptoVta={ptosVta}
              colSize={6}
              all={true}
            />
            <ProductosFiltro setProdId={setProdId} colSize={6} />
          </Row>
          <Row>
            <UsuariosList
              setUser={setUser}
              setUsersList={setUsersList}
              user={user}
              usersList={usersList}
              colSize={4}
            />
            <Col md="4">
              <FormGroup>
                <Label for="desdeTxtCaja">Desde</Label>
                <Input
                  type="date"
                  id="desdeTxtCaja"
                  value={desde}
                  onChange={(e) => setDesde(e.target.value)}
                  max={hasta}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <Label for="desdeTxtCaja">Hasta</Label>
              <Input
                type="date"
                id="desdeTxtCaja"
                value={hasta}
                onChange={(e) => setHasta(e.target.value)}
                min={desde}
              />
            </Col>
          </Row>
          <Row>
            <ProveedoresMod
              setProveedor={setProveedor}
              setProveedoresList={setProveedoresList}
              proveedoresList={proveedoresList}
              proveedor={proveedor}
              colSize={4}
            />
            <MarcasMod
              setMarca={setMarca}
              setMarcasList={setMarcasList}
              marcasList={marcasList}
              marca={marca}
              colSize={4}
            />
            <Col md={4}>
              <FormGroup>
                <Label for="exampleSelect">Agrupación</Label>
                <Input
                  onChange={(e) => setGroup(e.target.value)}
                  value={group}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  <option value={'prod_id'}>Por producto</option>
                  <option value={'subcategory'}>Por Marca</option>
                  <option value={'category'}>Por Proveedor</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col md="4" style={{ textAlign: 'center' }}>
          <Col md="12" style={{ textAlign: 'center', margin: '10px' }}>
            <Button
              color="primary"
              style={{
                height: '100%',
                width: '60%',
                fontSize: '14px',
                minWidth: '125px',
                maxWidth: '170px',
              }}
              type="submit"
            >
              <Row>
                <span style={{ textAlign: 'center', width: '100%' }}>
                  {' '}
                  Listar Ventas
                </span>
              </Row>
              <Row>
                <span
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    fontSize: '25px',
                  }}
                >
                  {' '}
                  <BsCardList />
                </span>
              </Row>
            </Button>
          </Col>
        </Col>
      </Row>
    </Form>
  );
};

export default HeaderListaCaja;
