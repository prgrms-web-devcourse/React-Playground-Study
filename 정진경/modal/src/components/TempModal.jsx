import React from 'react'
import { createPortal } from 'react-dom'
import './modal.css'

const TempModal = ({ isOpened, children, onClose }) => {
  if (!isOpened) {
    return null
  }

  return createPortal(
    <div>
      <div className='overlay'></div> {/* 불투명한 배경 부분이다. */}
      <div className='modal'>
        <div>
          <span className='close-button' onClick={onClose}>
            X
          </span>
          <div className='modal-content'>{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById('modal') //포탈이 있어야 할 DOM node
  )
}

export default TempModal
