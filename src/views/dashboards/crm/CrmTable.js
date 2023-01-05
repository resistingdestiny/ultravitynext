import { useState } from 'react'
import { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CustomChip from 'src/@core/components/mui/chip'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { DialogViewCard } from 'src/views/pages/dialog-examples/DialogViewCard'
const CrmTable = props => {
  const [items, setItems] = useState(props.contract_data)
  const [selectedRow, setSelectedRow] = useState(null)
  const [showDialogViewCard, setShowDialogViewCard] = useState(false)
  useEffect(() => {
    setItems(props.contract_data)
  }, [props.contract_data])
  const rows = items || []

  const columns = [
    {
      flex: 0.025,
      minWidth: 100,
      field: 'name',
      headerName: 'name',
      renderCell: ({ row }) => <Typography variant='body2'>{row.name}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'chain',
      headerName: 'chain',
      sortable: false,
      renderCell: ({ row }) => {
        const components = row.id.split('_')
        const contrain_chain = components[1]
        return <Typography variant='body2'>{contrain_chain}</Typography>
      }
    },
    {
      flex: 0.1,
      minWidth: 250,
      field: 'id',
      headerName: 'id',
      renderCell: ({ row }) => <Typography variant='body2'>{row.id.substring(0, 30) + '...'}</Typography>
    },
    {
      flex: 0.05,
      minWidth: 75,
      sortable: false,
      field: 'Score',
      headerName: 'Score',
      type: 'number',
      renderCell: ({ row }) => (
        <CustomChip
          size='small'
          skin='light'
          color={row.score >= 60 ? 'success' : row.score >= 30 ? 'warning' : 'error'}
          label={Math.round(Number(row.score))}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'Recommendation',
      sortable: false,
      headerName: 'Recommendation',
      renderCell: ({ row }) => {
        try {
          return <Typography variant='body2'>{row.recommendation.substring(0, 40) + '...'}</Typography>
        } catch (error) {
          return <Typography variant='body2'>N/A</Typography>
        }
      }
    },
    {
      flex: 0.125,
      minWidth: 140,
      field: 'actions',
      sortable: false,
      headerName: 'Actions',
      renderCell: ({ row }) => {
        return (
          <Button size='small' variant='outlined' color='secondary'>
            Report
          </Button>
        )
      }
    }
  ]

  const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  // ** States
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
        rows={rows}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        onRowClick={rowData => {
          // set the selected row data
          setSelectedRow(rowData)
          // Toggle the visibility of the DialogViewCard component
          setShowDialogViewCard(true)
        }}
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
      {showDialogViewCard && (
        <DialogViewCard
          showDialogViewCard={showDialogViewCard}
          rowData={selectedRow}
          setShowDialogViewCard={setShowDialogViewCard}
        />
      )}
    </Card>
  )
}

export default CrmTable
