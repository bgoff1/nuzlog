import { Checkbox } from "../../components/common/checkbox";
import { FilterList } from "../../components/team-builder/filter-list";
import { useTeam } from "../../context/team-builder/team";
import {
  useGenerations,
  useRegions,
  useTypes,
  useVersions,
} from "../../hooks/team-builder/options";

const databaseMapper = (
  items: Array<{ name: string; id: number }> | undefined,
) =>
  (items ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

const BuilderOptionsPage = () => {
  const types = useTypes();
  const generations = useGenerations();
  const regions = useRegions();
  const versions = useVersions();
  const { filters, dispatcher } = useTeam();

  return (
    <>
      <h1 class="sr-only">Team Builder Options</h1>
      <div class="flex flex-wrap gap-y-2 overflow-auto">
        <FilterList
          title="Types"
          subtitle="Show pokemon that have a certain type"
          list={databaseMapper(types.data)}
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
          title="Regions"
          subtitle="Show pokemon found in a region"
          list={databaseMapper(regions.data)}
          filterState={[]}
          onClick={() => {}}
        />
        <FilterList
          title="Version"
          subtitle="Show pokemon found in a version"
          list={databaseMapper(versions.data)}
          filterState={[]}
          onClick={() => {}}
        />
        <FilterList
          title="Generations"
          subtitle="Show pokemon that were introduced in a generation"
          list={databaseMapper(generations.data)}
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
