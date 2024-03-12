import './index.css'

const SalaryRangeItem = props => {
  const {salaryItemDetails, onFilterSalary} = props
  const {label, salaryRangeId} = salaryItemDetails
  const filterSalary = event => onFilterSalary(event.target.value)
  return (
    <li className="filter-item">
      <input
        id={salaryRangeId}
        type="radio"
        name="salar rage"
        value={salaryRangeId}
        onClick={filterSalary}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRangeItem
