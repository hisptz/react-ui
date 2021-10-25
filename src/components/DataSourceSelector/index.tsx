import {Chip} from "@dhis2/ui";
import PropTypes from "prop-types";
import React, {useState} from "react";
import DataSource from "./components/DataSource";
import GroupSelector from "./components/GroupSelector";
import CustomFunctions from "components/DataSourceSelector/models/customFunctions";
import DataElements from "components/DataSourceSelector/models/dataElements";
import DataSets from "components/DataSourceSelector/models/dataSets";
import EventDataItems from "components/DataSourceSelector/models/eventDataItems";
import NativeDataSource from "components/DataSourceSelector/models/nativeDataSource";
import DataSourceModel from './models/dataSource'

const nativeDataSources = [
    {
        label: "Indicators",
        resource: "indicators",
        groupResource: "indicatorGroups",
        dimensionItemType: "INDICATOR",
        groupKey: "indicatorGroups.id",
        type: "indicator",
    },
    {
        label: "Program Indicators",
        resource: "programIndicators",
        dimensionItemType: "PROGRAM_INDICATOR",
        groupKey: "program.id",
        groupResource: "programs",
        type: "programIndicator",
    },
].map((source) => new NativeDataSource(source));


const dataElementConfig = new DataElements({
    label: "Data Elements",
    resource: "dataElements",
    groupResource: "dataElementGroups",
    dimensionItemType: "DATA_ELEMENT",
    groupKey: "dataElementGroups.id",
    type: "dataElement"
});
const eventDataItemsConfig = new EventDataItems();
const dataSetConfig = new DataSets({label: "Data Sets"});
const customFunctionsConfig = new CustomFunctions({
    label: "Custom Functions",
});

export default function DataSourceSelector({
                                               onSubmit,
                                               disabled
                                           }: { onSubmit: (data: object) => void, disabled: boolean }) {

    const [selectedDataSourceType, setSelectedDataSourceType] = useState<DataSourceModel>(
        nativeDataSources[0]
    );
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedDataSources, setSelectedDataSources] = useState([]);
    const onGroupChange = (group: React.SetStateAction<undefined>) => {
        setSelectedGroup(group);
    };

    const onDataSourceSelect = (selected: React.SetStateAction<never[]>) => {
        setSelectedDataSources(selected);
        onSubmit(selected);
    };

    const onDataSourceTypeChange = (sourceType: DataSourceModel) => {
        setSelectedGroup(undefined);
        setSelectedDataSourceType(sourceType);
    };

    return (
        <div className="start">
            <div className="column container-bordered">
                <div className="row p-16 wrap">
                    {nativeDataSources.map((source) => (
                        <Chip
                            onClick={() => onDataSourceTypeChange(source)}
                            selected={selectedDataSourceType.label === source.label}
                            key={`chip-${source.label}`}
                        >
                            {source.label}
                        </Chip>
                    ))}
                    <Chip
                        onClick={() => onDataSourceTypeChange(dataElementConfig)}
                        selected={selectedDataSourceType.label === dataElementConfig.label}
                    >
                        {dataElementConfig.label}
                    </Chip>
                    <Chip
                        onClick={() => onDataSourceTypeChange(eventDataItemsConfig)}
                        selected={
                            selectedDataSourceType.label === eventDataItemsConfig.label
                        }
                    >
                        {eventDataItemsConfig.label}
                    </Chip>
                    <Chip
                        onClick={() => onDataSourceTypeChange(dataSetConfig)}
                        selected={selectedDataSourceType.label === dataSetConfig.label}
                    >
                        {dataSetConfig.label}
                    </Chip>
                    <Chip
                        onClick={() => onDataSourceTypeChange(customFunctionsConfig)}
                        selected={
                            selectedDataSourceType.label === customFunctionsConfig.label
                        }
                    >
                        {customFunctionsConfig.label}
                    </Chip>
                </div>
                <div className="column start w-100 p-16">
                    <GroupSelector
                        selectedGroup={selectedGroup}
                        onSelect={onGroupChange}
                        selectedDataType={selectedDataSourceType}
                    />

                    <div className="pt-16">
                        <DataSource
                            disabled={disabled}
                            selected={selectedDataSources}
                            onChange={onDataSourceSelect}
                            selectedGroup={selectedGroup}
                            selectedDataSourceType={selectedDataSourceType}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
DataSourceSelector.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.array,
};
