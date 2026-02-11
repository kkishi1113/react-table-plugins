import type { OnChangeFn, Updater } from "@tanstack/react-table";

export type DensityState = "sm" | "md" | "lg";

export interface DensityTableState {
  density?: DensityState;
}

export interface DensityOptions {
  enableDensity?: boolean;
  onDensityChange?: OnChangeFn<DensityState>;
}

export interface DensityInstance {
  setDensity: (updater: Updater<DensityState>) => void;
  toggleDensity: (value?: DensityState) => void;
}
