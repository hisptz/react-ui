import Dexie from "dexie";

export interface OfflineOrganisationUnit {
  id: string;
  name: string;
  displayName: string;
  level: number;
  parent: { id: string };
  path: string;
  organisationUnitGroups?: string[];
}

export interface OfflineOrganisationUnitGroup {
  id: string;
  name: string;
  displayName: string;
}

export interface OfflineOrganisationUnitLevel {
  id: string;
  name: string;
  displayName: string;
  level: number;
}

export class OfflineOrganisationUnitDB extends Dexie {
  organisationUnits!: Dexie.Table<OfflineOrganisationUnit, string>;
  organisationUnitGroups!: Dexie.Table<OfflineOrganisationUnitGroup, string>;
  organisationUnitLevels!: Dexie.Table<OfflineOrganisationUnitLevel, string>;

  public constructor(name?: string) {
    super(name ?? "ou");
    this.version(2).stores({
      organisationUnits: "&id, displayName, parent.id, *organisationUnitGroups",
      organisationUnitGroups: "&id, displayName",
      organisationUnitLevels: "&id, displayName",
    });
  }

  public async addOrganisationUnits(organisationUnits: OfflineOrganisationUnit[]) {
    return this.organisationUnits.bulkAdd(organisationUnits);
  }

  public async addOrganisationUnitGroups(organisationUnitGroups: OfflineOrganisationUnitGroup[]) {
    return this.organisationUnitGroups.bulkAdd(organisationUnitGroups);
  }

  public async addOrganisationUnitLevels(organisationUnitLevels: OfflineOrganisationUnitLevel[]) {
    return this.organisationUnitLevels.bulkAdd(organisationUnitLevels);
  }

  public async hasOrganisationUnitLevels(): Promise<boolean> {
    return (await this.organisationUnitLevels.count()) > 0;
  }

  public async hasOrganisationUnitGroups(): Promise<boolean> {
    return (await this.organisationUnitGroups.count()) > 0;
  }

  public async hasOrganisationUnits(): Promise<boolean> {
    return (await this.organisationUnits.count()) > 0;
  }

  public async clear() {
    await this.organisationUnits.clear();
    await this.organisationUnitLevels.clear();
    await this.organisationUnitGroups.clear();
  }
}

export const db: OfflineOrganisationUnitDB = new OfflineOrganisationUnitDB();
