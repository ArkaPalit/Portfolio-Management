using CalculateNetworth.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalculateNetworth.Models;

namespace CalculateNetworth.Service
{
    public class NetworthService:INetworthService
    {
        private readonly INetworthRepository _networthRepo;
        public INetworthService _networthService;
        public NetWorth networth = new NetWorth();
        MyAsset myPortfolio;

        public NetworthService(INetworthRepository networthRepo)
        {
            _networthRepo = networthRepo;
        }

        /// <summary>
        /// This method calculates the the networth of a user. All the assets, their current price and the number of units that a user holds will be fetched from the database using the portfolio id provided to calculte net worth amount
        /// </summary>
        /// <param name="portfolioId"></param>
        /// <returns>Net worth of a user</returns>

        public async Task<double> CalculateNetworth(int portfolioId)
        {
            myPortfolio = _networthRepo.GetPortfolioDetailsById(portfolioId);
            Asset allAssets = await _networthRepo.GetAllAssetDetails(); //returns all assets inclusive of the assets held by user

            var _stock = "";
            var _mutualFund = "";
            foreach (var stock in allAssets.stockDetails)
            {
                _stock = stock.StockName;
                var _stockValue = stock.StockValue;
                foreach (var portfolioStock in myPortfolio.myStocks.Where(x => x.StockName == _stock))
                {
                    networth.NetworthAmount += portfolioStock.StockCount * _stockValue;

                }

            }

            foreach (var mutualFund in allAssets.mutualFund)
            {
                _mutualFund = mutualFund.MutualFundName;
                var _mutualFundValue = mutualFund.MutualFundValue;
                foreach (var portfolioMF in myPortfolio.myMutualFunds.Where(x => x.MutualFundName == _mutualFund))
                {
                    networth.NetworthAmount += portfolioMF.MutualFundUnits * _mutualFundValue;

                }

            }
            networth.NetworthAmount = Math.Round(networth.NetworthAmount, 2);
            return networth.NetworthAmount;
            
        }

        /// <summary>
        /// Calls ViewStockHoldings() in repository layer to fetch all the stock details that a user holds
        /// </summary>
        /// <param name="id"></param>
        /// <returns>StockInfo object containing stock Id,name,stock count</returns>
        public async Task<List<StockInfo>> ViewStockHoldings(int id)
        {

            List<StockInfo> myStocks = await _networthRepo.ViewStockHoldings(id);
            return myStocks;

        }

        //Returns complete information about all stocks and mutual funds in the database
        public async Task<Asset> GetAssetDetails()
        {
            Asset allAssets = await _networthRepo.GetAllAssetDetails();
            return allAssets;
        }

        public async Task<List<MutualFundDetail>> ViewMutualFunds(int id)
        {

            List<MutualFundDetail> myFunds = await _networthRepo.ViewMutualFunds(id);
            return myFunds;

        }


    }
}
