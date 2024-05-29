import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Table, Tr, Td, Thead, Th, Tbody, IconButton } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import EditOrderModal from './EditOrderModel';

const fetchCompletedOrders = async () => {
  // Mock API call
  return await new Promise((resolve) => setTimeout(() => resolve([
    { id: 2, customer: 'Customer B', items: [{ name: 'Product B' }], status: 'Completed' },
  ]), 500));
};

const CompletedOrders = () => {
  const { data, isLoading } = useQuery(['completedOrders'], fetchCompletedOrders);
  const [viewOrder, setViewOrder] = useState(null);

  if (isLoading) return <Box>Loading...</Box>;

  return (
    <Box>
      {viewOrder && (
        <EditOrderModal order={viewOrder} isOpen={!!viewOrder} onClose={() => setViewOrder(null)} readOnly />
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
                <IconButton icon={<ViewIcon />} onClick={() => setViewOrder(order)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedOrders;
