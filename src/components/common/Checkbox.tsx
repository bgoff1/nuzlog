import type { Component } from "solid-js";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

const Checkbox: Component<CheckboxProps> = (props) => {
  return (
    <div class="form-control">
      <label class="label cursor-pointer gap-x-2">
        <span class="label-text">{props.label}</span>
        <input
          type="checkbox"
          checked={props.checked}
          onChange={() => {
            props.onChange();
          }}
          class="checkbox-primary checkbox"
        />
      </label>
    </div>
  );
};

export default Checkbox;
