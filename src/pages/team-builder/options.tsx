import { Checkbox } from "../../components/common/checkbox";
import { FilterList } from "../../components/team-builder/filter-list";
import type {
  Filter,
  FilterType,
} from "../../context/team-builder/filter-reducer";
import { useFilters } from "../../context/team-builder/filters";
import {
  useGenerations,
  useRegions,
  useTypes,
  useVersions,
} from "../../hooks/team-builder/options";
import type { ListItem } from "../../types/list-item";

const databaseMapper = (
  items: Array<{ name: string; id: number }> | undefined,
  type: FilterType,
  filters: Filter[],
) =>
  (items ?? []).map((item) => ({
    label: item.name,
    value: item.id,
    enabled: !!filters.find(
      (filter) => filter.value === item.id && filter.type === type,
    ),
  }));

const BuilderOptionsPage = () => {
  const types = useTypes();
  const generations = useGenerations();
  const regions = useRegions();
  const versions = useVersions();
  const { filters, dispatcher } = useFilters();

  const toggleFilter = (filter: ListItem<number>, type: FilterType) =>
    dispatcher({
      type: "toggleFilter",
      payload: {
        label: filter.label,
        value: filter.value,
        type,
      },
    });

  return (
    <>
      <h1 class="sr-only">Team Builder Options</h1>
      <div class="flex flex-wrap gap-y-2 overflow-auto">
        <FilterList
          title="Types"
          subtitle="Show pokemon that have a certain type"
          list={databaseMapper(types.data, "type", filters())}
          onClick={(filter) => toggleFilter(filter, "type")}
        />

        <FilterList
          title="Regions"
          subtitle="Show pokemon found in a region"
          list={databaseMapper(regions.data, "region", filters())}
          onClick={(filter) => toggleFilter(filter, "region")}
        />
        <FilterList
          title="Version"
          subtitle="Show pokemon found in a version"
          list={databaseMapper(versions.data, "version", filters())}
          onClick={(filter) => toggleFilter(filter, "version")}
        />
        <FilterList
          title="Generations"
          subtitle="Show pokemon that were introduced in a generation"
          list={databaseMapper(generations.data, "generation", filters())}
          onClick={(filter) => toggleFilter(filter, "generation")}
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
