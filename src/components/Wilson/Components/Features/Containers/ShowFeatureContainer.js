import React, {useState} from 'react'
import MainContainerHeader from '../../../Containers/MainContainer/MainContainerHeader'
import { 
    Divider
} from '@mantine/core';

import FeatureInfoContainer from './FeatureInfoContainer';
import ListsContainer from '../../../Components/Lists/Containers/ListsContainer';
import NotesContainer from '../../../Components/Notes/Containers/NotesContainer';

export default function ShowFeatureContainer(props) {

    // const [edit, setEdit] = useState(false);
    // const [confirmDelete, setConfirmDelete] = useState(false);
    const [featureContent, setFeatureContent] = useState("Info");


    const handleTabClick= (tabName) => {
        setFeatureContent(tabName)
    }

    const featureShowTabs = ["Info", "Lists", "Notes"]
    const featureComponent = [
        [<FeatureInfoContainer

        />, "Info"],
        [<ListsContainer
            listable="features"
            id={props.id}

        />, "Lists"],
        [<NotesContainer
            id={props.id}
            notable="features"


        />, "Notes"
        
        ]

    ]
    
    const renderContent = (tabsArray, name) => tabsArray.find(tabTuple => tabTuple[1] === name)[0]

    return (
        <div>
            <MainContainerHeader 
                title={props.title}
                handleTabClick={handleTabClick}
                // setEdit={setEdit}
                // setConfirmDelete={setConfirmDelete}
                tabs={featureShowTabs}
                type="Feature"
            />
            <Divider my="xs" />
            {renderContent(featureComponent, featureContent)}
        </div>
    )
}
