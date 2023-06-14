export interface IColorState {
  colorState: {
    new: string[];
    used: string[];
  };
  setColorState: (newColorState: IColorState["colorState"]) => void;
}

//The color system is essientially two stacks to keep track of current colors.
// when a new color is used it is unshifted onto the 'used' array.
// when an expense is cleared and the color becomes freed it is put back onto the top of the colorState.new array

// at the bottom of this file the initial colors are listed

const getNewColor = ({ colorState, setColorState }: IColorState) => {
  const colors = { ...colorState };
  const newColor = colors.new.shift();

  if (newColor !== undefined && newColor) {
    colors.used.unshift(newColor);
    setColorState(colors);

    return newColor;
  }
  return "gray";
};

const freeColor = (
  { colorState, setColorState }: IColorState,
  freedColor: string
) => {
  const colors = { ...colorState };

  const freedColorIndex = colorState.used.indexOf(freedColor);
  if (freedColorIndex === -1) {
    return;
  }
  colorState.used.splice(freedColorIndex, 1);
  colors.new.unshift(freedColor);
  setColorState(colors);
};

const freeAllColors = ({ colorState, setColorState }: IColorState) => {
  const colors = { ...colorState };
  for (let i = 0; i < colors.used.length; i++) {
    const freedColor = colors.used.shift();
    if (freedColor === undefined) {
      break;
    }

    colors.new.unshift(freedColor);
  }
  setColorState(colors);
};

export const colorSystem = {
  getNewColor: getNewColor,
  freeColor: freeColor,
  freeAllColors,
};

export const initialColors: IColorState["colorState"] = {
  new: [
    "#ff3333",
    "#77ff33",
    "#ff9999",
    "#bbff99",
    "#00bfff",
    "#0039e6",
    "#66d9ff",
    "#3F3AD7",
    "#7ABBE2",
    "#49B3BE",
    "#605DC1",
    "#A082BE",
    "#1A3998",
    "#2E95D2",
    "#7A94E2",
    "#417C9F",
    "#F39C12",
    "#F5CBA7",
    "#873600",
    "#196F3D",
    "#B03A2E",
    "#F9E79F",
    "#16A085",
    "#1D8348",
    "#C2185B",
    "#F44336",
    "#FDD835",
    "#A1887F",
    "#E6EE9C",
    "#D7CCC8",
    "#C5CAE9",
    "#827717",
  ],
  used: [],
};
