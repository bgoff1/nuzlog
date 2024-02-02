export const env = () => ({
  debugQuery: import.meta.env.VITE_DEBUG_QUERY === "true",
  local: import.meta.env.VITE_LOCAL_DEV === "true",
});
