import React, { useState } from 'react';
import { Table, Button, Badge, Modal } from 'react-bootstrap';
import MultiStepPurchaseForms from './MultiStepPurchaseForms';
// import MultiStepPurchaseForm from './MultiStepPurchaseForm';

const initialOrders = [];

const statusBadge = (status) => {
  const variant = status === 'Done' ? 'success' : status === 'Pending' ? 'secondary' : 'warning';
  return <Badge bg={variant}>{status}</Badge>;
};

const PurchaseOrderr = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [stepModal, setStepModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCreateNewPurchase = (order = null) => {
    setSelectedOrder(order);
    setStepModal(true);
    
  };

  const handleCloseModal = () => {
    setStepModal(false);
    setSelectedOrder(null);
  };

  const handleFormSubmit = (formData, lastStep = 'quotation') => {
    const isEdit = selectedOrder?.id;
    const newOrderNo = orders.length ? orders[0].orderNo + 1 : 2045;
    const today = new Date().toISOString().split('T')[0];

    const newOrder = {
      id: isEdit ? selectedOrder.id : Date.now(),
      orderNo: isEdit ? selectedOrder.orderNo : newOrderNo,
      vendor: formData.quotation.customer || '',
      date: today,
      amount: `$ ${formData.payment?.amount || 0}`,
      quotation: formData.quotation,
      purchaseOrder: formData.salesOrder, // renamed key but reusing form value
      invoice: formData.invoice,
      payment: formData.payment,
      quotationStatus: formData.quotation?.quotationNo ? 'Done' : 'Pending',
      purchaseOrderStatus: formData.salesOrder?.orderNo ? 'Done' : 'Pending',
      invoiceStatus: formData.invoice?.invoiceNo ? 'Done' : 'Pending',
      paymentStatus: formData.payment?.amount ? 'Done' : 'Pending',
      draftStep: lastStep,
    };

    setOrders(prev =>
      isEdit
        ? prev.map(o => (o.id === selectedOrder.id ? newOrder : o))
        : [newOrder, ...prev]
    );

    handleCloseModal();
  };

  return (
    <div className="p-4">
      <h5 className="mb-4">Purchase Workflow</h5>
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => handleCreateNewPurchase()}
        style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
      >
        + Create New Purchase
      </Button>

      <Table bordered hover responsive className="text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Purchase No</th>
            <th>Vendor</th>
            <th>Voucher Type</th>
<th>Voucher No</th>

            <th>Date</th>
            <th>Amount</th>
            <th>Quotation</th>
            <th>Purchase Order</th>
            <th>Invoice</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id}>
              <td>{idx + 1}</td>
              <td>{order.invoice?.invoiceNo || '-'}</td>
              <td>{order.vendor}</td>
              <td>{order.payment?.voucherType || '-'}</td>
<td>{order.payment?.voucherNo || '-'}</td>

              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>{statusBadge(order.quotationStatus)}</td>
              <td>{statusBadge(order.purchaseOrderStatus)}</td>
              <td>{statusBadge(order.invoiceStatus)}</td>
              <td>{statusBadge(order.paymentStatus)}</td>
              <td>
                <Button
                  size="sm"
                  className="me-1 mb-1"
                  variant="outline-primary"
                  onClick={() => handleCreateNewPurchase(order)}
                >
                  Continue
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={stepModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOrder ? 'Continue Purchase' : 'Create Purchase'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        

          <MultiStepPurchaseForms  initialData={selectedOrder}
            initialStep={selectedOrder?.draftStep}
            onSubmit={handleFormSubmit}  />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PurchaseOrderr;
