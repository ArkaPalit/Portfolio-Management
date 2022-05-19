using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AuthenticationAPI.Models;
using AuthenticationAPI.Service;
using Moq;
using NUnit.Framework;

namespace AutheticationAPITest
{
    [TestFixture]
    class UserServiceTest
    {
        private Mock<IUserService> mock;
        LoginCredentials loginCredentials;

        [SetUp]
        public void SetUp()
        {
            mock = new Mock<IUserService>();
            loginCredentials = new LoginCredentials("User", "User");
        }
        [Test]
        public void AuthenticateUser_Return_UserCredentials()
        {
            mock.Setup(x => x.AuthenticateUser(loginCredentials)).Returns(loginCredentials);
            LoginCredentials user = mock.Object.AuthenticateUser(loginCredentials);
            Assert.AreEqual(loginCredentials, user);
        }
    }
}
