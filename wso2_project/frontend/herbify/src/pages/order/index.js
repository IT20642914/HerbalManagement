import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MasterAPI from "../../utill/Api";
import AddressInfo from './delivaryInfo';
import PaymentInfo from "./paymentInfo";
import { PRODUCT_LIST } from '../../utill/AppConstant';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details"];
const steps_label = ["Delivery details", "Payment details", "Review order"];

export default function Index() {
  const { oid } = useParams();
  const [order, setOrder] = useState({});
  const [payment, setPayment] = useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const classes = useStyles();

  useEffect(() => {
    // MasterAPI()
    //   .get(`/order/${oid}`)
    //   .then((res) => setOrder(res.data))
    //   .catch((err) => console.log(err));

    const orders = {
      "id" : 1,
      "order_status": "pendding",
      "user_id": "12",
      "products": PRODUCT_LIST.slice(0, 2),
      "buyer_name": "Sachini Wijeshinhe",
      "buyer_email": "sachini@gmail.com",
      "buyer_phone": "0740000000",
      "payment_value": oid,
      "payment_type": "card",
      "payment_status": "pendding",
      "delivery_type": "delivery",
      "delivery_address": "",
      "delivery_status": "",
    
    }
    setOrder(orders);
    //eslint-disable-next-line
  }, []);

  // go to payment
  const handleNext = () => {
    //   activeStep == 0 == saveOrderDetails and got to payment
    if (activeStep === 0) {
      // MasterAPI()
      //   .post(`/order/${oid}`, order)
      //   .then((res) => {
      //     swal("All changes were saved");
      //     setOrder(res.data);
      //     setActiveStep(activeStep + 1);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     if (err.response && err.response.data)
      //       swal(err.response.data.message);
      //   });
      swal("All changes were saved");
      setActiveStep(activeStep + 1);
    }
    //   activeStep == 1 == makePayment and place order
    else if (activeStep === 1) {
      // MasterAPI()
      //   .post(`/payment`, {
      //     ...payment,
      //     order_id: oid,
      //     transfer_amount: order.payment_value,
      //     payment_type: order.payment_type,
      //     hash_order_code: order.hash_order_code,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     if (res.data.status === 1) {
      //       swal("Payment was made successfully");
      //       setActiveStep(activeStep + 1);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     if (err.response && err.response.data && err.response.data)
      //       swal(err.response.data.message);
      //     else swal("Unexpected error");
      //   });
      swal("Payment was made successfully");
      setActiveStep(activeStep + 1);
    }
  };

  // go to details
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressInfo order={order} setOrder={setOrder} />;
      case 1:
        return (
          <PaymentInfo
            order={order}
            setOrder={setOrder}
            payment={payment}
            setPayment={setPayment}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {order.id ? (
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps_label.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #{oid}. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      ) : (
        <h3>Order not found</h3>
      )}
    </React.Fragment>
  );
}
