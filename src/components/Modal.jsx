import PropTypes from 'prop-types';
import { useContext, useState, useEffect,  useRef } from "react";
import { ProductContext } from "../context";
import { toast, Slide } from "react-toastify";

export default function Modal({showModal, setShowModal})
 {
   const {cart} = useContext(ProductContext);
   cart.sort((a, b) => b.id - a.id);

   const [totalQty, setTotalQty] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const productsCart = useRef(null);
 
   useEffect(() => 
      {
        const qty = cart.reduce((sum, item) => sum + item.qty, 0);
        const price = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        setTotalQty(qty);
        setTotalPrice(price);
        if (showModal && productsCart.current) 
          {
            productsCart.current.showModal();
          }
      }, [cart, showModal]);

  function hideModal (event)
      {
        event.preventDefault();
        if (productsCart.current) 
          {
            productsCart.current.close();
            setShowModal(false);
          }
      }
    
  function doneChackOut(event) {
        event.preventDefault();
      
        toast.success("CHECKOUT SUCCESSFUL", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        });
      
        // Use a timeout with the same duration as autoClose to close the modal after toast shows
        setTimeout(() => {
          if (productsCart.current) 
            {
              productsCart.current.close();
              setShowModal(false);
            }
          

          window.location.reload();
        }, 700);
      }
      

   return (
    <dialog ref={productsCart} className="modal modal-bottom sm:modal-middle sm:mb-[100px]">
      <div className="modal-box Roboto max-w-[652px] max-h[48px]">
        <h2 className="text-[22px] text-[#364A63] font-bold mb-4">Your Cart</h2>
    
        <div className="flex justify-between font-normal text-[#8091A7] text-[14px] border-b">
          
          <div className="flex text-start">Item</div>

          <div className="flex justify-between text-[#8091A7] font-normal text-[14px]">
            <div className="flex justify-evenly gap-3">
              <p className="flex w-[30px] text-center">Color</p>
              <p className="flex w-[30px] text-center">Size</p>
              <p className="flex w-[30px] text-center">Qty</p>
            </div>
            <div className="flex w-[80px] justify-end">Price</div>
          </div> 
        </div>
    
        <div className="space-y-4 mt-4">
          {/* Items */}
          {
            cart.map((item) => 
              {
                return(
                  <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div className="flex w-1/2 items-center justify-start">
                      <img src={item.image} alt="Black Watch" className="w-12 h-12 rounded mr-2"/>
                      <p className="text-[14px] font-normal text-[#364A63] sm:text-[12px]">{item.name}</p>
                    </div>
        
                    <div className="flex text-[#364A63] text-[14px]">
                      <div className="flex justify-evenly gap-3">
                        <p className="flex w-[30px] font-normal justify-center">{item.color}</p>
                        <p className="flex w-[30px] font-bold justify-center">{item.size}</p>
                        <p className="flex w-[30px] font-bold justify-center">{item.qty}</p>
                      </div>
                      <div className="flex w-[80px] font-bold text-[16px] justify-end">${item.price}</div>
                    </div>
                  </div>
                )
              })
          }


          {/* Total Section */}
          <div className="mt-4">
            <div className="flex justify-between font-bold text-[16px]">
              <span>Total</span>
              <div className="flex">
                <span className="totalQty flex w-[30px] text-[14px] justify-center">{totalQty}</span>
                <span className="flex w-[80px] text-[16px] justify-end"> 
                  <span>$</span>
                  <span>{totalPrice}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action Roboto text-[14px] font-bold">
          <form method="dialog flex ">
            <button
              onClick={(event) => hideModal(event)}
              className="px-6 py-2 text-[#364A63] border border-[#e2e5ee] rounded mr-[24px]"
            >
              Continue Shopping
            </button>

            <button 
              onClick={(event) => doneChackOut(event)} 
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Checkout
            </button>

          </form>
        </div>
      </div>
    </dialog>
   );
 };
Modal.propTypes = 
{
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func.isRequired
};