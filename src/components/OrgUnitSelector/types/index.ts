export type OrgUnit = {
  id: string;
  path?: string;
  displayName?: string;
};

export type OrgUnitSelectorValue = {
  orgUnits?: Array<OrgUnit>;
  levels?: Array<string>;
  groups?: Array<string>;
  userOrgUnit?: boolean;
  userSubUnit?: boolean;
  userSubX2Unit?: boolean;
};

export type OrgUnitSelectorProps = {
  value?: OrgUnitSelectorValue;
  onUpdate?: (value: OrgUnitSelectorValue) => void;
  showLevels?: boolean;
  showGroups?: boolean;
  showUserOptions?: boolean;
  singleSelection?: boolean;
};
