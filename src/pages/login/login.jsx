import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import * as z from 'zod';
import {  Link as RouterLink } from "react-router";
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux'
import {handleCurrentUser} from "../../redux/slices/authslice.js"
import { useNavigate } from "react-router";
import { useSnackbar } from 'notistack';





function Login() {
    let navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar()
    
  let users = useSelector((state) => state.auth.users)
  const dispatch = useDispatch()

  const loginschema = z.object({
    username: z
      .string()
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const {
    control, 
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginschema),
    defaultValues: {
      email: '',
      password: '',
    },
  });



  const onSubmit = (user) => {
    console.log(users)
    const existing = users.find((i)=>i.username==user.username && i.password==user.password)
    console.log(existing)
    if(existing){
    dispatch(handleCurrentUser(user))
    navigate("/dashboard")

    console.log(users)
    }else{
      enqueueSnackbar('Invalid Credentials', {autoHideDuration: 3000})
    }

  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field} 
                  label="User Name"
                  variant="filled"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field} 
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2 }} 
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
          <Typography variant="h4" component="h2"  fontSize="15px" sx={{ fontStyle: 'italic' ,m:4 }} >
            Don't have accout<Link component={RouterLink} to="/signup" underline="hover" sx={{ marginLeft: '5px' }} >signup</Link>
          </Typography>


        </Paper>
      </Box>
    </>
  );
}

export default Login;
