import propTypes from "prop-types";
import AccessibilityAndSharing from "../../Shared/Componets/AccesibilityAndSharing";
import CalculationDetails from "./Components/calculationDetails/Index";
import DataElementSIndicator from "./Components/dataElementsInIndicator/dataElementsIndicator";
import DatasetsReportingRates from "./Components/DataSetReportingRate";
import DataSource from "./Components/DataSource/dataSource";
import IndicatorFacts from "./Components/indicatorFacts/indicatorFacts";
import Introduction from "./Components/introduction/introduction";
import LegendsAnalysis from "./Components/legendsAnalysis/legendsAnalysis";
import ProgramIndicatorIndicator from "./Components/ProgramIndicator";

export default function Index({ id }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "auto" }}>
      <Introduction id={id} />
      <DataSource id={id} />
      <IndicatorFacts id={id} />
      <LegendsAnalysis id={id} />
      <CalculationDetails id={id} />
      <DataElementSIndicator />
      <ProgramIndicatorIndicator />
      <DatasetsReportingRates />
      <AccessibilityAndSharing id={id} resourceType={"indicators"} />
    </div>
  );
}

Index.propTypes = {
  id: propTypes.string.isRequired,
};
