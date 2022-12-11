import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import newsletter from "util/newsletter";

function Newsletter(props) {
  const [subscribed, setSubscribed] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ email }) => {
    setSubscribed(true);
    // Parent component can optionally
    // find out when subscribed.
    props.onSubscribed && props.onSubscribed();
    // Subscribe them
    newsletter.subscribe({ email });
  };

  return (
    <>
      {subscribed === false && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={true}>
              <TextField
                type="email"
                label="Email"
                name="email"
                error={errors.email ? true : false}
                helperText={errors.email && errors.email.message}
                fullWidth={true}
                inputRef={register({
                  required: "Please enter an email address",
                })}
              />
            </Grid>

            <Grid
              item={true}
              xs="auto"
              sx={{ display: "flex", alignItems: "stretch" }}
            >
              <Button
                variant="contained"
                color={props.buttonColor}
                size="large"
                type="submit"
              >
                {props.buttonText}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {subscribed === true && <div>{props.subscribedMessage}</div>}
    </>
  );
}

export default Newsletter;
