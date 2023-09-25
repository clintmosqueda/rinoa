'use client'
import { Input, Box } from "@chakra-ui/react"
import { useSelect } from 'react-select-search';

export const InputDropdown = ({ options, value, multiple, disabled }) => {
  const [snapshot, valueProps, optionProps] = useSelect({
    options,
    value,
    multiple,
    disabled,
    search
  });

  return (
    <div>
      <input {...valueProps} placeholder="test" type="text" />
      {/* <button {...valueProps}>{snapshot.displayValue}</button> */}
      {snapshot.focus && (
        <ul>
          {snapshot.options.map((option) => (
            <li key={option.value}>
              <button {...optionProps} value={option.value}>{option.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
