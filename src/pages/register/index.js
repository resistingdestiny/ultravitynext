// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import { useRouter } from 'next/router'
import Alert from '@mui/material/Alert'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Register = () => {
  const [formAlert, setFormAlert] = useState({ type: '', message: '' })

  const { createUserWithEmailAndPassword } = useFirebaseAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(email, password)
        .then(res => {
          setFormAlert({
            type: 'Success',
            message: 'Registered Successfully. Reloading to Dashboard...'
          })
        })
        .catch(err => {
          setError(err.message)
        })
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    console.log(formAlert)
  }

  // ** Hook
  const theme = useTheme()

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              Let's get started 🚀
            </Typography>
            <Typography variant='body2'>Become more informed about your smart contracts</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={register}>
            {formAlert.type === 'Success' ? <Alert severity='success'>{formAlert.message}</Alert> : null}
            <TextField
              fullWidth
              type='email'
              label='Email'
              sx={{ mb: 4 }}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={password}
                id='auth-register-password'
                onChange={e => setPassword(e.target.value)}
                type='password'
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Typography
                    href='/'
                    variant='body2'
                    component={Link}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                    onClick={e => e.preventDefault()}
                  >
                    privacy policy & terms
                  </Typography>
                </Fragment>
              }
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
              Sign up
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>Already have an account?</Typography>
              <Typography component={Link} href='/login' sx={{ color: 'primary.main', textDecoration: 'none' }}>
                Sign in instead
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Register
