import type { Context as SolidContext } from "solid-js";
/* eslint-disable no-restricted-imports */
import {
  createContext as createSolidContext,
  useContext as useSolidContext,
} from "solid-js";
/* eslint-enable no-restricted-imports */

export const useContext = <T>(context: Context<T>) => {
  const contextValue = useSolidContext(context);

  if (!contextValue) {
    throw new Error(`${context.name} not provided`);
  }

  return contextValue;
};

export interface Context<T> extends SolidContext<T> {
  name: string;
}

export const createContext = <T>(name: string): Context<T | undefined> => {
  const contextValue = createSolidContext<T>();
  return {
    ...contextValue,
    name,
  };
};
