import i18n from "@dhis2/d2-i18n";
import { Button, Field } from "@dhis2/ui";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { remove, set } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Input from "../../index";
import FormFieldModel from "../../models/field";
import { FinalFormFieldInput } from "components/FormField/components/Input/types";
import { FormFieldProps } from "components/FormField/types";
type MultipleFieldsFieldProps = FinalFormFieldInput & {
  multipleField: FormFieldProps;
  initialFieldCount?: number;
  multipleFields?: Array<any>;
};

export default function MultipleFieldsField({ name, value, onChange, multipleField, initialFieldCount, multipleFields, ...props }: MultipleFieldsFieldProps) {
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
    const newField = new FormFieldModel({ ...multipleField });
    set(newField, ["id"], `${newField.id}-${fields.length}`);
    set(newField, ["name"], `${newField.id}-${fields.length}`);
    setFields([...fields, newField]);
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
    const tempValue = value ? [...value] : [];
    try {
      tempValue[index] = newValue;
    } catch (e) {
      tempValue.push(newValue);
    }
    onChange({ value: tempValue, name });
  };
  return (
    <Field {...props}>
      <div className="column">
        {multipleField
          ? fields.map((field, index) => {
              const input = {
                name: field.name,
                onChange: (value: any) => onFieldValueChange(index, value),
                value: value?.[index],
              };

              return (
                <div key={`${field?.id}-${index}`} className="row align-items-center w-100">
                  <div className="column w-75">
                    <Input valueType={field.valueType} input={input} />
                  </div>
                  <div className="column w-25">
                    {!value?.[index]?.isDefault && (
                      <Button disabled={index === 0 && fields.length === 1} icon={<DeleteIcon />} onClick={() => onDeleteField(field, index)}>
                        {i18n.t("Delete")}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          : multipleFields?.map((field, index) => {
              const input = {
                name: field.name,
                onChange: (value: any) => onFieldValueChange(index, value),
                value: value?.[index],
              };
              return (
                <div key={`${field?.id}-${index}`} className="row align-items-center w-100">
                  <div className="column w-100">
                    <Input valueType={field.valueType} input={input} {...field} />
                  </div>
                  {multipleField && (
                    <div className="column">
                      <Button disabled={index === 0 && fields.length === 1} icon={<DeleteIcon />} onClick={() => onDeleteField(field, index)}>
                        {i18n.t("Delete")}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
        {multipleField && (
          <div className="w-50">
            <Button icon={<AddIcon />} onClick={onAddField}>
              {i18n.t("Add Item")}
            </Button>
          </div>
        )}
      </div>
    </Field>
  );
}

MultipleFieldsField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  initialFieldCount: PropTypes.number,
  multipleField: PropTypes.object,
  multipleFields: PropTypes.arrayOf(PropTypes.instanceOf(FormFieldModel)),
  value: PropTypes.any,
};
