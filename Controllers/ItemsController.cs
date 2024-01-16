using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Store.Data;
namespace Store.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemsController : ControllerBase
{
    public List<ItemColorAndCount> Values = new List<ItemColorAndCount>{
        new ItemColorAndCount{
        Item = new Items{ItemName = "Elegant Comfort", 
        ItemDescription = "Description: Immerse yourself in an atmosphere of luxury and comfort with our Elegant Comfort sofa. It impresses with its stylish design and plushness. Perfect for evening conversations or cozy readings.Parameters:Dimensions: 210 cm x 90 cm x 75 cm Upholstery Material: High-quality fabric.Frame: Wooden, sturdy, and reliable.Color: Beige", 
        imageName ="sofa.png",VerticalRotation = true, ItemType = "sofa"},
        SceneValues = new SceneValue{ItemScene = "sofachairs/sofa.glb", X = 0.04, Y = 0.04, Z = 0.04},
        ItemPrice= 1350.0,
        CountByColor = 3,
        Color = "standart"

        },
        //new Items{ItemName = "Dreamy Getaway", 
        //ItemDescription = "Description: Your perfect companion for relaxation and sleep. The Dreamy Getaway sleeper sofa easily transforms from an elegant sofa into a comfortable bed. The perfect blend of style and functionality.", 
        //ItemCount = 5, ItemDiscount = 30, ItemPrice= 550.0, imageName ="armchair.png",VerticalRotation = true, ItemType = "sofa",SceneValues = new SceneValue{ItemScene = "sofachairs/armchair.glb", X = 1, Y = 1, Z = 1}},
        //new Items{ItemName = "Minimalist Chic", 
        //ItemDescription = "Description: Add a modern charm to your space with the Minimalist Chic sofa. Its clean lines and minimalist design seamlessly fit into any interior, creating an atmosphere of lightness and style.", 
        //ItemCount = 12, ItemDiscount = 30, ItemPrice= 750.0, imageName ="arm_chair.png",VerticalRotation = true, ItemType = "sofa",SceneValues = new SceneValue{ItemScene = "sofachairs/arm_chair.glb", X = 1, Y = 1, Z = 1}},
        //new Items{ItemName = "Airy Space", ItemDescription = "A wardrobe is a furniture piece designed for storing clothes and personal items. Equipped with doors, drawers, and shelves, it provides organized storage while contributing to room aesthetics. Found in bedrooms and dressing rooms, wardrobes offer functional solutions for keeping clothing and accessories in order.", 
        //ItemCount = 10, ItemDiscount = 30, ItemPrice= 2045.0,imageName ="wardobe1.png",VerticalRotation = false,ItemType = "wardrobe",SceneValues = new SceneValue{ItemScene = "wardrobe/wardrobe1.glb", X = 0.02, Y = 0.02, Z = 0.02}},
        //new Items{ItemName = "Enigmatic Depth", ItemDescription = "The Enigmatic Depth wardrobe impresses with its elegance and practicality. With mirrored doors, it expands the space and provides a touch of brightness to the room.", ItemCount = 3, ItemDiscount = 30, ItemPrice= 1675.0,imageName ="wardrobe2.png",VerticalRotation = false,ItemType = "wardrobe",SceneValues = new SceneValue{ItemScene = "wardrobe/wardrobe_dual.glb", X = 2, Y = 2, Z = 2}},
        //new Items{ItemName = "Urban Elegance", ItemDescription = "Elevate your bedroom with the Urban Elegance wardrobe. Its sleek design and urban appeal make it a statement piece in any modern living space. With ample storage space and a contemporary aesthetic, it seamlessly combines functionality and style.", ItemCount = 4, ItemDiscount = 30, ItemPrice= 1379.0,imageName ="wardrobe.png",VerticalRotation = false,ItemType = "wardrobe",SceneValues = new SceneValue{ItemScene = "wardrobe/wardrobe.glb", X = 2, Y = 2, Z = 2}},
        //new Items{ItemName = "Rustic Charm", ItemDescription = "Embrace the warmth of rustic charm with our Rustic Charm wardrobe. Crafted from solid wood with a distressed finish, it exudes a cozy, farmhouse-inspired feel. The intricate detailing and spacious interior make it a timeless addition to your home.", ItemCount = 12, ItemDiscount = 30, ItemPrice= 999.99,imageName ="fancy.png",VerticalRotation = false,ItemType = "wardrobe",SceneValues = new SceneValue{ItemScene = "wardrobe/drawer_fancy.glb", X = 2, Y = 2, Z = 2}},

    };
    private readonly ILogger<ItemsController> _logger;
    private readonly  IItemsService _service;
    private readonly  ICardService _card;

    public ItemsController(ILogger<ItemsController> logger, IItemsService service, ICardService card)
    {
        _logger = logger;
        _service = service;
        _card = card;
    }

    [HttpGet("[action]")]
    public IActionResult GetItems()
    { 
        _service.AddItems();
        var items = _service.AllItems();
        return Ok(items);
    }

    [HttpGet("GetItems/{ItemType}")]
    public IActionResult GetItemByType(string ItemType)
    {
        var items = _service.ItemsByType(ItemType);
        return Ok(items);
    }

    [HttpGet("[action]/{Value}")]
    public IActionResult GetItem(int Value)
    { 
        List<ItemColorAndCount> item = _service.GetItemById(Value);
        return Ok(item);
    }

    [HttpPost("[action]")]
    public IActionResult AddToCard([FromBody] Order CardItem)
    { 
        CardItem.YourDateField = DateTime.Now;
        _card.AddValueToCard(CardItem);
        return Ok();
    }


    [HttpPost("[action]")]
    public IActionResult FromCard([FromBody] CheckUser user) 
    { 
       var items = _card.GetFromCard(user);
        return Ok(items);
    }

    [HttpPost("[action]")]
    public IActionResult MyOrders([FromBody] CheckUser user) 
    { 
        var items = _card.MyOrders(user);
        return Ok(items);
    }


    [HttpPut("[action]")]
    public IActionResult ConfirmeOrder([FromBody] CheckUser user) 
    { 
        _card.Confirm(user);
        return Ok();
    }
    [HttpPut("[action]")]
    public IActionResult UpdateOrder([FromBody] OrderForm order) 
    { 
        _card.UpdateOrderItem(order);
        return Ok();
    }

}
