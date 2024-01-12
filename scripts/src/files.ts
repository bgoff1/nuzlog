import fs from "fs/promises";
import path from "path";
import { ROUTES_DIRECTORY } from "./const";

export const filterFiles = async (filesOrDirectories: string[]) => {
  const results: string[] = [];
  for (const fileOrDirectory of filesOrDirectories) {
    const stats = await fs.stat(
      path.resolve(ROUTES_DIRECTORY, fileOrDirectory),
    );
    if (!stats.isDirectory()) {
      results.push(fileOrDirectory);
    }
  }

  return results.sort((a, b) =>
    a.includes("_layout.tsx") ? -1 : b.includes("_layout.tsx") ? 1 : 0,
  );
};
