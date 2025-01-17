import { useCallback, useEffect, useState } from "react";

type KeyEventData = {
  keyCode: string;
  shiftKey: boolean;
  ctrlKey: boolean;
  callback: () => void;
  redirect?: string;
};

const useKeyPress = () => {
  const [keyCodes, setKeyCodes] = useState<KeyEventData[]>([
    {
      keyCode:'KeyW',
      shiftKey: false,
      ctrlKey: true,
      callback: () => console.log("hi from useState"),
    },
  ]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      let shouldPreventDefault = false;

      keyCodes.forEach((keyData) => {
        
        if (
          event.ctrlKey === keyData.ctrlKey &&
          event.shiftKey === keyData.shiftKey &&
          event.code === keyData.keyCode
        ) {
          shouldPreventDefault = true;
          event.preventDefault(); // Prevent the browser's default action
          event.stopImmediatePropagation();
          event.stopPropagation(); // Stop propagation to other listeners
          keyData.callback();
          if (keyData.redirect) {
            window.location.pathname = keyData.redirect;
          }
          
        }
      });
      if (shouldPreventDefault) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation()
      }
    },
    [keyCodes]
  );

  const addKeyPressEvent = useCallback(
    (data: KeyEventData) => {
      setKeyCodes((prev) => {
        // Check if the event already exists
        const isEventAlreadyAdded = prev.some(
          (keyData) =>
            keyData.keyCode === `Key${data.keyCode.toUpperCase()}` &&
            keyData.shiftKey === data.shiftKey &&
            keyData.ctrlKey === data.ctrlKey
        );
  
        // If found, return the previous state without changes
        if (isEventAlreadyAdded) {
          console.warn("Event already exists, not adding duplicate.");
          return prev;
        }
  
        // Otherwise, add the new event
        return [
          ...prev,
          { ...data, keyCode: `Key${data.keyCode.toUpperCase()}` },
        ];
      });
    },
    []
  );
  
  useEffect(() => {
    const pressEvent = (e: KeyboardEvent) => {
      handleKeyPress(e);
    };

    // attach the event listener
    document.addEventListener("keydown", pressEvent);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", pressEvent);
    };
  }, [handleKeyPress]);

  return {
    addKeyPressEvent,
    events: keyCodes,
  };
};

export default useKeyPress;



