import React from 'react';
import { Resizable } from 're-resizable';

import { ResizeDriectionMap as ResizeDirectionMap, PANEL_MANAGER_CACHE_SIZE } from '../constants';

import type { IPanelConfig, ISettings } from '../types';
import type { Size, ResizeCallback } from 're-resizable';
import type { ReactElement } from 'react';

export const checkContradict = (
  key: 'L' | 'R' | 'T' | 'B',
  keys: ('L' | 'R' | 'T' | 'B')[],
  chainedLevelName: string,
): void => {
  if (key === 'L' || key === 'R') {
    const indexT = keys.indexOf('T');
    const indexB = keys.indexOf('B');
    if (indexT > -1) {
      throw new Error(
        `Parse panel faild. The ${
          chainedLevelName + key
        } panel is contradict with panel ${chainedLevelName}T.`,
      );
    }
    if (indexB > -1) {
      throw new Error(
        `Parse panel faild. The ${
          chainedLevelName + key
        } panel is contradict with panel ${chainedLevelName}B.`,
      );
    }
  }
  if (key === 'T' || key === 'B') {
    const indexL = keys.indexOf('L');
    const indexR = keys.indexOf('R');
    if (indexL > -1) {
      throw new Error(
        `Parse panel faild. The ${
          chainedLevelName + key
        } panel is contradict with panel ${chainedLevelName}L.`,
      );
    }
    if (indexR > -1) {
      throw new Error(
        `Parse panel faild. The ${
          chainedLevelName + key
        } panel is contradict with panel ${chainedLevelName}R.`,
      );
    }
  }
};


// Print principle: Left, Right, Top, Bottom
const sortNames = (names: string[]) => {
  if (names.join('') === 'BT') return ['T', 'B'];
  if (names.join('') === 'RL') return ['L', 'R'];
  return names;
};

const genRealSize = (originDefaultSize: Size | undefined, realName: string, rootConfig: ISettings) => {
  if (rootConfig.disableCache) return originDefaultSize;

  const cacheVal = localStorage.getItem(rootConfig.name || PANEL_MANAGER_CACHE_SIZE);
  if (!cacheVal) return originDefaultSize;

  try {
    const cacheSize = JSON.parse(localStorage.getItem(rootConfig.name || PANEL_MANAGER_CACHE_SIZE)!)[
      realName
    ];
    const realSize = { ...originDefaultSize, ...cacheSize };
    return realSize;
  } catch (error) {
    return originDefaultSize;
  }
};

const onResizeStop = ({
  panelPos,
  direction,
  cb,
  cacheKey,
}: {
  panelPos: string;
  direction: string;
  cb: ResizeCallback | undefined,
  cacheKey?: string;
}) => (_: any, __: any, ele: HTMLElement) => {
  const rect = ele.getBoundingClientRect();
  const updatedRect = rect[direction];
  const panelRect = { [panelPos]: { [direction]: `${updatedRect}px` } };

  // update rect cache
  const cache = JSON.parse(localStorage.getItem(cacheKey || PANEL_MANAGER_CACHE_SIZE)!);
  const nextCache = { ...cache, ...panelRect };
  localStorage.setItem(cacheKey || PANEL_MANAGER_CACHE_SIZE, JSON.stringify(nextCache));

  if (cb) (cb as any)();
};

export const genRecursive = (rawConfig: IPanelConfig, rootConfig: ISettings = {}, refs) => {
  return function recursive(rootPanel, chainedLevelName = '') {
    if (!rootPanel) return null;
    let names: any = Object.keys(rootPanel);
    names = sortNames(names);
    const children: any = [];
    for (let i = 0; i < names.length; i += 1) {
      const name = names[i];
      const realName = `${chainedLevelName}${name}`;
      const dataProps = {
        'data-panel-name': realName,
        'data-panel-type': name,
        'data-panel-resizable': false,
      };
      const isColumn = rawConfig[`${realName}T`] || rawConfig[`${realName}B`];

      checkContradict(name, names, chainedLevelName);
      const config = rawConfig[realName];
      let element: ReactElement | null = null;
      if (!config) {
        element = (
          <div
            style={isColumn ? { flexDirection: 'column' } : {}}
            key={`rootPanel-${realName}`}
            {...dataProps}
          >
            {recursive(rootPanel[name], chainedLevelName + name)}
          </div>
        );
      } else if (React.isValidElement(config)) {
        element = (
          <div className="panel-content-container" key={`rootPanel-${realName}`} {...dataProps}>
            {config}
            {recursive(rootPanel[name], chainedLevelName + name)}
          </div>
        );
      } else if (config) {
        if (config.resizable) {
          const direction = { [ResizeDirectionMap[name]]: true };
          const handleClasses = { [ResizeDirectionMap[name]]: `panel-manager-handler panel-manager-${name}-handler` };
          dataProps['data-panel-resizable'] = true;

          const genCacheDimension = (n) => {
            if (n === 'L' || n === 'R') return 'width';
            if (n === 'T' || n === 'B') return 'height';
            return 'width';
          };

          const style = config.resizeConfig?.style ?? {};

          element = (
            <Resizable
              {...dataProps}
              handleClasses={handleClasses}
              {...config.resizeConfig}
              defaultSize={genRealSize(config.resizeConfig?.defaultSize, realName, rootConfig)}
              enable={direction}
              key={`rootPanel-${realName}`}
              style={isColumn ? { flexDirection: 'column', ...style } : style}
              ref={c => refs[realName] = c}
              onResizeStop={onResizeStop({
                panelPos: realName,
                direction: genCacheDimension(name),
                cb: config.resizeConfig?.onResizeStop,
                cacheKey: rootConfig.name,
              })}
              className={`${rootConfig.autoBorder ? 'resizable-default-border' : ''}`}
            >
              {config.component && <div className="panel-content-container">{config.component}</div>}
              {recursive(rootPanel[name], chainedLevelName + name)}
            </Resizable>
          );
        } else {
          element = (
            <div
              style={isColumn ? { flexDirection: 'column' } : {}}
              key={`rootPanel-${realName}`}
              id={realName}
              data-panel-type={name}
              data-panel-resizable={false}
            >
              {config.component && <div className="panel-content-container">{config.component}</div>}
              {recursive(rootPanel[name], chainedLevelName + name)}
            </div>
          );
        }
      }

      children.push(element);
    }
    return children;
  };
};

export const panelConfigParser = (
  panelConfig: IPanelConfig,
  rootConfig: ISettings,
  refs: Record<string, any>,
): ReactElement[] => {
  let names = Object.keys(panelConfig);
  const panelTree = {};

  names = names.sort((a, b) => {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return 0;
  });

  names.forEach((item) => {
    let last = panelTree;
    for (let subIndex = 0; subIndex < item.length; subIndex += 1) {
      const subItem = item[subIndex];
      if (!last[subItem]) {
        last[subItem] = {};
      }
      last = last[subItem];
    }
  });

  const recursiveFunc = genRecursive(panelConfig, rootConfig, refs);

  const nodes = recursiveFunc(panelTree, '');

  return nodes;
};
