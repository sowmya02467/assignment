import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DatePicker } from 'chakra-ui-date-input';
import { Select } from 'chakra-react-select';

const OrderFormModal = ({ isOpen, onClose }) => {
  const { handleSubmit, register, control, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation(newOrder => {
    // Mock API call
    return new Promise((resolve) => setTimeout(() => resolve(newOrder), 500));
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('activeOrders');
      onClose();
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="orderForm" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.customer_id}>
              <FormLabel>Customer</FormLabel>
              <Input {...register('customer_id', { required: 'Customer is required' })} placeholder="Customer ID" />
            </FormControl>
            <FormControl isInvalid={errors.items}>
              <FormLabel>Items</FormLabel>
              <Controller
                name="items"
                control={control}
                render={({ field }) => (
                  <Select {...field} isMulti options={[{ value: 1, label: 'Product A' }, { value: 2, label: 'Product B' }]} />
                )}
              />
            </FormControl>
            <FormControl isInvalid={errors.invoice_date}>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoice_date"
                control={control}
                render={({ field }) => <DatePicker {...field} />}
              />
            </FormControl>
            <FormControl isInvalid={errors.invoice_no}>
              <FormLabel>Invoice No</FormLabel>
              <Input {...register('invoice_no', { required: 'Invoice No is required' })} placeholder="Invoice No" />
            </FormControl>
            <FormControl isInvalid={errors.paid}>
              <FormLabel>Paid</FormLabel>
              <Input {...register('paid', { required: 'Payment status is required' })} placeholder="Paid" />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} form="orderForm" type="submit">Submit</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderFormModal;
