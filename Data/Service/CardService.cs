using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Store.Data.Service
{
    public class CardService : ICardService
    {
        private readonly  ApplicationDbContext _context;
        public CardService(ApplicationDbContext context)
        {
            _context = context;
        }
        public void AddValueToCard(Order order)
        {
            _context.Order.Add(order);
            _context.SaveChanges();
        }

        public List<Order> GetFromCard(CheckUser user)
        {
            return _context.Order.Where(item => item.UserName == user.UserName && item.UserEmail == user.UserEmail && item.OrderStatus == null)
                                .Include(item => item.Item)
                                .Include(item => item.ItemColorAndCount)
                                .ToList();
        }
        public  IEnumerable<IGrouping<int, Order>> MyOrders(CheckUser user)
        { return  _context.Order.Where(item => item.UserName == user.UserName && item.UserEmail == user.UserEmail && item.OrderStatus != null )
                                .Include(item => item.Item)
                                .Include(item => item.ItemColorAndCount)
                                .GroupBy(order => order.OrderNumber).ToList();
        }
        public void Confirm(CheckUser user)
        {
            int number = 0;
            var lastItem = _context.Order.Where(item => item.OrderStatus != null)  
                                        .OrderByDescending(item => item.YourDateField)
                                        .FirstOrDefault();
            if(lastItem == null){
                number++;
            }
            else{
                number = lastItem.OrderNumber + 1;
            }

            var orderItems = _context.Order.Where(item => item.UserName == user.UserName && item.UserEmail == user.UserEmail && item.OrderStatus == null)
                                            .Include(item => item.Item)
                                            .Include(item => item.ItemColorAndCount)
                                            .ToList();

            foreach( var item in orderItems)
            {
                item.OrderStatus = "confirmed";
                item.OrderNumber = number;
                item.ItemColorAndCount.CountByColor -= item.UserCount; 


                _context.Update(item);
            }
            _context.SaveChanges();

        }

        public void UpdateOrderItem(OrderForm order)
        {
            var item = _context.Order.FirstOrDefault(item=> item.UserName == order.UserName && item.ItemsId == order.ItemId && item.UserEmail == order.UserEmail && item.OrderStatus == null);
            if (item != null){
                if (order.TaskUpdate == "increment"){
                    item.UserCount++;
                }
                else{
                    item.UserCount--;
                }
                if(item.UserCount <= 0){
                    _context.Order.Remove(item);
                }
                else{
                     _context.Update(item);
                }
                _context.SaveChanges();
    
            }
        }
    }
}