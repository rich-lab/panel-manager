import React from 'react';
import { Resizable } from 're-resizable';

import { panelConfigParser } from './utils';
import { defaultRootSize } from './constants';

import type { ReactElement } from 'react';
import type { IProps } from './types';

import './index.css';

type IState = { panels: ReactElement[] };
class PanelManager extends React.PureComponent<IProps, IState> {
  // 面板的 ref 保存在这里
  panelRefs: Record<string, Resizable> = {}
  constructor(props: IProps) {
    super(props);
    const { panelConfig, ...rest } = this.props;
    const panels = panelConfigParser(panelConfig, rest, this.panelRefs);
    this.state = { panels };
  }

  UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    const panels = panelConfigParser(nextProps.panelConfig, nextProps, this.panelRefs);
    this.setState({ panels });
  }

  render() {
    const { children, rootSize } = this.props;
    const { panels } = this.state;

    if (!panels) return null;

    let isColumn = 'row';
    if (panels[0].props['data-panel-type'] === 'T') isColumn = 'column';

    return (
      <>
        {children}
        <div
          style={{
            ...defaultRootSize,
            ...(rootSize || {}),
            display: 'flex',
            flexDirection: isColumn,
          }}
        >
          {panels}
        </div>
      </>
    );
  }
}

export default PanelManager;
