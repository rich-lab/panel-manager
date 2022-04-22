import React from "react";
import ReactDOM from "react-dom";

import "./example.css";
import "normalize.css";

import PanelManager from "../src";

const defaultPanelSize = {
  LTL: { width: "320px", height: "auto" },
  R: { width: "500px", height: "auto" },
  LB: { width: "auto", height: "400px" },
};

const mockPanel = {
  R: {
    component: <div className="example-panel-content">Right Panel</div>,
    resizable: true,
    resizeConfig: {
      defaultSize: defaultPanelSize.R,
    },
  },
  LB: {
    component: <div className="example-panel-content">Left Panel</div>,
    resizable: true,
    resizeConfig: {
      defaultSize: defaultPanelSize.LB,
    },
  },
  LTL: {
    component: <div className="example-panel-content">Panel</div>,
    resizable: true,
    resizeConfig: {
      defaultSize: defaultPanelSize.LTL,
    },
  },
  LTR: <div className="example-panel-content linear-wipe">Manager</div>,
};

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: "100vh", width: "100vw" }}>
      <PanelManager panelConfig={mockPanel} disableCache autoBorder />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
