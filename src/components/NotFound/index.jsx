import React from 'react';
import style from './NotFound.module.scss';
import { HiOutlineEmojiSad } from 'react-icons/hi';

function NotFoundBlock() {
  return (
    <div className={style.main}>
      Not found
      <HiOutlineEmojiSad className={style.sad} />
    </div>
  );
}

export default NotFoundBlock;
