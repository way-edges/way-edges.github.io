# Box

A Grid Box act as a container for other specific widgets.  
Current available elements:

- Ring
- Text

_Example:_

```json
{
  "name": "stats",
  "edge": "left",
  "layer": "overlay",
  "frame_rate": 144,
  "widget": {
    "type": "box",
    "widgets": [
      {
        "index": [-1, -1],
        "widget": {
          "frame_rate": 144,
          "type": "ring",
          "prefix": "RAM ",
          "preset": "ram"
        }
      }
    ]
  }
}
```

## `type*`

```plaintext
const `box`
```

## `frame_rate`

Frame rate per second, won't hurt if over screen refresh rate.

_Type: `int`_  
_Default: `60`_

## `transition_duration`

Time cost of showing the widget from the edge.  
Millisecond.

_Type: `int`_  
_Default: `100`_

## `extra_trigger_size`

Extra mouse event input region of the widget, if `0` then the widget won't be shown by mouse hover.

_Type: `int | string`_  
_Default: `5`_

## `gap`

Gap between widgets in the grid.

_Type: `int`_  
_Default: `10`_

## `widgets`

Array of supported widgets and it's position in grid.

_Type: `array`_  
_Default: `[]`_

### `index*`

`[x, y]` position of the widget in grid, `-1` means to append widget to the end of the grid.

_Type: `[int, int]`_

### `widget*`

Normal widget item, currently only support `Ring` and `Text`.

_Type: `object`_

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

Tuple of 4 integers, left, top, right, bottom.

_Type: `[int, int, int, int]`_  
_Default: `[5,5,5,5]`_

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
