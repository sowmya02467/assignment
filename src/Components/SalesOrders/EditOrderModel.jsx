import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

import { DatePicker } from 'chakra-ui-date-input';
import { Select } from 'chakra-react-select';

const EditOrderModal = ({ isOpen, onClose, order, readOnly = false }) => {
  const { handleSubmit, register, control, formState: { errors } } = useForm({
    defaultValues: {
      customer_id: order.customer_id,
      items: order.items,
      invoice_date: order.invoice_date,
      invoice_no: order.invoice_no,
      paid: order.paid
    }
  });

  const onSubmit = (data) => {
    // Handle edit logic here
    console.log(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{readOnly ? 'View Sale Order' : 'Edit Sale Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="editOrderForm" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.customer_id}>
              <FormLabel>Customer</FormLabel>
              <Input {...register('customer_id', { required: 'Customer is required' })} placeholder="Customer ID" readOnly={readOnly} />
            </FormControl>
            <FormControl isInvalid={errors.items}>
              <FormLabel>Items</FormLabel>
              <Controller
                name="items"
                control={control}
                render={({ field }) => (
                  <Select {...field} isMulti options={[{ value: 1, label: 'Product A' }, { value: 2, label: 'Product B' }]} isDisabled={readOnly} />
                )}
              />
            </FormControl>
            <FormControl isInvalid={errors.invoice_date}>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoice_date"
                control={control}
                render={({ field }) => <DatePicker {...field} isDisabled={readOnly} />}
              />
            </FormControl>
            <FormControl isInvalid={errors.invoice_no}>
              <FormLabel>Invoice No</FormLabel>
              <Input {...register('invoice_no', { required: 'Invoice No is required' })} placeholder="Invoice No" readOnly={readOnly} />
            </FormControl>
            <FormControl isInvalid={errors.paid}>
              <FormLabel>Paid</FormLabel>
              <Input {...register('paid', { required: 'Payment status is required' })} placeholder="Paid" readOnly={readOnly} />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          {!readOnly && <Button colorScheme="blue" mr={3} form="editOrderForm" type="submit">Save</Button>}
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditOrderModal;
