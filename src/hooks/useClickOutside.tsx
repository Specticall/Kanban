import { useEffect } from "react";

/**
 * Handles action involving clicking outside a certaine element
 */
export function useClickOutside(
  action: () => void,
  targetClassNameList: string[]
) {
  // Closes the drop down options when clicking outside the component.
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const containsClass = targetClassNameList.some(
        (className) =>
          (e.target as HTMLDivElement).closest(`.${className}`) !== null
      );

      if (containsClass) return;

      action();
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [targetClassNameList, action]);
}
