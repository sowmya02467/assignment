import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Box, Table, Tr, Td, Thead, Th, Tbody, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import OrderFormModal from './OrderFormModel';
import EditOrderModal from './EditOrderModel';

const fetchActiveOrders = async () => {
  // Mock API call
  return await new Promise((resolve) => setTimeout(() => resolve([
    { id: 1, customer: 'Customer A', items: [{ name: 'Product A' }], status: 'Active' },
  ]), 500));
};

const ActiveOrders = () => {
  const { data, isLoading } = useQuery(['activeOrders'], fetchActiveOrders);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  if (isLoading) return <Box>Loading...</Box>;

  return (
    <Box>
      <Button onClick={() => setModalOpen(true)} leftIcon={<AddIcon />}>+ Sale Order</Button>
      <OrderFormModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      {editOrder && (
        <EditOrderModal order={editOrder} isOpen={!!editOrder} onClose={() => setEditOrder(null)} />
      )}
      <Table>
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(order => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer}</Td>
              <Td>{order.items.map(item => item.name).join(', ')}</Td>
              <Td>{order.status}</Td>
              <Td>
                <IconButton icon={<AddIcon />} onClick={() => setEditOrder(order)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveOrders;
