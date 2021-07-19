import type { ResizableProps } from 're-resizable';

export type IPanelConfig = {
  [key in string]:
    | {
        component?: React.ReactElement;
        resizable?: boolean;
        resizeConfig?: ResizableProps;
      }
    | React.ReactElement;
};

export interface ISettings {
  rootSize?: any;
  autoBorder?: boolean;
  disableCache?: boolean;
  // For cache.Default is PANEL_MANAGER_CACHE_SIZE
  name?: string;
}

export interface IProps extends ISettings {
  panelConfig: IPanelConfig;
}
