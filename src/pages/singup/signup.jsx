import { useForm, Controller } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import * as z from 'zod';
import {  Link as RouterLink } from "react-router";
import Link from '@mui/material/Link'; 
import {handleRegister,handleCurrentUser} from "../../redux/slices/authslice.js"
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router";




function Signup() {
  let navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar()
  let users = useSelector((state) => state.auth.users)
  console.log(users);
  const dispatch = useDispatch()
  const singupschema = z.object({
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
    resolver: zodResolver(singupschema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (user) => {
        console.log(user)
        const existing = users.find((i)=>i.username==user.username)
        console.log(existing)
        if(existing){
          enqueueSnackbar('Account with same email already exists', {autoHideDuration: 3000})
        }else{
        dispatch(handleRegister(user))
        dispatch(handleCurrentUser(user))

        navigate("/dashboard")
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
            SignUp
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field} 
                  label="User Name "
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
              signup
            </Button>
          </form>
          <Typography variant="h4" component="h2"  fontSize="15px" sx={{ fontStyle: 'italic' ,m:4 }} >
            Already have accout<Link component={RouterLink} to="/" underline="hover" sx={{ marginLeft: '5px' }} >login</Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}

export default Signup;
