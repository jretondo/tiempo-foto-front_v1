import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import HeaderListaCaja from './header';
import VentasListMod from './lista';

const ListaCajaModuleDetails = () => {
  const [listaCaja, setListaCaja] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [group, setGroup] = useState('category');

  return (
    <Card style={{ marginTop: '30px' }}>
      <CardBody>
        <HeaderListaCaja
          setListaCaja={setListaCaja}
          pagina={pagina}
          setLoading={setLoading}
          actualizar={actualizar}
          setGroup={setGroup}
          group={group}
        />
        <VentasListMod
          listaCaja={listaCaja}
          pagina={pagina}
          setPagina={setPagina}
          loading={loading}
          setActualizar={setActualizar}
          actualizar={actualizar}
          group={group}
        />
      </CardBody>
    </Card>
  );
};

export default ListaCajaModuleDetails;
