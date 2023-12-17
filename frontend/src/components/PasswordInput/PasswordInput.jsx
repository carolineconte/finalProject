/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styles from './PasswordInput.module.css'

export const PasswordInput = ({ label, value, onChange }) => {
  const [passwordType, setPasswordType] = useState('password');

  const togglePasswordType = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={styles.passwordInputContainer}>
      <label className="contorno">{label}</label>
      <div className={styles.passwordChangesContainer}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.passwordInput}
          type={passwordType}
        />
        <button className={styles.passwordTypeButton} onClick={togglePasswordType}>
          {passwordType === 'password' ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>
    </div>
  );
};

