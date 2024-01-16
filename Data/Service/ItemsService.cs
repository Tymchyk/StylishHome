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
        public void AddItems()
        {
        ItemColorAndCount Value =new ItemColorAndCount{
        Item = new Items{ItemName = "Elegant Comfort", 
        ItemDescription = "Immerse yourself in an atmosphere of luxury and comfort with our Elegant Comfort sofa. It impresses with its stylish design and plushness. Perfect for evening conversations or cozy readings.", 
        ItemMaterial = "High-quality fabric.Frame: Wooden, sturdy, and reliable.",
        ItemSize = "210 cm x 90 cm x 75 cm.",
        ItemFrame = "Wooden, sturdy, and reliable.",
        imageName ="sofa.png",VerticalRotation = true, ItemType = "sofa"},
        SceneValues = new SceneValue{ItemScene = "sofachairs/sofa.glb", X = 0.04, Y = 0.04, Z = 0.04},
        ItemPrice= 1350.0,
        CountByColor = 3,
        Color = "blue"

        };
        _context.ItemColorAndCount.Add(Value);
        List<ItemColorAndCount> Values = new List<ItemColorAndCount>{
        new ItemColorAndCount{
        ItemsId = 1,
        SceneValues = new SceneValue{ItemScene = "sofachairs/sofa-brown.glb", X = 0.04, Y = 0.04, Z = 0.04},
        ItemPrice= 1200.0,
        CountByColor = 3,
        Color = "brown"},
        new ItemColorAndCount{
        ItemsId = 1,
        SceneValues = new SceneValue{ItemScene = "sofachairs/sofa-white.glb", X = 0.04, Y = 0.04, Z = 0.04},
        ItemPrice= 1110.0,
        CountByColor = 3,
        Color = "white"

        },
        new ItemColorAndCount{
        ItemsId = 1,
        SceneValues = new SceneValue{ItemScene = "sofachairs/sofa-black.glb", X = 0.04, Y = 0.04, Z = 0.04},
        ItemPrice= 1900.0,
        CountByColor = 3,
        Color = "black"}};

        foreach(var item in Values){
            _context.ItemColorAndCount.Add(item);
        }
           
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

        public List<ItemColorAndCount> GetItemById(int id)
        {
            return _context.ItemColorAndCount.Where(item => item.ItemsId == id).Include(item =>item.Item).Include(item =>item.SceneValues).ToList();
        }
    }
}