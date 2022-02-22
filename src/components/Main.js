import React, { useState, useEffect } from "react";
import axios from "axios";
import millify from "millify";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Main = () => {
  const [cryptos, setCryptos] = useState([]);
  var options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      limit: "50",
      offset: "0",
      orderBy: "24hVolume",
      orderDirection: "desc",
    },
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "f14362c2f9msh256b7ee1078a2eap1c6fcejsn569f7774bf22",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data.coins);
        setCryptos(response.data.data.coins);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Paper
        sx={{
          p: 8,
          margin: "auto",
          maxWidth: "100%",
          flexGrow: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        {cryptos.map((currency) => (
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={{ paddingBottom: "25px" }}
            key={currency.uuid}
          >
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 158 }}>
                <Img alt="complex" src={currency.iconUrl} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                  {currency.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                  Market Cap: {millify(currency.marketCap)}
                  </Typography>
                  
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                Price: {millify(currency.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Daily Change: {currency.change}%
                  </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Paper>
      </>
  );
  }

export default Main;
