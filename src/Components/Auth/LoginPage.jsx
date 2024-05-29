import React from 'react';
import { useForm } from 'react-hook-form';
import {useAuth } from '../Context/AuthContext'
// import { useAuth } from '../context/AuthContext';
import { Box, Button, Input } from '@chakra-ui/react';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data.username, data.password);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('username')} placeholder="Username" />
        <Input {...register('password')} type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default LoginPage;
