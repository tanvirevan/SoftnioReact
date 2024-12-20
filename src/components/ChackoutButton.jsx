import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context";

export default function CheckoutButton({onOpenModal}) 
  {
    const { cart } = useContext(ProductContext);
    const [show, setShow] = useState(false);

    useEffect(() => 
      {
        setShow(cart.length > 0);
      }, [cart.length]);

    function handleModal()
      {
        onOpenModal(true);
      }
    return (
      show 
      && 
      (
        <button
          onClick={() => handleModal()}
          className="Roboto w-[120px] h-[40px] fixed bottom-5 right-[33%] md:right-[45%] lg:right-[46.5vw] bg-[#FFBB5A] text-[#364A63] rounded-full shadow-lg font-bold text-[14px] hover:text-[16px] duration-300 cursor-pointer"
        >
          Checkout
          <span className="totalItem ml-[5px] bg-[#FFFFFF] px-[6px] py-[2px] rounded-md text-[12px]">
            {cart.length}
          </span>
        </button>
      )
    );
  }
CheckoutButton.propTypes = 
  {
    onOpenModal: PropTypes.func.isRequired
  };