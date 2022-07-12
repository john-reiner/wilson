import React, {useState, useEffect} from 'react'
import { Divider } from '@mantine/core';

// import { useDisclosure } from '@mantine/hooks';

import ProjectInfoContainer from './ProjectInfoContainer';
import FeaturesContainer from '../../Features/Containers/FeaturesContainer';
import NotesContainer from '../../Notes/Containers/NotesContainer';
import ListsContainer from '../../Lists/Containers/ListsContainer';
import MainContainerHeader from '../../../Containers/MainContainer/MainContainerHeader';
import EditProjectModal from './EditProjectModal';
import DeleteModalConfirmation from '../../../Containers/DeleteModalConfirmation';

export default function ProjectContainer(props) {

    const [projectContent, setProjectContent] = useState("Info");
    const [project, setProject] = useState({});
    const [fetchAgainFlag, setFetchAgainFlag] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const fetchProject = () => {
        fetch(`http://localhost:3001/api/v2/projects/${props.id}`)
        .then(response => response.json())
        .then(payload => {
            setProject(payload)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    useEffect(() => {
        fetchProject()
        setFetchAgainFlag(false)
    }, [fetchAgainFlag]);

    const renderContent = (tabsArray, name) => tabsArray.find(tabTuple => tabTuple[1] === name)[0]

    const handleTabClick = (tabName) => {
        setProjectContent(tabName)
    }

    const handleEditProjectClick = () => {
        setEditModalOpen(true)
    }
    const handleDeleteClick = () => setDeleteModalOpen(true)

    const handleDeleteProject = () => {
        props.setViewToShow(0)
    }

    let projectComponents = [
        [<ProjectInfoContainer 
            setFetchAgainFlag={setFetchAgainFlag} 
            project={{...project}}
        />, "Info"],
        [<ListsContainer
            title={project.title}
            projectId={props.id}
            userId={props.userId}
            listable="projects"
            id={project.id}

        />, "Lists"],
        [<FeaturesContainer 
            setFetchAgainFlag={setFetchAgainFlag} 
            projectId={props.id} 
            userId={props.userId} 
            features={project.features}
            // setFeatureId={setFeatureId}

        />, "Features"],      
        [<NotesContainer
            id={props.id}
            notable="projects"
        />, "Notes"],
    ]

    const projectShowTabs = ["Info", "Lists", "Features", "Notes"]

    return (
        <div>
            <EditProjectModal 
                setModalOpen={setEditModalOpen}
                modalOpen={editModalOpen}
                id={project.id}
                project={project}
                setFetchAgainFlag={setFetchAgainFlag}
                setViewToShow={props.setViewToShow}
            />
            <DeleteModalConfirmation 
                route={`projects/${props.id}`}
                successFunction={handleDeleteProject}
                opened={deleteModalOpen}
                setOpened={setDeleteModalOpen}
                item="Project"
            />
            <MainContainerHeader 
                title={project.title}
                github_url={project.github_url}
                handleTabClick={handleTabClick}
                handleEditClick={handleEditProjectClick}
                handleDeleteClick={handleDeleteClick}
                tabs={projectShowTabs}
                type="Project"
            />
            <Divider my="xs" />
            {renderContent(projectComponents, projectContent)}
        </div>
    )
}