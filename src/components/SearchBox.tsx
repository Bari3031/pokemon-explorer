type SearchBoxProps = {
  value: string
  onChange: (value: string) => void
}

function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label>
      Search by name{' '}
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. pikachu"
      />
    </label>
  )
}

export default SearchBox
