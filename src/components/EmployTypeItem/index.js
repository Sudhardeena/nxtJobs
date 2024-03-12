import './index.css'

const EmployTypeItem = props => {
  const {employItemDetails, onFilteremployment} = props
  const {label, employmentTypeId} = employItemDetails
  const filterEmployment = event => onFilteremployment(event.target.value)
  return (
    <li className="filter-item">
      <input
        id={employmentTypeId}
        type="checkbox"
        name={employmentTypeId}
        value={employmentTypeId}
        onClick={filterEmployment}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmployTypeItem
