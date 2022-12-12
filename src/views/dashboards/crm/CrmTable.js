import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useCollection } from 'react-firebase-hooks/firestore'
import useFirebaseAuth from 'src/hooks/useFirebaseAuth.js'
import { updateItem, deleteItem, useItemsByOwner } from 'src/util/db'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
const CrmTable = () => {
  const { authUser, loading, auth } = useFirebaseAuth()

  const { data: items, status: itemsStatus, error: itemsError } = useItemsByOwner(authUser?.uid)
  console.log(items)

  const rows = items || []

  const columns = [
    {
      flex: 0.3,
      minWidth: 250,
      field: 'id',
      headerName: 'id',
      renderCell: ({ row }) => <Typography variant='body2'>{row.id}</Typography>
    }
  ]

  const [creatingItem, setCreatingItem] = useState(false)

  const [updatingItemId, setUpdatingItemId] = useState(null)

  const itemsAreEmpty = !items || items.length === 0
  const [data] = useState(rows)
  const [pageSize, setPageSize] = useState(7)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }
  return (
    <Card>
      <DataGrid
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[7, 10, 25, 50]}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={filteredData.length ? filteredData : data}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        componentsProps={{
          baseButton: {
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value)
          }
        }}
      />
    </Card>
  )
}

export default CrmTable
