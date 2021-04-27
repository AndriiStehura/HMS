using System;
using System.Collections.Generic;
using System.Text;
using NUnit;
using NUnit.Framework;
using HMS.Data.Models;
using HMS.Api.Repositories;
using HMS.Data.Context;
using System.Linq;

namespace HMS.Test.RepositoryTests
{
    [TestFixture]
    class GenericRepositoryTest
    {
        private HmsUnitOfWork _unit;

        public GenericRepositoryTest()
        {
            _unit = new HmsUnitOfWork(new HouseManagementContext());
        }

        [Test]
        [Ignore("Ef test")]
        public void AddAddress()
        {
            Address a = new Address()
            {
                AddressId = _unit.AddressesRepository.Get().Count() + 1,
                City = "Львів",
                Street = "Бандери",
                BuildingNumber = "3"
            };
            int prevCount = _unit.AddressesRepository.Get().Count();
            _unit.AddressesRepository.Add(a);
            _unit.AddressesRepository.Save();
            int newCount = _unit.AddressesRepository.Get().Count();
            Assert.AreEqual(prevCount + 1, newCount);
        }

    }
}
