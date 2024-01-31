import type { JSX } from "solid-js";
import { For } from "solid-js";
import type { ListItem } from "../../types/list-item";
import { Checkbox } from "../common/checkbox";
import { Collapse } from "../common/collapse";

type FilterListProps<T> = {
  title: string;
  subtitle: string;
  list: ListItem<T>[];
  onClick: (item: ListItem<T>) => void;
  filterState: ListItem<T>[];
};

const CollapseTitle = <T,>(
  props: Pick<FilterListProps<T>, "title" | "subtitle" | "filterState">,
): JSX.Element => {
  const filtersEnabled = () =>
    props.filterState.filter((state) => state.value).length;

  return (
    <div class="flex select-none flex-col">
      <span class="text-lg">
        {filtersEnabled()
          ? `${props.title} (${filtersEnabled()})`
          : props.title}
      </span>
      <span>{props.subtitle}</span>
    </div>
  );
};

const CollapseContent = <T,>(
  props: Pick<FilterListProps<T>, "list" | "filterState" | "onClick">,
): JSX.Element => (
  <>
    <For each={props.list}>
      {(item) => {
        const filterItem = props.filterState.find(
          (state) => state.value === item.value,
        );
        return (
          <Checkbox
            onChange={() => props.onClick(item)}
            checked={!!filterItem?.value}
            label={item.label}
          />
        );
      }}
    </For>
  </>
);

export const FilterList = <T,>(props: FilterListProps<T>): JSX.Element => {
  return (
    <Collapse
      title={
        <CollapseTitle
          title={props.title}
          subtitle={props.subtitle}
          filterState={props.filterState}
        />
      }
      content={
        <CollapseContent
          list={props.list}
          onClick={props.onClick}
          filterState={props.filterState}
        />
      }
    />
  );
};
