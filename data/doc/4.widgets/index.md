# 🧱 Widgets

```json
{
  "edge": "top",
  "monitor": "HDMI-A-1",
  "layer": "overlay",
  "position": "left",
  "widget": {
    "type": "slider",
    "thickness": 40,
    "border_width": 6,
    "length": "12.5%",
    "redraw_only_on_internal_update": true,
    "preset": {
      "type": "speaker"
    }
  }
}
```

## Available widgets

`<type> - <widget>`

- `btn`
- `slide`
  - `speaker`
  - `microphone`
  - `backlight`
- `box`
  - `ring`
  - `text`
  - `tray`
- `workspace`
