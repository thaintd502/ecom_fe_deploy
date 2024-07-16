import React from 'react';
import Modal from 'react-modal';

import ic_cart_empty from '../../../assets/images/ic_cart_empty.jpg';
import ic_cart_icon from '../../../assets/images/ic_cart_modal.png';
import ic_close_icon from '../../../assets/images/ic_close_modal.png';

import './index.css';
import './global.css';

const ModalCart = ({ isOpen, onClose }) => {

    const imgCartModal = {
        maxWidth: '25px',
        height: 'auto',
    };

    const imgCloseModal = {
        maxWidth: '15px',
        height: 'auto',
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
                Label="Giỏ hàng"
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '800px',  // Tăng gấp đôi
                    padding: '40px',    // Tăng gấp đôi
                },
            }}
        >
            <div className="modal-gi-hng-trng-hp-ch">
                <div className="modal-container">
                    <div className="cart-header">
                        <img src={ic_cart_icon} alt="Cart Icon" className="cart-header-icon" style={imgCartModal} />
                        {/* <b className="gi-hng">Giỏ hàng</b> */}
                    </div>
                    <div className="close-button" onClick={onClose}>
                        <img src={ic_close_icon} alt="Close Icon" className="close-icon" style={imgCloseModal}/>
                        <b>Đóng</b>
                    </div>
                </div>
                <div className="empty-cart-illustration">
                    <div>
                        <img className="cart-icon" alt="Empty Cart" src={ic_cart_empty} onClick={onClose} />
                    </div>
                </div>
                <div className="empty-cart-message">
                    <div className="cha-c-sn">Chưa có sản phẩm nào trong giỏ hàng của bạn</div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalCart;
