using DailyMutualFundNAV.Models;
using DailyMutualFundNAV.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyMutualFundNAV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MutualFundController : ControllerBase
    {
        public IMutualFundService<MutualFund> _mutualFundService;
        public MutualFundController(IMutualFundService<MutualFund> mutualFundService)
        {
            _mutualFundService = mutualFundService;
        }

        [HttpGet("get-all-mutualFunds")]
        public IActionResult GetAllMutualFunds()
        {
            var allMutualFunds = _mutualFundService.GetAllMutualFunds();
            return Ok(allMutualFunds);

        }

        [HttpGet("get-MutualFundDetails-by-Name/{mutualFundName}")]
        public IActionResult GetMutualFundByName(string mutualFundName)
        {
            try
            {
                if (string.IsNullOrEmpty(mutualFundName))
                {
                    return BadRequest("Name Cannot be null");
                }
                var mutualFundData = _mutualFundService.GetMutualFundByName(mutualFundName);
                if (mutualFundData == null)
                {
                    return NotFound("Invalid MutualFund Name");
                }
                else
                {
                    Console.Write(mutualFundData);
                    return Ok(mutualFundData);
                }
            }
            catch (Exception exception)
            {
                return new StatusCodeResult(500);
            }
        }
    }
}
