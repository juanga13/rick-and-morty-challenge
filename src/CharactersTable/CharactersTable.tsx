import { useEffect, useState } from 'react'
import { Character } from '../rickAndMortyTypes'
import { characterToCharacterRow } from '../utils'
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
    },
    {
        Header: HEADER_LABEL['status'],
        accessor: 'status',
    },
    {
        Header: HEADER_LABEL['specie'],
        accessor: 'specie',
    },
    {
        Header: HEADER_LABEL['gender'],
        accessor: 'gender',
    },
    {
        Header: HEADER_LABEL['episodesLink'],
        accessor: 'episodesLink',
    },
    {
        Header: HEADER_LABEL['characterDetailLink'],
        accessor: 'characterDetailLink',
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

    console.log(data, columns)

    return (
        <table {...getTableProps()} className='table'>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    )
}