// ** React Imports
import { useState } from 'react'
import Alert from '@mui/material/Alert'
import EthereumSvg from 'public/images/icons/crypto-icons/ethereum.svg'
// ** MUI Imports
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Avatar Component
import CustomAvatar from 'src/@core/components/mui/avatar'

const TabDetails = props => {
  const [value, setValue] = useState('ecommerce')

  const handleChange = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        {props.formAlert.type === 'pending' ? <Alert severity='info'>{props.formAlert.message}</Alert> : null}
      </Box>
      <TextField
        fullWidth
        sx={{ mb: 4 }}
        label='Contract Address'
        value={props.contract}
        placeholder='Contract Address'
        onChange={e => props.setContract(e.target.value)}
      />
      <Typography variant='h6' sx={{ mb: 4 }}>
        Chain
      </Typography>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box
            onClick={() => props.setChain('ethereum')}
            sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
                <svg height='35' width='35' viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <path
                      fill='white'
                      d='M271.765 182.69c-.4-.03-90.6 53.42-91.774 53.88 -.27-.16-91.26-54.01-91.69-53.95 .22.32 91.624 129.377 91.68 129.377 .06 0 91.774-129.31 91.774-129.31Z'
                    />
                    <path fill='white' d='M180.03 12L88.59 164.918l91.43 54.15 91.43-54.16Z' />
                  </g>
                </svg>
              </CustomAvatar>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Ethereum</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Highest Accuracy
                </Typography>
              </div>
            </Box>
            <Radio value='ethereum' onChange={handleChange} checked={value === 'ethereum'} />
          </Box>
          <Box
            onClick={() => props.setChain('polygon')}
            sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
                <svg height='35' width='35' viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <path
                      fill='white'
                      d='M266.41 107.038c-6.15-3.51-14.04-3.51-21.06 0l-49.13 28.95 -33.34 18.42 -48.26 28.95c-6.15 3.5-14.04 3.5-21.06 0l-37.723-22.81c-6.15-3.51-10.53-10.53-10.53-18.43V98.24c0-7.02 3.5-14.04 10.52-18.43L93.55 57.87c6.14-3.51 14.03-3.51 21.05 0l37.72 22.8c6.14 3.5 10.52 10.52 10.52 18.42v28.95l33.33-19.3V78.91c0-7.02-3.51-14.04-10.53-18.43l-70.19-41.24c-6.15-3.51-14.04-3.51-21.06 0L22.45 61.35c-7.02 3.5-10.53 10.52-10.53 17.54v82.465c0 7.01 3.5 14.03 10.52 18.42L93.5 221.01c6.14 3.5 14.03 3.5 21.05 0l48.25-28.08 33.33-19.3 48.25-28.08c6.14-3.51 14.03-3.51 21.05 0l37.72 21.93c6.14 3.5 10.52 10.52 10.52 18.42v43.86c0 7.01-3.51 14.03-10.53 18.42l-36.85 21.93c-6.15 3.5-14.04 3.5-21.06 0l-37.73-21.94c-6.15-3.51-10.53-10.53-10.53-18.43v-28.08l-33.34 19.3v28.95c0 7.01 3.5 14.03 10.52 18.42l71.06 41.23c6.14 3.5 14.03 3.5 21.05 0l71.06-41.24c6.14-3.51 10.52-10.53 10.52-18.43v-83.35c0-7.02-3.51-14.04-10.53-18.43Z'
                    />
                  </g>
                </svg>
              </CustomAvatar>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Polygon</Typography>
              </div>
            </Box>
            <Radio value='polygon' onChange={handleChange} checked={value === 'polygon'} />
          </Box>
          <Box
            onClick={() => props.setChain('bsc')}
            sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
                <svg height='35' width='35' viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <path
                      fill='white'
                      d='M330.402 162.29c-.29.22-.59.43-.85.69 -10.613 10.6-21.23 21.21-31.84 31.82 -.36.35-.72.69-.98.94 -11.28-11.28-22.49-22.49-33.589-33.59 11.07-11.08 22.28-22.29 33.6-33.601 .12.1.43.35.72.63 10.87 10.87 21.74 21.75 32.61 32.63 .08.08.2.14.3.21 -.01.08-.01.16-.01.25Z'
                    />
                    <path
                      fill='white'
                      d='M121.71 137.786c-11.3-11.3-22.5-22.5-33.73-33.718 .38-.68 90.6-91.048 91.94-92.068 30.72 30.717 61.42 61.422 92.16 92.154 -.38.67-31.97 32.417-33.63 33.69 -19.43-19.43-38.86-38.86-58.411-58.411 -19.54 19.53-38.97 38.967-58.35 58.34Z'
                    />
                    <path
                      fill='white'
                      d='M121.595 186.31c19.5 19.5 38.91 38.911 58.41 58.411 2.31-2.11 4.39-4.33 6.55-6.46 2.17-2.15 4.31-4.32 6.47-6.48 2.15-2.16 4.31-4.32 6.47-6.48 2.15-2.16 4.31-4.32 6.47-6.48 2.18-2.19 4.375-4.375 6.56-6.57 2.15-2.16 4.31-4.32 6.47-6.48 2.15-2.16 4.31-4.32 6.47-6.48 2.15-2.16 4.31-4.32 6.47-6.48 2.15-2.16 4.3-4.31 6.58-6.59 11.3 11.28 22.52 22.49 33.64 33.6 -30.79 30.78-61.52 61.51-92.13 92.11 -30.6-30.6-61.321-61.33-92.14-92.14 11.09-11.06 22.32-22.262 33.65-33.553Z'
                    />
                    <path
                      fill='white'
                      d='M180.075 196.1c-11.32-11.32-22.71-22.708-34.02-34.02 11.29-11.3 22.69-22.7 33.98-33.99l34.01 34.01c-11.31 11.3-22.7 22.69-33.99 33.982Z'
                    />
                    <path
                      fill='white'
                      d='M30.056 162.023l33.43-33.44 33.47 33.47c-11.11 11.1-22.32 22.32-33.435 33.44 -11.06-11.06-22.28-22.28-33.479-33.48Z'
                    />
                  </g>
                </svg>
              </CustomAvatar>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Binance Smart Chain</Typography>
              </div>
            </Box>
            <Radio value='bsc' onChange={handleChange} checked={value === 'bsc'} />
          </Box>

          <Box
            onClick={() => props.setChain('avalanche')}
            sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
                <svg height='35' width='35' viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <path
                      fill='white'
                      d='M217.51 309.715c3.5 2.28 9.5 2.28 21.43 2.28h80.89c11.93 0 17.93 0 21.51-2.36 3.85-2.51 6.28-6.73 6.5-11.3 .2-4.08-2.67-9.03-8.28-18.72 -.2-.33-.39-.67-.59-1.01l-40.53-69.32 -.47-.78c-5.7-9.63-8.57-14.5-12.26-16.38 -4.08-2.08-8.87-2.08-12.94 0 -3.72 1.92-6.72 7-12.65 17.22l-40.38 69.32 -.14.23c-5.92 10.2-8.87 15.3-8.66 19.48 .28 4.57 2.64 8.78 6.5 11.29Z'
                    />
                    <path
                      fill='white'
                      d='M238.428 126.108c1.57-6.503 1.57-13.37 0-19.87 -1.42-5.96-4.67-11.634-11.08-22.83l-.15-.26 -28.66-50.024c-5.94-10.44-8.94-15.66-12.72-17.58 -4.08-2.08-8.94-2.08-13.01 0 -3.79 1.92-6.79 7.14-12.72 17.58L20.69 278.82c-5.86 10.29-8.79 15.43-8.58 19.65 .28 4.57 2.644 8.71 6.503 11.22 3.57 2.28 9.43 2.28 21.29 2.28H96.36c13.29 0 19.93 0 25.87-1.65 6.5-1.94 12.43-5.37 17.36-10.08 4.52-4.32 7.79-10.04 14.24-21.33l.18-.34 73.22-129.435c6.5-11.363 9.71-17.08 11.14-23.09Z'
                    />
                  </g>
                </svg>
              </CustomAvatar>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Avalanche C-Chain</Typography>
              </div>
            </Box>
            <Radio value='avalanche' onChange={handleChange} checked={value === 'avalanche'} />
          </Box>
        </Box>
        <Box sx={{}}>
          <Box
            onClick={() => props.setChain('fantom')}
            sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
                <svg height='35' width='35' viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    fill='white'
                    d='M198.09 116.02l54.27-31.658v63.31Zm54.27 135.678L179.99 293.9l-72.362-42.22V177.81l72.362 42.21 72.362-42.22ZM107.63 84.36l54.27 31.658 -54.271 31.658Zm81.4 46.73l54.27 31.65 -54.28 31.65Zm-18.09 63.31l-54.271-31.66 54.271-31.66ZM243.3 69.27l-63.32 36.181 -63.32-36.181 63.31-37.688ZM89.53 63.24v197.48l90.452 51.25 90.452-51.26V63.22L179.99 11.96Z'
                  />
                </svg>
              </CustomAvatar>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Fantom</Typography>
              </div>
            </Box>
            <Radio value='fantom' onChange={handleChange} checked={value === 'fantom'} />
          </Box>
          <Box
            onClick={() => props.setChain('cronos')}
            sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
                <svg height='35' width='35' viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <path fill='white' d='M265.82 12H92.32l-20.16 88.421h214.92Z' />
                    <path
                      fill='white'
                      d='M123.1 221.886v-58.77l-51.49-32.48 -58.22 43.09 79.46 138.251h31.92l37.49-35.27v-17.36Z'
                    />
                    <path fill='white' d='M235.61 113.863H123.67l18.48 49.25 -5.59 55.41h86.19l-5.59-55.42Z' />
                    <path
                      fill='white'
                      d='M287.09 130.07l-50.94 33.02v58.76l-38.62 37.49v17.35l37.49 34.69h31.35l78.91-137.68Z'
                    />
                  </g>
                </svg>
              </CustomAvatar>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Cronos</Typography>
              </div>
            </Box>
            <Radio value='cronos' onChange={handleChange} checked={value === 'fantom'} />
          </Box>
          <Box
            onClick={() => props.setChain('moonbeam')}
            sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
                <svg
                  height='35'
                  width='35'
                  xmlns='http://www.w3.org/2000/svg'
                  data-name='Layer 1'
                  viewBox='0 0 128 128'
                >
                  <path
                    fill='white'
                    d='M42.43 52.87h60.19a1 1 0 0 0 1-1 31.12 31.12 0 0 0-62.2 0 1 1 0 0 0 1.01 1zm-5.5 10.39h69.65a2.25 2.25 0 0 0 0-4.5H36.93a2.25 2.25 0 0 0 0 4.5z'
                  />
                  <circle fill='white' cx='29.24' cy='60.9' r='2.5' />
                  <path
                    fill='white'
                    d='M76 69.46a2.25 2.25 0 0 0-2.25-2.25H22.08a2.25 2.25 0 0 0 0 4.5h51.65A2.25 2.25 0 0 0 76 69.46Z'
                  />
                  <circle fill='white' cx='14.37' cy='69.46' r='2.5' />
                  <path fill='white' d='M36.43 75.88a2.25 2.25 0 0 0 0 4.5h62.65a2.25 2.25 0 0 0 0-4.5Z' />
                  <circle fill='white' cx='28.28' cy='77.96' r='2.5' />
                  <path
                    fill='white'
                    d='M51.77 86.57a2.25 2.25 0 0 0-2.25-2.25H25.64a2.25 2.25 0 0 0 0 4.5h23.88a2.25 2.25 0 0 0 2.25-2.25Z'
                  />
                  <circle fill='white' cx='18.11' cy='86.57' r='2.5' />
                  <path
                    fill='white'
                    d='M109.88 84.32H58.64a2.25 2.25 0 1 0 0 4.5h51.24a2.25 2.25 0 0 0 0-4.5zm-9.36 8.77H68.64a2.25 2.25 0 0 0 0 4.5h31.88a2.25 2.25 0 1 0 0-4.5z'
                  />
                  <circle fill='white' cx='61.13' cy='95.34' r='2.5' />
                  <path fill='white' d='M79.93 101.5H49.05a2.25 2.25 0 0 0 0 4.5h30.88a2.25 2.25 0 0 0 0-4.5Z' />
                  <circle fill='white' cx='41.76' cy='103.75' r='2.5' />
                </svg>
              </CustomAvatar>
              <div>
                <Typography sx={{ color: 'text.secondary' }}>Moonbeam</Typography>
              </div>
            </Box>
            <Radio value='moonbeam' onChange={handleChange} checked={value === 'fantom'} />
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default TabDetails
