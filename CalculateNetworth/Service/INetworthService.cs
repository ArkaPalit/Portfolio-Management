using CalculateNetworth.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalculateNetworth.Service
{
    public interface INetworthService
    {
        

        public Task<Asset> GetAssetDetails();

        public Task<double> CalculateNetworth(int id);

        
        //public AssetSaleResponse SellAssets(List<PortfolioDetail> listOfCurrentHoldingsAndAssetsToSell);

        //public StockInfo ViewHoldings(int id);
        public Task<List<StockInfo>> ViewStockHoldings(int id);

        public Task<List<MutualFundDetail>> ViewMutualFunds(int id);

    }
}
