    import { useEffect, useState } from 'react'
    import { Character, ResponseInfo } from '../rickAndMortyTypes'
    import { characterToCharacterRow, getWidthsStyles } from './utils'
    import { useTable, Column } from 'react-table'
    import './CharactersTable.scss'
    // @ts-ignore
    import Eye from '../assets/eye.svg?component'

    export interface CharacterRow {
        name: string
        status: string
        specie: string
        gender: string
        episodesLink: string[]
        characterDetailLink: string
        detailsLink: string
    }

    enum HEADER_LABEL {
        name = 'Name',
        status = 'Status',
        specie = 'Specie',
        gender = 'Gender',
        detailsLink = '',
    }

    interface CharactersTableProps {
        data: Character[]
        loading: boolean
        currentPage: number
        onPageChange: (newPage: number) => void 
        onClickDetails: (index: number) => void
        paginationData?: ResponseInfo
    }

    const columns: Column<CharacterRow>[] = [
        {
            Header: HEADER_LABEL['name'],
            accessor: 'name',
            width: 300,
            minWidth: 200,
            maxWidth: 400,
        },
        {
            Header: HEADER_LABEL['status'],
            accessor: 'status',
            minWidth: 100,
            width: 100,
            maxWidth: 100,
            Cell: (cellProps) => <div className='centered'>{cellProps.value}</div>,
        },
        {
            Header: HEADER_LABEL['specie'],
            accessor: 'specie',
            minWidth: 100,
            width: 100,
            Cell: (cellProps) => <div className='centered'>{cellProps.value}</div>,
        },
        {
            Header: HEADER_LABEL['gender'],
            accessor: 'gender',
            minWidth: 100,
            width: 100,
            Cell: (cellProps) => <div className='centered'>{cellProps.value}</div>,
        },
        {
            Header: HEADER_LABEL['detailsLink'],
            accessor: 'detailsLink',
            minWidth: 60,
            width: 60,
            Cell: (cellProps) => {
                return (
                    // @ts-ignore
                    <div className='icon-container' onClick={() => cellProps.onClick()}>
                        <Eye/>
                    </div>
                )
            }
        },
    ]

    export const CharactersTable = (props: CharactersTableProps) => {
        const [data, setData] = useState<CharacterRow[]>(characterToCharacterRow(props.data))

        useEffect(() => {
            if (!props.loading && props.data.length > 0) setData(characterToCharacterRow(props.data))
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
        
        const renderPagination = () => {
            let paginationNumbers: number[] = []
            if (!props.paginationData) return null;
            [2, 1].forEach((n) => {
                const bottomMarginNumber = props.currentPage - n
                if (bottomMarginNumber > 0) {
                    paginationNumbers = [...paginationNumbers, bottomMarginNumber]
                }
            })
            paginationNumbers = [...paginationNumbers, props.currentPage];
            [1, 2].forEach((n) => {
                const topMarginNumber = props.currentPage + n
                if (props.paginationData && topMarginNumber < props.paginationData.pages && topMarginNumber - props.paginationData.pages - 2) {
                    paginationNumbers = [...paginationNumbers, topMarginNumber]
                }
            })

            return (
                <div className='pagination-footer'>
                    {props.currentPage !== 1 && (
                        <PaginationButton
                            isCurrent={false}
                            onClick={() => props.onPageChange(1)}
                        >
                            {`<<`}
                        </PaginationButton>
                    )}
                    {paginationNumbers.map((number) => (
                        <PaginationButton
                            key={`pagination-number-${number}`}
                            isCurrent={props.currentPage === number}
                            onClick={() => props.onPageChange(number)}
                        >
                            {number.toString()}
                        </PaginationButton>
                    ))}
                    {props.currentPage !== props.paginationData.pages && (
                        <PaginationButton
                            isCurrent={false}
                            onClick={() => props.paginationData && props.onPageChange(props.paginationData.pages)}
                        >
                            {`>>`}
                        </PaginationButton>
                    )}
                </div>
            )
        }

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
                        {/* render empty-row to simulate space between header and first rows */}
                        <tr className='empty-row'/>
                        {props.loading && <SkeletonRows columns={columns}/>}
                        {!props.loading && rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()} style={{...getWidthsStyles(cell.column)}}>
                                            {cell.render('Cell', {
                                                onClick: () => {
                                                    console.log('onclick cell', cell)
                                                    props.onClickDetails(row.index)
                                                }
                                            })}
                                        </td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {renderPagination()}
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
        columns: Column<CharacterRow>[]
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