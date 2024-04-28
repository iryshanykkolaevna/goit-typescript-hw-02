import React, { FC } from 'react';
import css from './LoadMoreBtn.module.css'

interface LoadMoreBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ children, onClick, disabled }) => {
  return (
      <button className={css.loadMoreBtn} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default LoadMoreBtn