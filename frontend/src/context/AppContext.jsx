import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppCotext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [userData, setUserData] = useState(false);
    const [cartData, setCartData] = useState(false);
    const [newOrder, setNewOrder] = useState(false);
    const [isSelectLogin, setIsSelectLogin] = useState(false);
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState(false);

    const getUserData = async () => {

        axios.defaults.withCredentials = true;
        
            try {
                const {data} = await axios.get(backendUrl + '/api/customer/data');
                if (data.success) {
                    setUserData(data.userData);
                    setIsLoggedin(true);
                } 

            } catch (error) {
                toast.error(error.message);
            }
    }

    const getSellerData = async () => {
        axios.defaults.withCredentials = true;
        try {
                const {data} = await axios.get(backendUrl + '/api/vendor/get');
                if (data.success) { 
                    setUserData(data.userData);
                    setIsLoggedin(true);
                    setIsSeller(true);
                }

            } catch (error) {
                toast.error(error.message);
        }
    }

    const getProducts = async () => {
          axios.defaults.withCredentials = true;
          try {
            const {data} = await axios.get(backendUrl + '/api/product/getProduct');
    
            if(data.success) {
              setProducts(data.products);
            }
    
          } catch (error) {
            toast.error(error.message);
          }
    };

    const getCartData = async () => {
        
        axios.defaults.withCredentials = true;
        try {
            
            const {data} = await axios.post(backendUrl + '/api/cart/get');
            
            if (data.success) { 
                setCartData(data.cart);
            }else{
                setCartData([]);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getTheCart = async () => {
        axios.defaults.withCredentials = true;
    
        try {
          const {data} = await axios.post(backendUrl + '/api/cart/get');
          if(data.success) {
            setItems(data.cart.items);
            console.log(data.cart.items);
          }
        } catch (error) {
          toast.error(error.message);
        }
    
      };

    const getOrder = async () => {
      try {
        const {data} = await axios.get(backendUrl + '/api/order/get');
        if(data.success) {
          setNewOrder(data.order);
          console.log(data.order);
        }
      } catch (error) {
        toast.success(error.message);
      }
    };

    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        isSelectLogin, setIsSelectLogin,
        getUserData, getSellerData,
        isSeller, setIsSeller,
        getCartData,
        cartData, setCartData,
        getTheCart,
        items, setItems,
        getOrder,
        newOrder, setNewOrder,
        products, setProducts,
        getProducts
    }

    return(
        <AppCotext.Provider value={value}>
            {props.children}
        </AppCotext.Provider>
    );

};