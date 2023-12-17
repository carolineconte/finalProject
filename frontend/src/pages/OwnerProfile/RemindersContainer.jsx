/* eslint-disable react/prop-types */
import { GiCheckMark } from "react-icons/gi";

export const RemindersContainer = ({ styles, newReminder, setNewReminder, handleProfileUpdates, reminders, handleDeleteReminder }) => {
  return (
    <>
      <h2>Your Reminders:</h2>
      <form>
        <input type="text" placeholder="Add a new reminder"
          value={newReminder} onChange={(e) => setNewReminder(e.target.value)} />
        <button onClick={handleProfileUpdates}>Add</button>
      </form>
      <div className={styles.stickyNotesListContainer}>
        {reminders && (
          reminders.map((reminder, i) => (
            <div className={styles.stickyNotesList} key={i}>
              <p>{reminder}</p>
              <button onClick={(e) => handleDeleteReminder(e, reminder)}><GiCheckMark />
              </button>
            </div>
          )))
        }
      </div>
    </>
  )
}
