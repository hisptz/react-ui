// /* eslint-disable no-case-declarations */
// import { clone } from "lodash";
// import { ChartConfiguration } from "../interfaces/props";

// export function getCharObject(incommingAnalyticObject:any, chartConfiguration:ChartConfiguration) {
//   const analyticsObject = getSanitizedanalyticsBasedOnConfiguration(
//     incommingAnalyticObject,
//     chartConfiguration
//   );

//   let chartObject:any = getInitialChartObject(analyticsObject, chartConfiguration);

//   /**
//    * Extend chart options depending on type
//    */

//   switch (chartConfiguration.type) {
//     case "radar":
//       chartObject = getSpiderWebChartObject(
//         chartObject,
//         analyticsObject,
//         chartConfiguration
//       );
//       break;
//     case "solidgauge":
//       chartObject = getSolidGaugeChartObject(
//         chartObject,
//         analyticsObject,
//         chartConfiguration
//       );
//       break;
//     case "gauge":
//       const newChartConfiguration = clone(chartConfiguration);
//       newChartConfiguration.type = "solidgauge";
//       chartObject = getSolidGaugeChartObject(
//         chartObject,
//         analyticsObject,
//         newChartConfiguration
//       );
//       break;
//     default:
//       return getSanitizedChartObject(
//         getSpiderWebChartObject(
//           chartObject,
//           analyticsObject,
//           chartConfiguration
//         ),
//         chartConfiguration
//       );
//   }
//   return getSanitizedChartObject(chartObject, chartConfiguration);
// }
