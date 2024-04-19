import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color'

interface ColorPickerProps {
  colors: string[]; // Predefined colors
  onSelect: (color: string) => void;
  defaultColor?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, onSelect, defaultColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>(defaultColor || colors[0]);
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor || colors[0]);

  const isColorInPredefined = (color: string) => colors.includes(color) || color === defaultColor;

  useEffect(()=>{
    setCurrentColor(defaultColor || colors[0])
    setSelectedColor(defaultColor || colors[0])
    onSelect(defaultColor || colors[0])
    // console.log("inside useefect currentc olor "+ currentColor )
    // console.log("inside useefect elected olor "+ selectedColor )
  },[])
  const handleColorSelect = (event: React.MouseEvent<HTMLButtonElement>, color: string) => {
    event.preventDefault();
    setCurrentColor(color);
    setSelectedColor(color);
    setDisplayColorPicker(false);
    onSelect(color);
  };

  const handleApplyColor = () => {
    setSelectedColor(currentColor);
    setCurrentColor(currentColor)
    setDisplayColorPicker(false); // Close the picker
    onSelect(currentColor); // Apply the selected color
  };

  const handleChangeComplete = (color: any) => {
    setCurrentColor(color.hex);
  };

  const toggleColorPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDisplayColorPicker(!displayColorPicker);
  };

  // Display the predefined colors and the selected custom color if it's not predefined
  const displayColors = isColorInPredefined(currentColor) ? colors : [...colors, currentColor];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayColors.map((color, index) => (
        <button
          key={`${color}-${index}`}
          className={`h-8 w-8 rounded-full ${selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
          style={{ backgroundColor: color }}
          onClick={(event) => handleColorSelect(event, color)}
        />
      ))}
      <button onClick={(event) => toggleColorPicker(event)} className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-lg">
        ...
      </button>
      {displayColorPicker && (
        <div className="fixed inset-0 z-999 flex items-center justify-center">
          <div className="bg-white p-5 shadow-lg rounded-lg">
            <SketchPicker color={selectedColor} onChangeComplete={handleChangeComplete} />
            <button
              onClick={handleApplyColor}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
