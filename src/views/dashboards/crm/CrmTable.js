import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useCollection } from 'react-firebase-hooks/firestore'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import { updateItem, deleteItem, useItemsByOwner } from 'src/util/db'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const roleObj = {
  admin: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'error.main' }}>
        <Icon icon='mdi:laptop' />
      </Box>
    )
  },
  author: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'warning.main' }}>
        <Icon icon='mdi:cog' />
      </Box>
    )
  },
  maintainer: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'success.main' }}>
        <Icon icon='mdi:chart-donut' />
      </Box>
    )
  },
  editor: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'info.main' }}>
        <Icon icon='mdi:pencil-outline' />
      </Box>
    )
  },
  subscriber: {
    icon: (
      <Box component='span' sx={{ display: 'flex', mr: 2, color: 'primary.main' }}>
        <Icon icon='mdi:account-outline' />
      </Box>
    )
  }
}

const statusObj = {
  active: { color: 'success' },
  pending: { color: 'warning' },
  inactive: { color: 'secondary' }
}

const rows = [
  {
    id: 1,
    role: 'admin',
    status: 'pending',
    name: 'Jordan Stevenson',
    username: '@jstevenson5c',
    email: '0x5416b7cba67a6d1d7f47e3afce7f3b9e9b7f40b8',
    avatarSrc: '/images/avatars/1.png'
  }
]

const renderUserAvatar = row => {
  if (row.avatarSrc) {
    return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar skin='light' sx={{ mr: 3, width: 34, height: 34, fontSize: '.8rem' }}>
        {getInitials(row.name ? row.name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const columns = [
  {
    flex: 0.3,
    minWidth: 250,
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }) => <Typography variant='body2'>{row.email}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.status}
        color={statusObj[row.status].color}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  }
]

const CrmTable = () => {
  const { authUser, loading, auth } = useFirebaseAuth()

  const { data: items, status: itemsStatus, error: itemsError } = useItemsByOwner(authUser?.uid)
  console.log(items)

  const [creatingItem, setCreatingItem] = useState(false)

  const [updatingItemId, setUpdatingItemId] = useState(null)

  const itemsAreEmpty = !items || items.length === 0

  return (
    <Card>
      <DataGrid autoHeight hideFooter rows={rows} columns={columns} disableSelectionOnClick pagination={undefined} />
    </Card>
  )
}

export default CrmTable
