import PropTypes from 'prop-types';
import { useState, useContext } from "react";
import { ProductContext } from "../context";
import { getImgUrl } from "../utils/ImgUrl";
import { toast, Slide } from "react-toastify";

export default function ProductsDetails({onChangeImg}) 
  {
    const { cart, setCart } = useContext(ProductContext);

    const colors = 
      [
        { name: "purple", hex: "#816BFF" },
        { name: "cyan", hex: "#1FCEC9" },
        { name: "blue", hex: "#4B97D3" },
        { name: "black", hex: "#3B4747" },
      ];
    const sizes = 
      [
        { size: "S", price: 69 },
        { size: "M", price: 79 },
        { size: "L", price: 89 },
        { size: "XL", price: 99 },
      ];

    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedSizeAndPrice, setSelectedSizeAndPrice] = useState(null);
    const [quantity, setQuantity] = useState(0);

    const handleColorChange = (colorName, colorHex) => 
      {
        setSelectedColor({ name: colorName, hex: colorHex });
        const ImgUrl = getImgUrl(colorName);
        onChangeImg(ImgUrl);
      };

    const handleSizeAndPrice = (size, price) => 
      {
        setSelectedSizeAndPrice({ size, price });
      };

    const handleQuantityChange = (action) => 
      {
        setQuantity((prev) => (action === "Increment" ? prev + 1 : Math.max(prev - 1, 1)));
      };

    const addToCart = () => 
      {
        if (!selectedSizeAndPrice) 
          {
            toast.error("Please Select A Size",
                {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "colored", 
                  transition: Slide,
                });
            return;
          } 
        else if (quantity < 1) 
          {
            toast.error("Minimum order is 1 product",
              {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored", 
                transition: Slide,
              });
            return;
          } 
        else 
          {
            const newItem = 
              {
                id: cart.length + 1,
                name: "Classy Modern Smart Watch",
                color: selectedColor.name,
                size: selectedSizeAndPrice.size,
                price: selectedSizeAndPrice.price,
                qty:quantity,
                image: `/image/${selectedColor.name.toLowerCase()}.png`,
              };

            setCart([...cart, newItem]);
            console.log({...cart});


            setSelectedSizeAndPrice(null);
            setQuantity(0);

            toast.success("Products Added",
              {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored", 
                transition: Slide,
              });
          }
      };

    return (
      <div className="flex w-full md:w-1/2 py-4 items-center">
        <div>
          <h1 className="Roboto text-[#364A63] text-[25px] md:text-[40px] font-bold mb-1">Classy Modern Smart Watch</h1>
          {/* Star Rating */}
          <div className="flex items-center mb-5">
            <span className="text-yellow-400 text-lg">★★★★☆</span>
            <span className="text-gray-600 ml-2 text-sm">(2 Reviews)</span>
          </div>

          {/* Price Section */}
          <div className="mb-4">
            <span className="text-gray-500 line-through text-sm">$99.00</span>
            <span className="text-[#6576FF] font-bold text-xl ml-2">$79.00</span>
          </div>

          {/* Product Description */}
          <p className="text-[#8091A7] text-[18px] font-normal mb-4">
            I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born, and I will give you a complete account of the system.
          </p>

          {/* Product Type and Model */}
          <div className="mb-3">
            <span className="font-normal text-[#8091A7] text-[18px] mr-11 mb-2">Type:</span> <span className="font-normal text-[#8091A7] text-[18px]">Model Number</span><br/>
            <span className="font-bold text-[#364A63] text-[16px] mr-11">Wacth</span> <span className="font-bold text-[#364A63] text-[16px]">Forerunner 290XT</span>
          </div>
          {/* Color Selector */}
          <div className="flex items-center h-[50px] w-full mb-3">
            <span className="font-bold text-[#364A63] text-[18px] mr-2">Band Color:</span>
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorChange(color.name, color.hex)}
                className={`group flex justify-center items-center p-[2px] rounded-full mr-2 w-8 h-8 border duration-100
                  ${selectedColor.name === color.name && "border-2"} 
                  ${selectedColor.name !== color.name && `hover:border-[${color.hex}] hover:text-[${color.hex}]`}
                `}        
                style={{borderColor: selectedColor.name === color.name ? color.hex : "transparent",}}
              >
                <span
                  className={`h-6 w-6 rounded-full inline-block`}
                  style={{ backgroundColor: color.hex }}
                ></span>
              </button>
            ))}
          </div>

          {/* Size Selector */}
          <div className="mb-5">
            <span className="font-bold text-[#364A63] text-[18px]">Wrist Size:</span>
            <div className="flex items-center mt-2">
              {sizes.map((size) => (
                <button
                  key={size.size}
                  onClick={() => handleSizeAndPrice(size.size, size.price)}
                  className=
                    {`sizeBtn w-[75px] border border-gray-300 px-3 py-1 text-gray-600 rounded hover:text-blue-500 hover:border-blue-500 hover:font-bold mr-2 duration-200 
                      ${
                        selectedSizeAndPrice?.size === size.size
                        ? "font-bold !border-blue-500 !text-blue-500"
                        : ""
                      }`
                    }
                >
                  {size.size}
                  <span className="text-gray-600 ml-[3px]">${size.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-32">
              <button
                onClick={() => handleQuantityChange("Decrement")}
                className="w-1/3 h-10 text-gray-500 hover:bg-gray-200 flex justify-center items-center duration-300"
              >
                <span className="text-2xl font-semibold">−</span>
              </button>

              <div className="Counter w-1/3 h-10 flex justify-center items-center text-[14px] text-[#364A63] font-semibold">
                {quantity}
              </div>

              <button
                onClick={() => handleQuantityChange("Increment")}
                className="w-1/3 h-10 text-gray-500 hover:bg-gray-200 flex justify-center items-center duration-300"
              >
                <span className="text-2xl font-semibold">+</span>
              </button>
            </div>

            <button
              onClick={addToCart}
              className="bg-[#6576FF] text-[#FFFFFF] px-[18px] py-[8px] rounded hover:bg-blue-600 duration-500"
            >
              Add to Cart
            </button>
            <img src={getImgUrl('love')} alt="Love" />
          </div>
        </div>
      </div>
    );
  }
ProductsDetails.propTypes = 
{
  onChangeImg: PropTypes.func.isRequired
};