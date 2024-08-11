import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../components/CoinPage/LineChart";
import SelectDays from "../components/CoinPage/SelectDays";
import ToggleComponents from "../components/CoinPage/ToggleComponent";
import Button from "../components/Common/Button"; // Make sure this Button component exists and is styled appropriately
import Header from "../components/Common/Header";
import CommonHeader from "../components/Common/CommonHeader";
import Loader from "../components/Common/Loader";
import PriceHeader from "../components/Dashboard/PriceHeader";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { getPricesfor1day } from "../functions/getPrices";
import { settingChartData } from "../functions/settingChartData";
import { settingCoinObject } from "../functions/settingCoinObject";
import FullScreenDialog from "../components/Fullscreen";
import MyCompareButton from "../components/CoinPage/comparepage";
import { CgAdd } from "react-icons/cg";
import { CgArrowsExpandRight } from "react-icons/cg";

function Coin() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    setLoading(true);
    let coinData = await getCoinData(id, setError);
    settingCoinObject(coinData, setCoin);
    if (coinData) {
      const prices = await getPrices(id, days, priceType, setError);
      const volumes = await getPrices(id, days, "total_volumes", setError);
      console.log(volumes) ;
      if (prices) {
        settingChartData(setChartData, prices, [], volumes );
        setLoading(false);
      }
    }
  };

  const handleDaysChange = async (event) => {
    setLoading(true);
    setDays(event);
    if(event == 1 || event == 3) {
      const prices = await getPricesfor1day(id, 0,0, priceType, setError);
      const volumes = await getPricesfor1day(id, 1,1, "total_volumes", setError);
      if (prices) {
        settingChartData(setChartData, prices,[], volumes);
        setLoading(false);
      }
    }
    else {
      const prices = await getPrices(id, event, priceType, setError);
      const volumes = await getPrices(id, days, "total_volumes", setError);
      if (prices) {
        settingChartData(setChartData, prices,[], volumes);
        setLoading(false);
      }
    }
  };


  
  return (
    <>
      <Header />
      {!error && !loading && coin.id ? (
        <div className="grey-wrapper">
          <PriceHeader coin={coin} delay={0.5} />
          <CommonHeader />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0rem 1.5rem 3rem 0rem',
            top: 0,
            backgroundColor: 'var(--black)',
            zIndex: 1000
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}> 
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CgArrowsExpandRight style={{ fontSize: '20px', color: '#B2BEB5', marginRight: '0px' }} />
                <FullScreenDialog
                  open={open}
                  onClose={handleClose}
                  chartData={chartData}
                  onClick={handleClickOpen}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CgAdd style={{ fontSize: '24px', color: '#B2BEB5', marginRight: '0px' }} />
                <MyCompareButton />
              </div>
          </div>
          <div style={{ alignItems: 'center', fontWeight: 'bold'}}>
            <SelectDays handleDaysChange={handleDaysChange} days={days} />
          </div>
        </div>
          <LineChart chartData={chartData} />
        </div>
      ) : error ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Oops, Not Found..!!!
          </h1>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Coin;
