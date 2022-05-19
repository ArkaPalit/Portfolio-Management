﻿using CalculateNetworth.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using CalculateNetworth.Services;
using CalculateNetworth.Service;

namespace CalculateNetworth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetworthController : ControllerBase
    {

        public INetworthService _networthService;


        public NetworthController(INetworthService networthService)
        {
            _networthService = networthService;
        }


        /// <summary>
        /// Returns the calculated networth of user based on its Portfolio Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("CalculateNetworth/{id}")]
        public async Task<ActionResult<double>> CalculateNetworth(int id)
        {
            double networth = await _networthService.CalculateNetworth(id);

            return Ok(networth);

        }

        /// <summary>
        /// Returns all the stock holdings of the user based on user id provided
        /// </summary>
        /// <param name="id"></param>
        /// <returns>StockInfo object containing stock id, name and the number of shares that a user holds</returns>

        [HttpGet("ViewStockHoldings")]
        public async Task<ActionResult<List<StockInfo>>> ViewStockHoldings(int id)
        {

            List<StockInfo> myStocks = await _networthService.ViewStockHoldings(id);
            return Ok(myStocks);

        }


        /// <summary>
        /// Returns all the mutual funds in the portfolio of the user
        /// </summary>
        /// <param name="id"></param>
        /// <returns>MutualFundDetail object containing stock id, name and the number of shares that a user holds</returns>
        [HttpGet("ViewMutualFunds")]
        public async Task<ActionResult<List<MutualFundDetail>>> ViewMutualFunds(int id)
        {

            List<MutualFundDetail> myFunds = await _networthService.ViewMutualFunds(id);
            return Ok(myFunds);

        }

        [HttpPost("SellAssets")]
        public async Task<ActionResult<List<StockInfo>>> SellAssets(int portfolioId)
        {

            List<StockInfo> myStocks = await _networthService.ViewStockHoldings(portfolioId);
            return Ok(myStocks);

        }





    }




}

