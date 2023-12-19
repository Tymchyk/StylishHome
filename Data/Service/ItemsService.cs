using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Store.Data
{
    public class ItemsService : IItemsService
    {
        private readonly  ApplicationDbContext _context;
        public ItemsService(ApplicationDbContext context)
        {
            _context = context;
        }
        public void AddItems(Items item)
        {
            _context.Items.Add(item);
            _context.SaveChanges();
        }

        public List<Items> AllItems()
        {
            return _context.Items.ToList();

        }

         public List<Items> ItemsByType(string ItemType)
        {
            return _context.Items.Where(item => item.ItemType == ItemType).ToList();

        }

        public void DeleteItems()
        {
            throw new NotImplementedException();
        }

        public void UpdateItems()
        {
            throw new NotImplementedException();
        }

        public Items GetItemById(int id)
        {
            return _context.Items.Where(item => item.Id == id).Include(item => item.SceneValues).ToList()[0];
        }
    }
}