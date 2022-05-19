using NUnit.Framework;
using Moq;
using Castle.Core.Configuration;
using DailyMutualFundNAV.Models;
using DailyMutualFundNAV.Repository;
using DailyMutualFundNAV.Services;
using DailyMutualFundNAV.Controllers;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace MutualFundNAVTest
{
    public class Tests
    {
        List<MutualFund> mutualFunds = new List<MutualFund>();
        readonly MutualFundController mutualfundController;
        readonly MutualFundService mutualfundService;
        private readonly Mock<IMutualFundService <MutualFund>> mockProvider = new Mock<IMutualFundService<MutualFund>>();
        private readonly Mock<IMutualFundRepository<MutualFund>> mockRepository = new Mock<IMutualFundRepository<MutualFund>>();
        public Tests()
        {
            mutualfundController = new MutualFundController(mockProvider.Object);
            mutualfundService = new MutualFundService(mockRepository.Object);
        }

        [SetUp]
        public void Setup()
        {
            mutualFunds = new List<MutualFund>()
            {
                new MutualFund{ MutualFundId=45,MutualFundName="Dummy1",MutualFundValue=145.23},
                new MutualFund{ MutualFundId=65,MutualFundName="Dummy2",MutualFundValue=145.23}
            };
            mockProvider.Setup(x => x.GetMutualFundByName(It.IsAny<string>())).Returns((string s) => mutualFunds.FirstOrDefault(
                x => x.MutualFundName.Equals(s)));

            mockRepository.Setup(x => x.GetMutualFundByName(It.IsAny<string>())).Returns((string s) => mutualFunds.FirstOrDefault(
                x => x.MutualFundName.Equals(s)));
        }

        [Test]
        public void GetMutualFundDetailsByNameController_PassCase()
        {
            var fund = mutualfundController.GetMutualFundByName("Dummy1");
            ObjectResult result = fund as ObjectResult;
            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public void GetMutualFundDetailsByNameController_FailCase()
        {
            var fund = mutualfundController.GetMutualFundByName("ABC");
            ObjectResult result = fund as ObjectResult;
            Assert.AreEqual(404, result.StatusCode);
        }

        [Test]
        public void GetMutualFundByNameProvider_PassCase()
        {
            var fund = mutualfundService.GetMutualFundByName("Dummy1");
            Assert.IsNotNull(fund);
        }
        [Test]
        public void GetMutualFundByNameProvider_FailCase()
        {
            var fund = mutualfundService.GetMutualFundByName("ABC");
            Assert.IsNull(fund);
        }

        [Test]
        public void GetAllMutualFund()
        {
            var fund = mutualfundController.GetAllMutualFunds();
            Assert.IsNotNull(fund);
        }
    }
}