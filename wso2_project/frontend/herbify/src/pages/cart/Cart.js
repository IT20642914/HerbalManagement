import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MasterAPI from "../../utill/Api";
import {cart_data_success} from '../../redux';
import store from "../../redux/store";
import {PRODUCT_LIST} from '../../utill/AppConstant';

const useStyles = makeStyles((theme) => ({
    main: {
      display: "flex",
      flexDirection: "column",
      gridGap: theme.spacing(4),
    },
    root: {
      display: "flex",
      justifyContent: "space-between",
      width: "60%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
    },
    cover: {
      width: 150,
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }));

  function Index({ fetch_cart_data_success }) {
    const [cart, setCart] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate();
    const cart_state = store.getState();
    const [amount, setAmount] = useState(0);
    
  
    useEffect(() => {
      console.log("inital load");
      // MasterAPI()
      //   .get("/cart")
      //   .then((res) => setCart(res.data))
      //   .catch((err) => console.log(err));
      var currentList = PRODUCT_LIST.slice(0,2);
      var temp = [];
      currentList.map((item)=>{
        item["quantity"] = 1;
        temp.push(item);
      });
      console.log("cart list "+JSON.stringify(temp));
      setCart(temp);
    }, []);
  
    useEffect(()=>{
      console.log("inital lists");
      var amounts = 0;
      cart.map((item)=>{
        amounts += parseInt(item.price);
      });
      console.log("update amount "+amounts);
      setAmount(amounts);

    },[cart]);

    const updateCart = () => {
      console.log(cart);
      var updateList = cart;
      setCart([]);
      setCart(updateList);
      // MasterAPI()
      //   .post("/cart", cart)
      //   .then((res) => {
      //     swal(res.data.message);
      //     setCart({ ...cart, payment_value: res.data.cart.payment_value });
      //     fetch_cart_data_success(res.data.cart);
      //   })
      //   .catch((err) => console.log(err));
    };
  
    const checkOut = () => {
      // MasterAPI()
      //   .post("/order", { products: cart.products })
      //   .then((res) => navigate(`/order/${res.data._id}`))
      //   .catch((err) => console.log(err));
        navigate(`/order/${amount}`);
       // navigate(`/order/`)
    };
  
    const updateQty = (index, type) => {
      var newCart = cart;
      console.log("update cart info "+index+" "+JSON.stringify(newCart[index]));
      if (type === "-")
        newCart[index].quantity = newCart[index].quantity - 1;
      else
        newCart[index].quantity = newCart[index].quantity + 1;
      if (newCart[index].quantity < 1) {
        newCart[index].quantity = 1;
        swal("Minimum product quantity must be 1");
      }
      console.log("update cart  "+JSON.stringify(newCart));
      setCart(newCart);
      //cart_data_success(cart);
      swal("Successfully update cart");
    };
  
    const deleteProduct = (index) => {
      var newCartProducts = cart;
      newCartProducts.splice(index, 1);
      console.log("remove after list "+JSON.stringify(newCartProducts));
      //setCart({ ...cart, newCartProducts });
      setCart(newCartProducts);
      swal("Successfully remove item from cart");
      //cart_data_success(cart);
    };
  
    return (
      <>
        <h1>Shopping cart</h1>
        <p>
          {/* {cart.products ? cart.products.length : 0} items added to shopping cart */}
          {cart ? cart.length : 0} items added to shopping cart
        </p>
        <div className={classes.main}>
          {cart.length > 0 ?
            cart.map((product, index) => (
              <Card key={index} elevation={4} className={classes.root}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Link component="h6" variant="h6" to={`/${product.id}`}>
                      {product.name}
                    </Link>
                    <Typography variant="subtitle1" color="textSecondary">
                      Rs {product.price}
                    </Typography>
                    <Button
                      aria-label="delete"
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteProduct(index)}
                    >
                      Delete <DeleteForeverIcon color="secondary" />
                    </Button>
                  </CardContent>
                  <div className={classes.controls}>
                    <IconButton
                      aria-label="-"
                      onClick={() => updateQty(index, "-")}
                    >
                      <IndeterminateCheckBoxIcon color="secondary" />
                    </IconButton>
                    <IconButton aria-label={product.quantity} size="small">
                      {product.quantity}
                    </IconButton>
                    <IconButton
                      aria-label="+"
                      onClick={() => updateQty(index, "+")}
                    >
                      <AddBoxIcon color="primary" />
                    </IconButton>
                  </div>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={product.image}
                  title={product.name}
                />
              </Card>
            ))
            : "No Item on Cart"
            }
          {cart && (
            <>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={updateCart}
              >
                Update cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={checkOut}
              >
                Checkout ( Rs {amount})
              </Button>
            </>
          )}
        </div>
      </>
    );
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      cart_data_success: (data) => dispatch(cart_data_success(data)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(Index);
