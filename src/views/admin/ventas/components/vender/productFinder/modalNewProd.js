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
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

const SellNewProductModal = ({ open, handleClose, newProductUnregistered }) => {
  const [cantidad, setCantidad] = useState(1);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [marca, setMarca] = useState('');

  const newProductSubmit = (e) => {
    e.preventDefault();
    newProductUnregistered(nombre, cantidad, precio, proveedor, marca);
  };

  return (
    <Modal isOpen={open} toggle={handleClose} size="lg">
      <ModalHeader toggle={handleClose}>
        Cargar Producto No Registrado
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={newProductSubmit}>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>Cant.</Label>
                <Input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  min={1}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Nombre</Label>
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Precio Ind.</Label>
                <Input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  step={0.01}
                  min={0.01}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Proveedor</Label>
                <Input
                  type="text"
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Marca</Label>
                <Input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md="4" className="pt-4" style={{ textAlign: 'right' }}>
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

export default SellNewProductModal;
