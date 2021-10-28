export type OrgUnitSelectorValue = {
  orgUnits: Array<any>;
  levels?: Array<string>;
  groups?: Array<string>;
  userOrgUnit?: boolean;
  userSubUnit?: boolean;
  userSubX2Unit?: boolean;
};

export type OrgUnitSelectorProps = {
  value: OrgUnitSelectorValue;
  onUpdate: (value: OrgUnitSelectorValue) => void;
  showLevels?: boolean;
  showGroups?: boolean;
  showUserOptions?: boolean;
};
