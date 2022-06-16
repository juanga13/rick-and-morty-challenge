import { useEffect, useState } from 'react'
import { Character } from '../rickAndMortyTypes'
import { characterToCharacterRow, getWidthsStyles } from './utils'
import { useTable, Column } from 'react-table'
import './CharactersTable.scss'

export interface CharacterRow {
    name: string
    status: string
    specie: string
    gender: string
    episodesLink: string[]
    characterDetailLink: string
}

enum HEADER_LABEL {
    name = 'Name',
    status = 'Status',
    specie = 'Specie',
    gender = 'Gender',
    episodesLink = 'Episodes',
    characterDetailLink = 'Detail',
}

interface CharactersTableProps {
    data: Character[]
    loading: boolean
}

const columns: Column<CharacterRow>[] = [
    {
        Header: HEADER_LABEL['name'],
        accessor: 'name',
        width: 300,
        minWidth: 200,
    },
    {
        Header: HEADER_LABEL['status'],
        accessor: 'status',
        minWidth: 100,
        width: 100,
        Cell: (props) => <div className='centered'>{props.value}</div>,
    },
    {
        Header: HEADER_LABEL['specie'],
        accessor: 'specie',
        minWidth: 100,
        width: 100,
        Cell: (props) => <div className='centered'>{props.value}</div>,
    },
    {
        Header: HEADER_LABEL['gender'],
        accessor: 'gender',
        minWidth: 100,
        width: 100,
        Cell: (props) => <div className='centered'>{props.value}</div>,
    },
    {
        Header: HEADER_LABEL['episodesLink'],
        accessor: 'episodesLink',
        minWidth: 300,
        maxWidth: 300,
    },
    {
        Header: HEADER_LABEL['characterDetailLink'],
        accessor: 'characterDetailLink',
        minWidth: 300,
        maxWidth: 300,
    },
]

export const CharactersTable = (props: CharactersTableProps) => {
    const [data, setData] = useState<CharacterRow[]>(characterToCharacterRow(props.data))

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })
    
    useEffect(() => {
        if (!props.loading && props.data.length > 0) setData(characterToCharacterRow(props.data))
    }, [props.data, props.loading])


    return (
        <div className='table'>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{...getWidthsStyles(headerGroup)}}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} style={{...getWidthsStyles(column)}}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} style={{...getWidthsStyles(cell.column)}}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}