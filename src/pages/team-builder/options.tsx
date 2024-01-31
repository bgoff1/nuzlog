import { Checkbox } from "../../components/common/checkbox";
import { FilterList } from "../../components/team-builder/filter-list";
import { useTeam } from "../../context/team-builder/team";
import { useGenerations, useTypes } from "../../hooks/team-builder/options";
import type { ListItem } from "../../types/list-item";

const databaseMapper = (item: {
  name: string;
  id: number;
}): ListItem<number> => ({
  label: item.name,
  value: item.id,
});

const BuilderOptionsPage = () => {
  const types = useTypes();
  const generations = useGenerations();
  const { filters, dispatcher } = useTeam();

  return (
    <>
      <h1 class="sr-only">Team Builder Options</h1>
      <div class="flex flex-wrap gap-y-2 overflow-auto">
        <FilterList
          title="Types"
          subtitle="Show pokemon that have a certain type"
          list={types().map((type) => ({
            label: type.name,
            value: type.id,
          }))}
          filterState={filters().filter((filter) => filter.type === "type")}
          onClick={(filter) =>
            dispatcher({
              type: "toggleFilter",
              payload: {
                label: filter.label,
                value: filter.value,
                type: "type",
              },
            })
          }
        />
        <FilterList
          title="Generations"
          subtitle="Show pokemon that were introduced in a generation"
          list={generations().map(databaseMapper)}
          filterState={filters().filter(
            (filter) => filter.type === "generation",
          )}
          onClick={(filter) =>
            dispatcher({
              type: "toggleFilter",
              payload: {
                label: filter.label,
                value: filter.value,
                type: "generation",
              },
            })
          }
        />
        <div class="flex w-full justify-center">
          <Checkbox
            label="Show only fully evolved pokemon"
            checked={
              !!filters().find((filter) => filter.type === "fullyEvolved")
            }
            onChange={() => dispatcher({ type: "toggleFullyEvolved" })}
          />
        </div>
        <div class="flex w-full justify-center">
          <button
            class="btn btn-primary"
            onClick={() => dispatcher({ type: "clearFilters" })}>
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default BuilderOptionsPage;
