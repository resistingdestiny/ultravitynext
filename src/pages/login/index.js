// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import { useRouter } from 'next/router'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // ** Vars

  const { signInWithEmailAndPassword } = useFirebaseAuth()
  const router = useRouter()

  const login = e => {
    e.preventDefault()
    try {
      signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err)
    }
  }

  // ** State
  const theme = useTheme()

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px' }}>
              {`Welcome to ${themeConfig.templateName}`}
            </Typography>
            <Typography variant='body2'>Please sign-in to your account to start checking contracts</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={login}>
            <TextField
              onChange={e => setEmail(e.target.value)}
              value={email}
              autoFocus
              fullWidth
              id='email'
              label='Email'
              sx={{ mb: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={password}
                id='auth-login-password'
                onChange={e => setPassword(e.target.value)}
                type={'password'}
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                label='Remember Me'
                control={<Checkbox />}
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
              />
              <Typography
                variant='body2'
                component={Link}
                href='/pages/auth/forgot-password-v1'
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                Forgot Password?
              </Typography>
            </Box>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography>
              <Typography component={Link} href='/register' sx={{ color: 'primary.main', textDecoration: 'none' }}>
                Create an account
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
