import React, { useEffect, useState } from 'react'

import { Paper, Title, Text, Divider, Table } from '@mantine/core'

import Link from './Link'

interface PriorityColors {
    high: "red",
    medium: "yellow",
    low: "grey"
}

export interface DataObjectInterface {
    id: number
    title: string
    author: string
    status?: string
    priority?: keyof PriorityColors
    modified?: string
}

interface DisplayAllLinksProps {
    displayItem: string
    data: any[]
    linkClick: (id: number) => void
    status?: boolean
}


export default function DisplayAllLinks({
    displayItem,
    data,
    linkClick,
    status,
}: DisplayAllLinksProps) {

    const [convertedData, setConvertedData] = useState<DataObjectInterface[]>([])

    useEffect(() => {
        convertDataToDataTypeObject()
    }, [data])

    const convertDataToDataTypeObject = () => {
        if (data.length > 0) {
            let returnedData = data.map(dataObject => {
                return {
                    id: dataObject.id,
                    title: dataObject.title,
                    author: dataObject.author,
                    modified: dataObject.modified
                }
            })
            setConvertedData(returnedData)
        }
    }

    const pluralizeDisplayItem = (
        displayItem: string, 
        count: number
        ) => {
        if (count && (count > 1 || count === 0)) {
            return displayItem + 's'
        }
        return displayItem
    }

    const renderLinks = (
        convertedData: DataObjectInterface[]
        ) => {
        if (convertedData && convertedData.length > 0) {
            return convertedData.map((dataObject: DataObjectInterface) => {
                return (
                    <Link
                        key={displayItem+"_"+ dataObject.id}
                        id={dataObject.id}
                        title={dataObject.title}
                        author={dataObject.author}
                        status={dataObject.status}
                        modified="1/1/2000"
                        linkClick={linkClick}
                        priority={dataObject.priority}
                    />
                )
            })
        }
    }



    return (
        <Paper
            shadow="xs" 
            withBorder
        >
            <Paper
                p="lg"
            >
                <Title 
                    order={3}
                >
                    All {displayItem + "s"}
                </Title>
                <Text>{data.length + " " + pluralizeDisplayItem(displayItem, data.length)}</Text>
            </Paper>
            <Divider/>
            <Table
                striped
                highlightOnHover
            >
                <thead>
                    <tr>
                        <th>Title</th>
                        {status && <th>Status</th>}
                        <th>Creator</th>
                        <th>Modified</th>
                    </tr>
                </thead>
                <tbody>
                    {renderLinks(convertedData)}
                </tbody>
            </Table>
        </Paper>
    )
}