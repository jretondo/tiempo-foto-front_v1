import UrlNodeServer from 'api/NodeServer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProdSellContext from './index';
import React from 'react';
import moment from 'moment';

const ProdSellProvider = ({ children }) => {
  const [productsSellList, setProductsSellList] = useState([]);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [error, setError] = useState();

  const NewProdSell = async (text, cant) => {
    setError();
    if (productsSellList.length > 29) {
      swal(
        'Cantidad Máxima de Registros',
        'Por cuestiones de formato no se pueden registrar más de 30 productos diferentes. Se recomienda que genere esta factura y agregar otra más de ser necesario.',
        'error',
      );
    } else {
      await axios
        .get(
          UrlNodeServer.productsDir.products + `/1?query=${text}&cantPerPage=1`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('user-token'),
            },
          },
        )
        .then(async (res) => {
          const respuesta = res.data;
          const status = respuesta.status;
          if (status === 200) {
            const data = respuesta.body.data[0];
            if (parseInt(data.unidad) === 0) {
              data.cant_prod = cant;
              data.key =
                Math.random() *
                parseFloat(moment(new Date()).format('YYYYMMDDHHmmssms'));
              console.log('data :>> ', data);
              setProductsSellList((productsSellList) => [
                ...productsSellList,
                data,
              ]);
            } else if (parseInt(data.unidad) === 1) {
              swal({
                text: 'Cantidad de kilos a vender',
                content: 'input',
                button: {
                  text: 'Ingresar',
                  closeModal: false,
                },
              })
                .then((cantidad) => {
                  if (parseFloat(cantidad) > 0) {
                    data.cant_prod = parseFloat(cantidad);
                    data.key =
                      Math.random() *
                      parseFloat(moment(new Date()).format('YYYYMMDDHHmmssms'));
                    setProductsSellList((productsSellList) => [
                      ...productsSellList,
                      data,
                    ]);
                    swal.stopLoading();
                    swal.close();
                  } else {
                    swal(
                      'Error!',
                      'Hubo un error. Controle que haya colocado un número válido!',
                      'error',
                    );
                  }
                })
                .catch(() => {
                  swal(
                    'Error!',
                    'Hubo un error. Controle que haya colocado un número válido!',
                    'error',
                  );
                });
            } else if (parseInt(data.unidad) === 2) {
              swal({
                text: 'Cantidad de litros a vender',
                content: 'input',
                button: {
                  text: 'Ingresar',
                  closeModal: false,
                },
              })
                .then((cantidad) => {
                  if (parseFloat(cantidad) > 0) {
                    data.cant_prod = parseFloat(cantidad);
                    data.key =
                      Math.random() *
                      parseFloat(moment(new Date()).format('YYYYMMDDHHmmssms'));
                    console.log('data :>> ', data);
                    setProductsSellList((productsSellList) => [
                      ...productsSellList,
                      data,
                    ]);
                    swal.stopLoading();
                    swal.close();
                  } else {
                    swal(
                      'Error!',
                      'Hubo un error. Controle que haya colocado un número válido!',
                      'error',
                    );
                  }
                })
                .catch(() => {
                  swal(
                    'Error!',
                    'Hubo un error. Controle que haya colocado un número válido!',
                    'error',
                  );
                });
            }
          }
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const newProductUnregistered = (
    nombre,
    cantidad,
    precio,
    proveedor,
    marca,
  ) => {
    const data = {
      cant_prod: cantidad,
      category: proveedor,
      cod_barra: '0',
      enabled: 1,
      fecha_carga: moment(new Date()).format('YYYY-MM-DD'),
      id_prod: null,
      id_prov: 0,
      iva: 0,
      name: nombre,
      porc_minor: precio,
      precio_compra: 0,
      round: 0,
      short_descr: '',
      subcategory: marca,
      unidad: 0,
      url_img: null,
      vta_fija: 0,
      vta_price: precio,
      key:
        Math.random() *
        parseFloat(moment(new Date()).format('YYYYMMDDHHmmssms')),
    };
    setProductsSellList((productsSellList) => [...productsSellList, data]);
  };

  const retiroEfectivo = (motivo, monto) => {
    const data = {
      cant_prod: 1,
      category: 'Retiro de Efectivo',
      cod_barra: '0',
      enabled: 1,
      fecha_carga: moment(new Date()).format('YYYY-MM-DD'),
      id_prod: null,
      id_prov: 0,
      iva: 0,
      name: motivo,
      porc_minor: -monto,
      precio_compra: 0,
      round: 0,
      short_descr: '',
      subcategory: 'Caja',
      unidad: 0,
      url_img: null,
      vta_fija: 0,
      vta_price: -monto,
      key:
        Math.random() *
        parseFloat(moment(new Date()).format('YYYYMMDDHHmmssms')),
    };
    setProductsSellList((productsSellList) => [...productsSellList, data]);
  };

  const RemoveProduct = (key) => {
    const newList = productsSellList.filter((item) => {
      return item.key !== key;
    });
    setProductsSellList(newList);
  };

  const cancelarCompra = () => {
    setProductsSellList([]);
    setTotalPrecio(0);
    setError();
  };

  return (
    <ProdSellContext.Provider
      value={{
        NewProdSell,
        productsSellList,
        RemoveProduct,
        totalPrecio,
        error,
        cancelarCompra,
        setTotalPrecio,
        newProductUnregistered,
        retiroEfectivo,
      }}
    >
      {children}
    </ProdSellContext.Provider>
  );
};
export default ProdSellProvider;
