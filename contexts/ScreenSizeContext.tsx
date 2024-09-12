import { createContext, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

interface ScreenSizeContext {
  width: number;
  height: number;
}

const ScreenSizeContext = createContext<ScreenSizeContext | null>(null);

export const ScreenSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [screenSize, setScreenSize] = useState<ScreenSizeContext>({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  useEffect(() => {
    const onChange = ({ window }: { window: ScreenSizeContext }) => {
      setScreenSize({
        width: window.width,
        height: window.height,
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  return (
    <ScreenSizeContext.Provider
      value={{ width: screenSize.width, height: screenSize.height }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};
