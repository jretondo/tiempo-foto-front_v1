import formatMoney from 'Function/NumberFormat';
import React from 'react';

const FilaVentas = ({ id, item }) => {
  return (
    <tr key={id}>
      <td style={{ textAlign: 'center' }}>{item.label}</td>
      <td style={{ textAlign: 'center' }}>{item.total_cant_prod}</td>
      <td style={{ textAlign: 'center' }}>$ {formatMoney(item.total_costo)}</td>
      <td style={{ textAlign: 'center' }}>$ {formatMoney(item.total_prod)}</td>
    </tr>
  );
};

export default FilaVentas;
