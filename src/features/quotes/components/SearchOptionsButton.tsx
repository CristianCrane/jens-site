import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Combobox, useCombobox } from '@mantine/core'

type SearchOptionsButtonProps = {
  label: string
  placeholder?: string
  data: string[]
  onSelectOption: (selectedOption: string) => void
  icon: ReactNode
}

export function SearchOptionsButton({
  label,
  placeholder,
  data,
  onSelectOption,
  icon,
}: SearchOptionsButtonProps) {
  const [search, setSearch] = useState('')
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
      combobox.focusTarget()
      setSearch('')
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput()
    },
  })

  const options = data
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ))

  return (
    <Combobox
      store={combobox}
      width={250}
      position="bottom-end"
      withArrow
      withinPortal={false}
      onOptionSubmit={(val) => {
        onSelectOption(val)
        combobox.closeDropdown()
      }}
      shadow="lg"
    >
      <Combobox.Target withAriaAttributes={false}>
        <Button
          size="xs"
          leftSection={icon}
          onClick={() => combobox.toggleDropdown()}
        >
          {label}
        </Button>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Search
          value={search}
          onChange={(event) => {
            setSearch(event.currentTarget.value)
          }}
          placeholder={placeholder ?? 'Search items'}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && combobox.dropdownOpened) {
              event.preventDefault()
            }
          }}
        />
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
