import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';

const CahshWModal = ({ open, handleClose, retiroEfectivo }) => {
  const [motivo, setMotivo] = useState('');
  const [monto, setMonto] = useState(0);

  const newProductSubmit = (e) => {
    e.preventDefault();
    retiroEfectivo(motivo, monto);
  };

  return (
    <Modal isOpen={open} toggle={handleClose} size="md">
      <ModalHeader toggle={handleClose}>Cargar Retiro de Efectivo</ModalHeader>
      <ModalBody>
        <Form onSubmit={newProductSubmit}>
          <Row>
            <Col md="8">
              <FormGroup>
                <Label>Motivo</Label>
                <Input
                  type="text"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Monto</Label>
                <Input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  step={0.01}
                  min={0.01}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="pt-4" style={{ textAlign: 'right' }}>
              <Button color="primary">Cargar</Button>
              <Button color="danger" onClick={handleClose}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CahshWModal;
