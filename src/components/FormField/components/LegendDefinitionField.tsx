import { Field, Input, Popover } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { uid } from "../../../core/utils";
import { FinalFormFieldInput } from "../types";
import "../styles/style.css";

type ColorPickerProps = {
  reference: EventTarget;
  value: any;
  onClose: () => void;
  onChange: (value: any) => void;
};

function ColorPickerPopper({ reference, value, onClose, onChange }: ColorPickerProps) {
  return (
    <Popover reference={reference} placement="auto" strategy="fixed" className="popper" onClickOutside={onClose}>
      <SketchPicker
        color={
          // @ts-ignore
          { hex: value }
        }
        onChange={(color: { hex: any }) => {
          onChange(color.hex);
          onClose();
        }}
      />
    </Popover>
  );
}

ColorPickerPopper.propTypes = {
  reference: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func
};

export default function LegendDefinitionField({
                                                name,
                                                label,
                                                value,
                                                onChange,
                                                ...props
                                              }: FinalFormFieldInput, ref: React.Ref<any>) {
  const { color, name: legendName, id } = value ?? {};
  const [reference, setReference] = useState<EventTarget | undefined>(undefined);

  const onColorChange = (color: any) => {
    onChange({
      name,
      value: {
        ...value,
        id: id ?? uid(),
        color
      }
    });
  };

  const onNameChange = (newName: { value: string }) => {
    onChange({
      name,
      value: {
        ...value,
        id: id ?? uid(),
        name: newName.value
      }
    });
  };

  return (
    <Field  {...props} name={name} label={label} value={value}>
      <div ref={ref} id={name} className={"legend-definition-container"}>
        <div
          id={`color-selector-btn-${name}`}
          onClick={(e) => setReference(e.currentTarget)}
          style={{ background: color, borderColor: "#D5DDE5" }}
          className={"legend-color"}>
          {color}
        </div>
        <div className={"legend-input"}>
          <Input dataTest={`legend-definition-text-${name}`} onChange={onNameChange} value={legendName} />
        </div>
      </div>
      {reference &&
        <ColorPickerPopper onClose={() => setReference(undefined)} reference={reference} value={value?.color}
                           onChange={onColorChange} />}
    </Field>
  );
}
