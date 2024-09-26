import ListadoTable from 'components/subComponents/Listados/ListadoTable';
import FilaVentas from 'components/subComponents/Listados/SubComponentes/FilaDetallesVentas';
import Paginacion from 'components/subComponents/Paginacion/Paginacion';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import FilaEspera from './FilaEspera';

const VentasListMod = ({
  listaCaja,
  pagina,
  setPagina,
  loading,
  setActualizar,
  actualizar,
  group,
}) => {
  const label = () => {
    if (group === 'subcategory') {
      return 'Marcas';
    } else if (group === 'category') {
      return 'Proveedores';
    } else {
      return 'Productos';
    }
  };

  const [call, setCall] = useState(false);
  const [plantPaginas, setPlantPaginas] = useState(<></>);
  const [ultimaPag, setUltimaPag] = useState(1);
  const [dataState, setDataState] = useState({});
  const [listadoVentas, setListadoVentas] = useState(
    <tr>
      <td></td>
      <td>No hay ventas con los filtros colocados</td>
    </tr>,
  );
  const [principalLabel, setPrincipalLabel] = useState(label());

  const titulos = [
    principalLabel,
    'Cantidad Vendida',
    'Costo Total',
    'Venta Total',
  ];

  useEffect(() => {
    setPrincipalLabel(label());
  }, [group]);

  useEffect(() => {
    try {
      const data = listaCaja.data;
      const pagesObj = listaCaja.pagesObj;
      if (data.length > 0) {
        setDataState(pagesObj);
        setUltimaPag(pagesObj.totalPag);
        setListadoVentas(
          // eslint-disable-next-line
          data.map((item, key) => {
            return (
              <FilaVentas
                key={key}
                id={key}
                item={item}
                pagina={pagina}
                setPagina={setPagina}
                setActualizar={setActualizar}
                actualizar={actualizar}
              />
            );
          }),
        );
      } else {
        setListadoVentas(
          <tr>
            <td></td>
            <td>No hay ventas con los filtros colocados</td>
          </tr>,
        );
      }
    } catch (error) {
      setListadoVentas(
        <tr>
          <td></td>
          <td>No hay ventas con los filtros colocados</td>
        </tr>,
      );
    }
  }, [listaCaja]);

  return (
    <>
      <Row>
        <Col>
          {loading ? (
            <ListadoTable titulos={titulos} listado={<FilaEspera />} />
          ) : (
            <ListadoTable titulos={titulos} listado={listadoVentas} />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col>
          {loading ? null : (
            <Paginacion
              setPagina={setPagina}
              setCall={setCall}
              pagina={pagina}
              call={call}
              plantPaginas={plantPaginas}
              ultimaPag={ultimaPag}
              data={dataState}
              setPlantPaginas={setPlantPaginas}
              setUltimaPag={setUltimaPag}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default VentasListMod;
