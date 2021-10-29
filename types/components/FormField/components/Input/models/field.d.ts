import { FormFieldProps } from "../../../types";
export default class FormFieldModel {
    id: string | undefined;
    name: string;
    valueType: string;
    constructor(attributes: FormFieldProps);
    get defaults(): {};
}
