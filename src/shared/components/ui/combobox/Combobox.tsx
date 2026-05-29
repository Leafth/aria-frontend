import { useEffect, useMemo, useRef, useState } from "react";
import type { ComboboxProps, Option } from "./combobox.types";
import { comboboxStyles as styles } from "./combobox.styles";

export function Combobox({
  label = "Raça",
  placeholder = "Digite a raça",
  options,
  value,
  error,
  disabled = false,
  onChange,
}: ComboboxProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!value?.breed_id && !value?.breed_name) {
      setInputValue("");
      return;
    }

    if (value.breed_id) {
      const selectedOption = options.find(
        (option) => option.id === value.breed_id,
      );

      setInputValue(selectedOption?.name ?? "");
      return;
    }

    setInputValue(value.breed_name ?? "");
  }, [value?.breed_id, value?.breed_name, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = useMemo(() => {
    const search = inputValue.trim().toLowerCase();

    if (!search) return options;

    return options.filter((option) =>
      option.name.toLowerCase().includes(search),
    );
  }, [inputValue, options]);

  const exactOption = options.find(
    (option) => option.name.toLowerCase() === inputValue.trim().toLowerCase(),
  );

  const shouldShowNewOption = inputValue.trim() && !exactOption;

  function handleInputChange(text: string) {
    setInputValue(text);
    setIsOpen(true);

    const matchedOption = options.find(
      (option) => option.name.toLowerCase() === text.trim().toLowerCase(),
    );

    if (matchedOption) {
      onChange({
        breed_id: matchedOption.id,
        breed_name: undefined,
      });

      return;
    }

    onChange({
      breed_id: undefined,
      breed_name: text,
    });
  }

  function handleSelectOption(option: Option) {
    setInputValue(option.name);
    setIsOpen(false);

    onChange({
      breed_id: option.id,
      breed_name: undefined,
    });
  }

  function handleUseNewBreed() {
    const breedName = inputValue.trim();

    if (!breedName) return;

    setInputValue(breedName);
    setIsOpen(false);

    onChange({
      breed_id: undefined,
      breed_name: breedName,
    });
  }

  return (
    <div
      ref={wrapperRef}
      className={`${styles.container} ${isOpen ? styles.containerOpen : ""}`}
    >
      {label && <label className={styles.label}>{label}</label>}

      <input
        type="text"
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => handleInputChange(event.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />

      {isOpen && !disabled && (
        <div
          className={styles.dropdown}
          onWheel={(event) => event.stopPropagation()}
        >
          <div className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={styles.option}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleSelectOption(option);
                  }}
                >
                  {option.name}
                </button>
              ))
            ) : (
              <div className={styles.emptyOption}>Nenhuma raça encontrada</div>
            )}
          </div>

          {shouldShowNewOption && (
            <>
              <div className={styles.divider} />

              <button
                type="button"
                className={styles.newOption}
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleUseNewBreed();
                }}
              >
                Usar nova raça: <strong>{inputValue.trim()}</strong>
              </button>
            </>
          )}
        </div>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
