import Dexie from "dexie";
import { set } from "lodash";

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

export interface OfflineOrganisationUnitCount {
  orgUnits: {
    total: number;
    page: number;
  };
  levels: {
    total: number;
    page: number;
  };
  groups: {
    total: number;
    page: number;
  };
}

const defaultCount: OfflineOrganisationUnitCount = {
  orgUnits: {
    total: 0,
    page: 0,
  },
  levels: {
    total: 0,
    page: 0,
  },
  groups: {
    total: 0,
    page: 0,
  },
};

export class OfflineOrganisationUnitDB extends Dexie {
  organisationUnits!: Dexie.Table<OfflineOrganisationUnit, string>;
  organisationUnitGroups!: Dexie.Table<OfflineOrganisationUnitGroup, string>;
  organisationUnitLevels!: Dexie.Table<OfflineOrganisationUnitLevel, string>;

  count!: OfflineOrganisationUnitCount;
  localStorageKey = "ou";

  public constructor(name?: string) {
    super(name ?? "ou");
    this.version(2).stores({
      organisationUnits: "&id, displayName, parent.id, *organisationUnitGroups",
      organisationUnitGroups: "&id, displayName",
      organisationUnitLevels: "&id, displayName",
    });
    this.getCount();
  }

  getCount() {
    const count = localStorage.getItem(this.localStorageKey);
    if (count) {
      this.count = JSON.parse(count);
    } else {
      this.count = defaultCount;
    }
  }

  clearCount() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(defaultCount));
  }

  public updateCount({ resource, key, value }: { resource: "orgUnits" | "levels" | "groups"; key: "total" | "page"; value: number }) {
    const updatedCount = this.count;
    set(updatedCount, [resource, key], value);
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedCount));
  }

  public async addOrganisationUnits(organisationUnits: OfflineOrganisationUnit[]) {
    return this.organisationUnits.bulkAdd(organisationUnits);
  }
  public async clearOrgUnits() {
    return this.organisationUnits.clear();
  }

  public async addOrganisationUnitGroups(organisationUnitGroups: OfflineOrganisationUnitGroup[]) {
    return this.organisationUnitGroups.bulkAdd(organisationUnitGroups);
  }

  public async clearOrgUnitGroups() {
    return this.organisationUnitGroups.clear();
  }

  public async addOrganisationUnitLevels(organisationUnitLevels: OfflineOrganisationUnitLevel[]) {
    return this.organisationUnitLevels.bulkAdd(organisationUnitLevels);
  }

  public async clearOrgUnitLevels() {
    return this.organisationUnitLevels.clear();
  }

  public async hasOrganisationUnitLevels(): Promise<boolean> {
    const { total, page } = this.count.orgUnits;
    if (total === 0) {
      return false;
    }
    return total === page;
  }

  public async hasOrganisationUnitGroups(): Promise<boolean> {
    const { total, page } = this.count.groups;
    if (total === 0) {
      return false;
    }
    return total === page;
  }

  public async hasOrganisationUnits(): Promise<boolean> {
    const { total, page } = this.count.orgUnits;
    if (total === 0) {
      return false;
    }
    return total === page;
  }

  public async clear() {
    await this.organisationUnits.clear();
    await this.organisationUnitLevels.clear();
    await this.organisationUnitGroups.clear();
    this.clearCount();
  }
}

export const db: OfflineOrganisationUnitDB = new OfflineOrganisationUnitDB();
