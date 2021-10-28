import { cloneDeep } from "lodash";
import { uid } from "utils";

export default class Legend {
  id: string;
  legendDefinitionId: string;
  startValue: number | undefined;
  endValue: number | undefined;

  constructor({ id, legendDefinitionId }: { id?: string; legendDefinitionId: string }) {
    this.id = id ?? uid();
    this.legendDefinitionId = legendDefinitionId;
  }

  static set(object: { [key: string]: any }, key: string, value: any) {
    if (key) {
      const updatedObject = cloneDeep(object);
      updatedObject[key] = value;
      return updatedObject;
    }
    return this;
  }
}
