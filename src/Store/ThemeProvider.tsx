import { ThemeContext, theme } from "./ThemeContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IProviderProps) => {
  const themeValue = { theme: theme };

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};
