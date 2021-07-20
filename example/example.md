# A demo of `panel-manager`

`panel-manager` is React Component build for manage your panels. `re-resizable` is under the hood.

## Feature

- create panels declartive
- auto generate border
- memorize panel size

## Install

```bash
npm install panel-manager --save
```

```bash
yarn add panel-manager
```

## Usage

### 1. Imagine your panels property

You can draw your panel property on the paper first, our just imagine it in your head.

<details>
  <summary>demonstrate for property image</summary>
  <image alt="first step" src="https://gw.alipayobjects.com/mdn/rms_24f06c/afts/img/A*7BdxQoZFjwcAAAAAAAAAAAAAARQnAQ">
  </image>
</details>

### 2. Named them like *T(top)*, *L(left)*, *B(bottom)*, *R(right)*

**⚠️️ Important Note**: Because of the print order: Left, Right, Top, Bottom. You should always make L(R) first.It means you should split panels in the horizontal direction,and then in the vertical direction.

<details>
  <summary>demonstrate for named property image</summary>
  <image alt="second step" src="https://gw.alipayobjects.com/mdn/rms_24f06c/afts/img/A*npNYTLsE54UAAAAAAAAAAAAAARQnAQ">
  </image>
</details>


### 3. Nest name
If panels are nest, Named them like *TL(top left)*, *TLB(top left top, means the panel at the top left counter)*
remember the *T* and *L*  alway at the front of the name.

<details>
  <summary>demonstrate for nest name property</summary>
  <image alt="third step" src="https://gw.alipayobjects.com/mdn/rms_24f06c/afts/img/A*xaaSQbZuEG4AAAAAAAAAAAAAARQnAQ">
  </image>
</details>

### 4. create config

In this example, we make **R**, **RT** and **LTT** as a `<Resizable />` component.

```tsx
// panel-config.ts
import type { IPanelConfig } from 'panel-manager';

const config: IPanelConfig = {
  LTT: {
    component: <div>I'm LTT panel!</div>,
    resizable: true, // make LTT resizable,
    // same as Resizable props, 
    // but panel-manage default set enable and size(if you enable cache prop)
    resizableConfig: { 
      defaultSize: {
        height: '100px',
        width: 'auto'
      }
    }
  },
  R: {
    // in this example, R panel handles RT and RB panel, and R doesn't have other content
    // so we shouldn't set component field.
    resizable: true, // make R resizable,
    resizableConfig: {
      defaultSize: {
        height: '100%',
        width: '700px'
      }
    }
  },
  RT: {
    component: <div>I'm RT panel!</div>
    resizable: true,
    resizableConfig: {
      defaultSize: {
        height: '100px',
        width: 'auto'
      }
    }
  },
  // other un-resizable panel content
  LTR: <div>I'm LTR panel!</div>,
  RB: <div>I'm RB panel!</div>,
  LB: <div>I'm LB panel!</div>,
} 

export default config;
```

### 5. use the config

```tsx
// App.tsx
import React from 'react';
import PanelManager from 'panel-manager';
import panelConfig from './panel-config';


const App = () => {
  // Note that you MUST set PanelManger's Parent Component size.
  return (
    <div styles={{ height: '100vh', width: '100vw' }}>
      <PanelManager config={config} />
    </div>
  );
}

export default App;
```

## Motivation

When i was building an online editor, i tried to use the npm package `re-resizable` to create my panels. Like menu, hierarchy, toolbar, etc.
But when scene become complex, it's hard to manage and code.Case you should create more `Resizable` component to handle every panel.
So i create this component,it gives you an easy way to manage these panels.
