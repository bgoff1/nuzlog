export const env = () =>
  ({
    USE_LOCAL_FILES: import.meta.env.VITE_API_BASE_URL === "true",
  }) as const;
