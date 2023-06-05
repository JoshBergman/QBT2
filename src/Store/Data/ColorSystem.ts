export interface IColorState {
  colorState: {
    new: string[];
    used: string[];
  };
  setColorState: (newColorState: IColorState["colorState"]) => void;
}

//The color system is essientially two stacks to keep track of current colors.
// when a new color is used it is unshifted onto the 'used' array.
// when an expense is cleared and the color becomes freed it is put back onto the top of the new array

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

export const colorSystem = {
  getNewColor: getNewColor,
  freeColor: freeColor,
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
  ],
  used: [],
};
