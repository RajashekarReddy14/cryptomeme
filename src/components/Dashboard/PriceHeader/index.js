import React, { useState } from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { motion } from "framer-motion";

function PriceHeader({ coin, delay }) {
  return (
      <motion.div
        className={`pricegrid ${coin.price_change_percentage_24h < 0 && "pricegrid-red"}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
      <div className="price-container">
        <div className="price-head">
            {coin.current_price.toLocaleString()}
        </div>
        <div className="usd-head">
            USD
        </div>
       </div>
        {coin.price_change_percentage_24h >= 0 ? (
          <div style={{ display: 'flex', gap: '5px' }}>
            <div className="current-price">
              + {coin.price_change_24h_in_currency.toFixed(2)} 
            </div>
            <div className="current-price">
              ({coin.price_change_percentage_24h.toFixed(2)}%)
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '5px' }}>
          <div className="current-price-red">
              {coin.price_change_24h_in_currency.toFixed(2)}
            </div>
            <div className="current-price-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        )}
        
      </motion.div>
  );
}

export default PriceHeader;
