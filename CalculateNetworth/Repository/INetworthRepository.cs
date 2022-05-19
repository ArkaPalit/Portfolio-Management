using CalculateNetworth.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalculateNetworth.Services
{
    public interface INetworthRepository
    {
        public MyAsset GetPortfolioDetailsById(int id);

        //public Task<List<StockDetail>> GetAssetDetails();
        //public Task<Asset> GetAssetDetails();

        public Task<Asset> GetAllAssetDetails();

        //public AssetSaleResponse SellAssets(List<PortfolioDetail> assetDetails);

        public Task<List<StockInfo>> ViewStockHoldings(int id);

        public Task<List<MutualFundDetail>> ViewMutualFunds(int id);

    }
}
