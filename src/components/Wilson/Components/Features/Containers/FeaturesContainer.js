import React, { useState } from 'react'
import { Button, Stack, Accordion } from '@mantine/core';

import FeatureLink from '../Components/FeatureLink'
import NewFeature from '../Components/NewFeature';
import ShowFeatureContainer from './ShowFeatureContainer';
import FeaturesNav from './FeaturesNav/FeaturesNav';
import FeaturesShowContainer from './FeaturesShowContainer';

export default function FeaturesContainer(props) {

    const [features, setFeatures] = useState([]);
    const [newFeatureModalOpen, setNewFeatureModalOpen] = useState(false);
    const [featureModalOpen, setFeatureModalOpen] = useState(false);
    const [featureId, setFeatureId] = useState(null);
    const [showFeaturesSelect, setShowFeaturesSelect] = useState(false);

    const handleLinkClick = (id) => {
        setFeatureId(id)
        setFeatureModalOpen(true)
    }



    return (
        <Stack>
            <ShowFeatureContainer 
                setFeatureModalOpen={setFeatureModalOpen}
                featureModalOpen={featureModalOpen}
                featureId={featureId}
                projectId={props.projectId} 
                setFetchAgainFlag={props.setFetchAgainFlag}
            />
            <FeaturesNav
                setNewFeatureModalOpen={setNewFeatureModalOpen}
                setShowFeaturesSelect={setShowFeaturesSelect}
                showFeaturesSelect={showFeaturesSelect}
            />
            <NewFeature 
                setFetchAgainFlag={props.setFetchAgainFlag} 
                projectId={props.projectId} 
                userId={props.userId} 
                setFeatureModalOpen={setNewFeatureModalOpen} 
                newFeatureModalOpen={newFeatureModalOpen}
            />
            <FeaturesShowContainer
                features={props.features}
                handleLinkClick={handleLinkClick}
                setFeatureId={setFeatureId}
            />
            {/* <Accordion multiple>
                <Accordion.Item label="Priority: High">

                </Accordion.Item>
                <Accordion.Item label="Priority: Medium">

                </Accordion.Item>
                <Accordion.Item label="Priority: Low">
                    {renderFeatures("low")}
                </Accordion.Item>
            </Accordion> */}
        </Stack>
    )
}
