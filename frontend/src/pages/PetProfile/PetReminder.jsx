/* eslint-disable react/prop-types */

export const PetReminder = ({ styles, NameClass, props }) => {
  return (
    <div className={styles[NameClass]} key={props.id}>
      <p>{props.name}: {props.nextDate}</p>
      <button>Done</button>
    </div>
  )
}
