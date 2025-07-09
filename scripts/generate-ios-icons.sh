#!/bin/bash

# Required sizes for iOS app icons
SIZES=(
  "20x20@2x:40"
  "20x20@3x:60"
  "29x29@2x:58"
  "29x29@3x:87"
  "40x40@2x:80"
  "40x40@3x:120"
  "60x60@2x:120"
  "60x60@3x:180"
  "1024x1024@1x:1024"
)

# Source image path
SOURCE="assets/AppIcons/appstore.png"

# Output directory
OUTPUT_DIR="ios/DailyBoostApp/Images.xcassets/AppIcon.appiconset"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Generate icons
for size in "${SIZES[@]}"; do
  name="${size%%:*}"
  pixels="${size##*:}"
  output_name="icon_${name}.png"
  echo "Generating $output_name ($pixels x $pixels pixels)"
  sips -Z "$pixels" "$SOURCE" --out "$OUTPUT_DIR/$output_name"
done

# Update Contents.json
cat > "$OUTPUT_DIR/Contents.json" << 'EOL'
{
  "images": [
    {
      "size": "20x20",
      "idiom": "iphone",
      "filename": "icon_20x20@2x.png",
      "scale": "2x"
    },
    {
      "size": "20x20",
      "idiom": "iphone",
      "filename": "icon_20x20@3x.png",
      "scale": "3x"
    },
    {
      "size": "29x29",
      "idiom": "iphone",
      "filename": "icon_29x29@2x.png",
      "scale": "2x"
    },
    {
      "size": "29x29",
      "idiom": "iphone",
      "filename": "icon_29x29@3x.png",
      "scale": "3x"
    },
    {
      "size": "40x40",
      "idiom": "iphone",
      "filename": "icon_40x40@2x.png",
      "scale": "2x"
    },
    {
      "size": "40x40",
      "idiom": "iphone",
      "filename": "icon_40x40@3x.png",
      "scale": "3x"
    },
    {
      "size": "60x60",
      "idiom": "iphone",
      "filename": "icon_60x60@2x.png",
      "scale": "2x"
    },
    {
      "size": "60x60",
      "idiom": "iphone",
      "filename": "icon_60x60@3x.png",
      "scale": "3x"
    },
    {
      "size": "1024x1024",
      "idiom": "ios-marketing",
      "filename": "icon_1024x1024@1x.png",
      "scale": "1x"
    }
  ],
  "info": {
    "version": 1,
    "author": "xcode"
  }
}
EOL

echo "Done! App icons have been generated and configured." 