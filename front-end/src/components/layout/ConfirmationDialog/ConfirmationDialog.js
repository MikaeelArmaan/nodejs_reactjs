import React from 'react';
import styles from './ConfirmationDialog.module.scss';
import { Dialog } from '@mui/material';

function ConfirmationDialog({ open, onConfirm, onClose, cancelText, confirmText, cancelBackgroundColor, confirmBackgroundColor, message }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ root: styles['dialog'] }}
        >
            <div className={styles['dialog-container']}>
                <p>Confirmation</p>
                <p>{message}</p>
                <div className={styles.action}>
                    <button onClick={onClose} className={`${cancelBackgroundColor ? styles[cancelBackgroundColor] : ''}`}>{cancelText}</button>
                    <button onClick={onConfirm} className={`${confirmBackgroundColor ? styles[confirmBackgroundColor] : ''}`}>{confirmText}</button>
                </div>
            </div>
        </Dialog>
    )
}

export default ConfirmationDialog;