using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Data
{
    public interface ICardService
    {
        public void AddValueToCard(Order order);
        public List<Order> GetFromCard(CheckUser user);
        public void Confirm(CheckUser user);

        public void UpdateOrderItem(OrderForm order);
        public  IEnumerable<IGrouping<int, Order>> MyOrders(CheckUser user);
    }
}