# panel-manager

Provide an easy way to manage your panels.

https://rich-lab.github.io/panel-manager/

## Features

- Create panels declaratively
- Generate border automatically
- Memorize panel sizes

## Installation

```bash
npm install panel-manager --save
```

```bash
yarn add panel-manager
```

## Usage

```tsx
import PanelManager from 'panel-manager';
import type { IPanelConfig } from 'panel-manager';

const config: IPanelConfig = { ... };

const App = () => <PanelManager panelConfig={config} />
```

### Props

|name|description|required|default|
|:---:|:---:|:---:|:---:|
|disableCache|disble cache panel size feature|x|`false`|
|autoBorder|auto generate panel border|x|`false`|
|name|cache name, for `localStorage.setItem(name, PANEL_SIZE)`|x|PANEL_MANAGER|

## Custom style

### border

```css
:root {
  --panel-manager-border-color: #e4e4e4;  
  --panel-manager-border--active-color: #1890ff;  
}
```

## Changelog

The changelog can be found on the [Releases page](https://github.com/rich-lab/panel-manager/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Mrkou47](https://github.com/mrkou47) and [contributors](https://github.com/rich-lab/panel-manager/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
