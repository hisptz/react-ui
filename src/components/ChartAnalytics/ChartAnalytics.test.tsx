/* eslint-disable react/react-in-jsx-scope */
import { mount } from "@cypress/react"
import ChartAnalytics from "."


describe("On Chart Analytics Tests", () => {

    it("Render Chart Analytic Correctly", () => {
      mount(<ChartAnalytics 
        analysisData={{
            "_data": {
              "headers": [
                {
                  "name": "dx",
                  "column": "Data",
                  "valueType": "TEXT",
                  "type": "java.lang.String",
                  "hidden": false,
                  "meta": true
                },
                {
                  "name": "ou",
                  "column": "Organisation unit",
                  "valueType": "TEXT",
                  "type": "java.lang.String",
                  "hidden": false,
                  "meta": true
                },
                {
                  "name": "pe",
                  "column": "Period",
                  "valueType": "TEXT",
                  "type": "java.lang.String",
                  "hidden": false,
                  "meta": true
                },
                {
                  "name": "value",
                  "column": "Value",
                  "valueType": "NUMBER",
                  "type": "java.lang.Double",
                  "hidden": false,
                  "meta": false
                }
              ],
              "metaData": {
                "names": {
                  "202107": "July 2021",
                  "202108": "August 2021",
                  "202109": "September 2021",
                  "2021Q2": "Apr to Jun 2021",
                  "ImspTQPwCqd": "Sierra Leone",
                  "dx": "Data",
                  "pe": "Period",
                  "ou": "Organisation unit",
                  "ReUHfIn0pTQ": "ANC 1-3 Dropout Rate"
                },
                "dx": [
                  "ReUHfIn0pTQ"
                ],
                "pe": [
                  "2021Q2",
                  "202107",
                  "202108",
                  "202109"
                ],
                "ou": [
                  "ImspTQPwCqd"
                ],
                "co": []
              },
              "rows": [
                [
                  "ReUHfIn0pTQ",
                  "ImspTQPwCqd",
                  "2021Q2",
                  "39.7"
                ],
                [
                  "ReUHfIn0pTQ",
                  "ImspTQPwCqd",
                  "202107",
                  "33.4"
                ],
                [
                  "ReUHfIn0pTQ",
                  "ImspTQPwCqd",
                  "202108",
                  "33.2"
                ],
                [
                  "ReUHfIn0pTQ",
                  "ImspTQPwCqd",
                  "202109",
                  "31.3"
                ]
              ],
              "height": 4,
              "width": 4
            }
          }} chartHeight={1000} chartConfiguration={{
            layout:{
                "column": [
                  "dx"
                ],
                "row": [
                  "pe"
                ],
                "filter": [
                  "ou"
                ]
              },
          currentChartType: "column"
      }} />)
      cy.get('.highcharts-background').should('be.visible')
      cy.get('.active-chart-type > .chart-option-icon').click()
      cy.get('.highcharts-xaxis > .highcharts-axis-line').should('be.visible')
      cy.get('#dataImg').should('be.visible');
      cy.get('.active-chart-type > .chart-option-icon',{timeout:4000}).should('have.attr', 'src').should('have.length.above',2);
    })
  



})
