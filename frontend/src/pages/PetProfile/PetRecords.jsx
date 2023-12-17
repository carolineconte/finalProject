/* eslint-disable react/prop-types */

export const PetRecords = ({ styles, NameClass, props }) => {
  return (
    <>
      {/* <div className={styles[NameClass]}> */}
        <p>Ident: {props.name}</p>
        <p>date: {props.date}</p>
       
      {/* </div> */}
    </>
  )
}
