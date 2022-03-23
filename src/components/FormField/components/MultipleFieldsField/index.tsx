import i18n from "@dhis2/d2-i18n";
import { Button, Field, IconAdd24, IconDelete24 } from "@dhis2/ui";
import { cloneDeep, remove, set } from "lodash";
import React, { useEffect, useState } from "react";
import FormFieldModel from "../../models/field";
import { FinalFormFieldInput, FormFieldProps } from "../../types";
import Input from "../Input";

type MultipleFieldsFieldProps = FinalFormFieldInput & {
  multipleField?: FormFieldProps;
  initialFieldCount?: number;
  multipleFields?: Array<any>;
  deletable?: boolean;
  addable?: boolean;
};

export default function MultipleFieldsField({
                                              name,
                                              value,
                                              onChange,
                                              multipleField,
                                              initialFieldCount,
                                              multipleFields,
                                              deletable,
                                              addable,
                                              ...props
                                            }: MultipleFieldsFieldProps, ref: React.Ref<any>) {
  const [fields, setFields] = useState<Array<FormFieldModel>>([]);

  useEffect(() => {
    function setInitialFields() {
      if (multipleField) {
        const count = value?.length || initialFieldCount || 1;
        let i = 0;
        const fields = [];
        for (i; i < count; i++) {
          const newField = new FormFieldModel({ ...multipleField });
          set(newField, ["id"], `${newField.id}-${fields.length}`);
          set(newField, ["name"], `${newField.id}-${fields.length}`);
          fields.push(newField);
        }
        setFields(fields);
      }
    }

    setInitialFields();
  }, []);

  const onAddField = () => {
    if (multipleField) {
      const newField = new FormFieldModel({ ...multipleField });
      set(newField, ["id"], `${newField.id}-${fields.length}`);
      set(newField, ["name"], `${newField.id}-${fields.length}`);
      setFields([...fields, newField]);
    }
  };

  const onDeleteField = (field: FormFieldModel, index: number) => {
    const temp = [...fields];
    remove(temp, ["id", field.id]);
    const tempValue = value ? [...value] : [];
    tempValue.splice(index, 1);
    onChange({ value: tempValue, name: field.name });
    setFields([...temp]);
  };

  const onFieldValueChange = (index: number, newValue: any) => {
    const tempValue = value ? cloneDeep(value) : [];
    try {
      tempValue[index] = newValue;
    } catch (e) {
      tempValue.push(newValue);
    }
    onChange({ value: tempValue, name });
  };
  return (
    <Field  {...props}>
      <div ref={ref} className="column">
        {multipleField
          ? fields?.map((field, index) => {
            const input = {
              name: field.name,
              onChange: (value: any) => onFieldValueChange(index, value),
              value: value?.[index]
            };
            return (
              <div key={`${field?.id}-${index}`} className="row align-items-center w-100 gap-8">
                <div className="column w-75">
                  <Input valueType={field.valueType} input={input} />
                </div>
                <div className="column w-25">
                  {!value?.[index]?.isDefault && deletable ? (
                    <Button disabled={index === 0 && fields.length === 1} icon={<IconDelete24 />}
                            onClick={() => onDeleteField(field, index)}>
                      {i18n.t("Delete")}
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })
          : multipleFields?.map((field, index) => {
            const input = {
              name: field.name,
              onChange: (value: any) => onFieldValueChange(index, value),
              value: value?.[index]
            };
            return (
              <div key={`${field?.id}-${index}`} className="row align-items-center w-100">
                <div className="column w-100">
                  <Input valueType={field.valueType} input={input} {...field} />
                </div>
                {multipleField && deletable ? (
                  <div className="column">
                    <Button disabled={index === 0 && fields.length === 1} icon={<IconDelete24 />}
                            onClick={() => onDeleteField(field, index)}>
                      {i18n.t("Delete")}
                    </Button>
                  </div>
                ) : null}
              </div>
            );
          })}
        {multipleField && addable ? (
          <div className="w-50">
            <Button icon={<IconAdd24 />} onClick={onAddField}>
              {i18n.t("Add Item")}
            </Button>
          </div>
        ) : null}
      </div>
    </Field>
  );
}
