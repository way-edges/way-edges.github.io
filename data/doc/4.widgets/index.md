# 🧱 Widgets

```json
{
  "widgets": {
    "type": "array",
    "items": { "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },

        ...

        // this thing
        "widget": {
          "$ref": "#/definitions/AllWidgets"
        }
      }
    }
  }
}
```

## Available widgets

`<type> - <widget>`

- `btn` - Button
- `slide` - Slide
- `speaker` - Speaker
- `microphone` - Microphone
- `backlight` - Backlight
- `box` - Box
  - `ring` - Ring (_Provide presets_)
  - `text` - Text (_Provide presets_)
- `hyprland-workspace` - Hyprland workspace

## In Plan

- Tray
