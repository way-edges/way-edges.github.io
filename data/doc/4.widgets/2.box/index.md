# WrapBox

A Grid Box act as a container for other widgets.

_Example:_

```json
{
  "name": "time",
  "edge": "bottom",
  "monitor": "HDMI-A-1",
  "layer": "overlay",
  "widget": {
    "type": "wrap-box",
    "widgets": [
      {
        "index": [-1, -1],
        "widget": {
          "type": "text",
          "fg_color": "#FFFFFF",
          "font_size": 30,
          "font_family": "JetBrainsMono Nerd Font",
          "preset": {
            "type": "time",
            "format": "%m-%d\n%H:%M"
          }
        }
      }
    ]
  }
}
```

## `type*`

```plaintext
const `wrap-box`
```

## `gap`

Gap between widgets in the grid.

_Type: `int`_  
_Default: `10`_

## `align`

Align of the items inside grid

```rust
#[serde(rename_all = "snake_case")]
pub enum Align {
    #[default]
    TopLeft,
    TopCenter,
    TopRight,
    CenterLeft,
    CenterCenter,
    CenterRight,
    BottomLeft,
    BottomCenter,
    BottomRight,
}
```

## `outlook`

Box style, currently only one: `window`.

_Type: `null | object`_  
_Default: `null` for default of `window`_

### `window`

#### `type*`

```plaintext
const `window`
```

#### `margins`

left, top, right, bottom.

_Type: `object`_  
_Default: `{}`_

#### `color`

Color of the box window.

Support: `#rgb`/`#rrggbb`/`#rrrgggbbb`/`rgb(r, g, b)`/`rgba(r, g, b, a)`...  
For full info, check [RGBA](https://gtk-rs.org/gtk4-rs/stable/latest/docs/src/gdk4/rgba.rs.html#205)

_Type: `string`_  
_Default: `#4d8080`_

#### `border_radius`

_Type: `int`_  
_Default: `5`_

#### `border_width`

_Type: `int`_  
_Default: `15`_

## `widgets`

Array of supported widgets and it's position in grid.

_Type: `array`_  
_Default: `[]`_

### `index*`

`[x, y]` position of the widget in grid, `-1` means to append widget to the end of the grid.

_Type: `[int, int]`_

### `widget*`

_Type: `object`_
