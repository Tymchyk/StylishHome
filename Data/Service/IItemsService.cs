using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Data
{
    public interface IItemsService
    {
        public List<Items>AllItems();
        public List<Items> ItemsByType(string ItemType);

        public Items GetItemById(int id);

        public void AddItems(Items item);
        public void UpdateItems();
        public void DeleteItems();
    }
}