export type VMProps = {};

export type VProps = VMProps & {
  rdx: {
    currentError: Error,
    fetching: boolean,
    onInitializeAppContainerRef: (ref: any) => void,
  },
};
