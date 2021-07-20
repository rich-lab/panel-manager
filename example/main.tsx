import React from 'react';
import ReactDOM from 'react-dom';

import { html } from './example.md';

import './example.css';
import 'normalize.css';
import 'github-markdown-css/github-markdown.css';
import './prism-github.css';

import PanelManager from '../src';
import { IPanelConfig } from '../src/types';

const defaultPanelSize = {
  LTL: { width: '420px', height: 'auto', minWidth: '380px' },
  R: { width: '600px', height: 'auto' },
  LB: { width: 'auto', height: '300px' },
};

const mockPanel: IPanelConfig = {
  R: {
    component: <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ padding: '0 10px', width: '100%' }} />
    </div>,
    resizable: true,
    resizeConfig: {
      defaultSize: defaultPanelSize.R,
      minWidth: defaultPanelSize.R.width
    }
  },
  LB: {
    component: (
      <div className="example-panel-content name-content">
        <span>LB</span>
      </div>
    ),
    resizable: true,
    resizeConfig: {
      defaultSize: defaultPanelSize.LB,
      minHeight: defaultPanelSize.LB.height,
    }
  },
  LTL: {
    component: <div className="example-panel-content name-content">Panel</div>,
    resizable: true,
    resizeConfig: {
      defaultSize: defaultPanelSize.LTL,
      maxWidth: defaultPanelSize.LTL.width,
      minWidth: defaultPanelSize.LTL.minWidth,
    }
  },
  LTR: <div className="example-panel-content linear-wipe name-content">Manager</div>,
};

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '100vh', width: '100vw' }}>
      <PanelManager panelConfig={mockPanel} disableCache autoBorder />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
