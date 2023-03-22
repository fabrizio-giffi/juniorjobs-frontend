import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const checkout_URL = import.meta.env.VITE_CHECKOUT_URL;
const mollie = Mollie("pfl_goG4wAuujE", { locale: "nl_NL", testmode: true });

function Pay() {
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");

  const handlePayment = async (event) => {
    event.preventDefault();
    const payment = { value, currency, description };
    try {
      const response = await axios.post(checkout_URL, payment);
      console.log("RESPONSE", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box component="form" onSubmit={(event) => handlePayment(event)}>
          <TextField
            sx={{ mb: 2, bgcolor: "#fbfbfb" }}
            fullWidth
            id="value"
            label="Value"
            variant="outlined"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <TextField
            sx={{ mb: 2, bgcolor: "#fbfbfb" }}
            fullWidth
            id="currency"
            label="Currency"
            variant="outlined"
            type="text"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          />
          <TextField
            sx={{ mb: 2, bgcolor: "#fbfbfb" }}
            fullWidth
            id="description"
            label="Description"
            variant="outlined"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button type="submit">Pay</Button>
        </Box>
      </Container>
    </>
  );
}

export default Pay;
