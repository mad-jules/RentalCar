import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useIsOpen, useOutsideClick } from "../../hooks";
import styles from "./Dropdown.module.css";
import { Icon, ICON_NAMES } from "../Icon/Icon";
import { blurOnMouseUp } from "../../utils/Handler";

export interface DropdownItem {
  value: string;
  label: string;
}

export type OnSelectArg = DropdownItem & { id: string };
type OnSelectCallback = (value: OnSelectArg) => void;

interface DropdownProps {
  id: string;
  title: string;
  data: DropdownItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  selectedValue?: string | null;
  onSelect?: OnSelectCallback;
}

export function Dropdown({
  id,
  title,
  data,
  selectedValue,
  onSelect,
}: DropdownProps) {
  const { isOpen, close, toggle } = useIsOpen();
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedValue
      ? data?.find((item) => item.value === selectedValue)
      : undefined
  );
  // console.log("isOpen", isOpen);
  const handleChange = (item: DropdownItem) => {
    // console.log("close", isOpen);
    setSelectedItem(item);
    onSelect?.({ ...item, id });
    close();
  };

  useEffect(() => {
    if (selectedValue && data) {
      const newSelectedItem = data.find((item) => item.value === selectedValue);

      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedValue, data]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggle();
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: dropdownRef, handler: close });

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      <button
        onMouseUp={blurOnMouseUp}
        id={id}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={handleButtonClick}
        className={clsx(styles.button)}
      >
        <span>{selectedItem?.label || title}</span>

        {isOpen ? (
          <Icon name={ICON_NAMES.CHEVRON_UP} />
        ) : (
          <Icon name={ICON_NAMES.CHEVRON_DOWN} />
        )}
      </button>

      {isOpen && (
        <div aria-label="Dropdown menu" className={clsx(styles.dropdown)}>
          <ul role="menu" aria-labelledby={id} className={styles.menu}>
            {data?.map((item) => (
              <li
                key={item.value}
                onClick={(e) => {
                  handleChange(item);
                }}
                className={clsx(
                  styles.item,
                  selectedItem?.value === item.value && styles.itemActive
                )}
              >
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
