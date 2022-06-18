import { useEffect, useState } from 'react'
import { Episode } from '../rickAndMortyTypes'
import { useTable, Column } from 'react-table'
import { episodeToEpisodeRow, getWidthsStyles } from '../CharactersTable/utils'

export interface EpisodeRow {
    name: string
    air_date: string
    episode: string
}

enum HEADER_LABEL {
    name = 'Name',
    air_date = 'Air date',
    episode = 'Code',
}

interface EpisodeListTableProps {
    data: Episode[]
    loading: boolean
}

const columns: Column<EpisodeRow>[] = [
    {
        Header: HEADER_LABEL['name'],
        accessor: 'name',
        width: 300,
        minWidth: 200,
        maxWidth: 400,
    },
    {
        Header: HEADER_LABEL['air_date'],
        accessor: 'air_date',
        minWidth: 150,
        width: 150,
        maxWidth: 150,
        Cell: (cellProps) => <div className='centered'>{cellProps.value}</div>,
    },
    {
        Header: HEADER_LABEL['episode'],
        accessor: 'episode',
        minWidth: 100,
        width: 100,
        Cell: (cellProps) => <div className='centered'>{cellProps.value}</div>,
    },
]

export const EpisodeListTable = (props: EpisodeListTableProps) => {
    const [data, setData] = useState<EpisodeRow[]>(episodeToEpisodeRow(props.data))

    useEffect(() => {
        if (!props.loading && props.data.length > 0) setData(episodeToEpisodeRow(props.data))
    }, [props.data, props.loading])

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

    return (
        <div className='table'>
            <label>Episodes</label>
            <table style={{marginTop: 4}} {...getTableProps()}>
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
                    {/* render empty-row to simulate space between header and first rows */}
                    <tr className='empty-row'/>
                    {props.loading && <SkeletonRows columns={columns}/>}
                    {!props.loading && rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} style={{...getWidthsStyles(cell.column)}}>
                                        {cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

interface PaginationButtonProps {
    isCurrent: boolean
    children: string
    onClick: () => void
}
const PaginationButton = (props: PaginationButtonProps) => {
    return (
        <div
            className={'pagination-button' + (props.isCurrent ? ' is-current' : '')}
            onClick={() => !props.isCurrent && props.onClick()}
        >
            {props.children}
        </div>
    )
}

interface SkeletonRowsProps {
    columns: Column<EpisodeRow>[]
}
const SkeletonRows = ({columns}: SkeletonRowsProps) => {
    return (
        <>
            {[1, 2, 3, 4, 5].map((i) => (
                <tr key={`skeleton-row-${i}`} className='skeleton-row'>
                    {Object.keys(columns).map((key, j) => {
                        const value = columns[j]
                        return (
                            <td  key={`skeleton-row-${i}-cell-${j}`} style={{...getWidthsStyles(value)}}/>
                        )
                    })}
                </tr>
            ))}
        </>
    )
}