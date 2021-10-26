import {mount} from "@cypress/react";
import {Provider} from "@dhis2/app-runtime";
import React from 'react'
import OrgUnitSelector from "components/OrgUnitSelector";

const appConfig = {
    baseUrl: Cypress.env('dhis2BaseUrl'),
    apiVersion: Cypress.env('dhis2ApiVersion'),
}

const DHIS2Provider = ({children}: { children: any }) => (
    <Provider config={appConfig}>
        {children}
    </Provider>
)

describe("Org Unit Selector", () => {

    it('should render', function () {
        mount(<DHIS2Provider>
            <OrgUnitSelector value={{orgUnits: [], levels: []}} onUpdate={() => {
            }}/>
        </DHIS2Provider>)
    });
})
