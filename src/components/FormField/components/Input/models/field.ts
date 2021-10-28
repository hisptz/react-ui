import { defaultsDeep } from "lodash";
import { FormFieldProps } from "components/FormField/types";

export default class FormFieldModel {
  id: string | undefined;
  name: string;
  valueType: string;

  constructor(attributes: FormFieldProps) {
    this.name = attributes.name;
    this.valueType = attributes.valueType;
    defaultsDeep(this, attributes, this.defaults);
  }

  get defaults() {
    return {};
  }
}
