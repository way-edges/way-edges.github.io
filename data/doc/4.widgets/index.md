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

## In Plan

- Hyprland workspace
- Tray

## Example

```json
{
  "widget": {
    // `type` is the most important
    "type": "backlight"
    // "width": 20,
    // "height": "12.5%",
    // "frame_rate": 60,
    // "fg_color": "#82AAFF"
  }
}
```
