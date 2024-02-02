import type { JSX } from "solid-js";
import { For, Show } from "solid-js";
import type { ListItem } from "../../types/list-item";
import { Checkbox } from "../common/checkbox";
import { Collapse } from "../common/collapse";

type CollapseTitleProps = {
  title: string;
  subtitle: string;
  enabledCount: number;
};

type CollapseContentProps = {
  list: Array<ListItem<number> & { enabled: boolean }>;
  onClick: (item: ListItem<number>) => void;
};

type FilterListProps = CollapseContentProps &
  Omit<CollapseTitleProps, "enabledCount">;

const CollapseTitle = (props: CollapseTitleProps): JSX.Element => {
  return (
    <div class="flex select-none flex-col">
      <span class="text-lg">
        <Show when={props.enabledCount} fallback={props.title}>
          {props.title} ({props.enabledCount})
        </Show>
      </span>
      <span>{props.subtitle}</span>
    </div>
  );
};

const CollapseContent = (props: CollapseContentProps): JSX.Element => (
  <>
    <For each={props.list}>
      {(item) => {
        return (
          <Checkbox
            onChange={() => props.onClick(item)}
            checked={item.enabled}
            label={item.label}
          />
        );
      }}
    </For>
  </>
);

export const FilterList = (props: FilterListProps): JSX.Element => {
  return (
    <Collapse
      title={
        <CollapseTitle
          title={props.title}
          subtitle={props.subtitle}
          enabledCount={props.list.filter((item) => item.enabled).length}
        />
      }
      content={<CollapseContent list={props.list} onClick={props.onClick} />}
    />
  );
};
