import { useState } from 'react'
import './App.css'
import { ProductContext } from './context'
import ChackoutButton from './components/ChackoutButton'
import Modal from './components/Modal'
import ProductsDetais from './components/ProductsDetais'
import { getImgUrl } from './utils/ImgUrl'
import { ToastContainer } from 'react-toastify';


function App() 
  {
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productImg, setproductsImg] = useState([getImgUrl('purple')]);

    function openModal (value)
      {
        setShowModal(value);
      }

    return (
      <ProductContext.Provider value={{cart, setCart}}>
        <ToastContainer />
        <>
          <div className="flex justify-center mt-[40px] md:mt-[120px] min-h-screen">
            <div className="Roboto lg:flex md:flex md:max-h-[700px] p-4 max-h-[720px] max-w-[1320px] w-full gap-[60px]">
              {/*Stat Products Image  */}
                <div className="w-full md:w-1/2  flex justify-center items-center shadow-md">
                  <img src={productImg} alt="Product Image" className="product-image h-full w-full rounded"/>
                </div>
              {/* End Products Image  */}

              {/* Start Products Details  */}
                <ProductsDetais onChangeImg = {setproductsImg}/>
              {/* End Products Details  */}
            </div>
          </div>

          {/* Strat Chackout Button  */}
              <ChackoutButton onOpenModal= {(value) => openModal(value)}/>
          {/* End Chackout Button  */}


          {/* Start Modal    */}
              <Modal showModal = {showModal} setShowModal = {setShowModal} />
          {/* End Modal   */}
        </>
      </ProductContext.Provider>
    )
  }

export default App
