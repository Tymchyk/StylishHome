using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Store.Data;
namespace Store.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemsController : ControllerBase
{
    public List<Items> Values = new List<Items>{
        new Items{ItemName = "Sofa", 
        ItemDescription = "A sofa is a comfortable and upholstered seating furniture designed for relaxation and socializing. Typically featuring a frame with padded cushions, a sofa offers a supportive and inviting surface for sitting or reclining. Sofas come in various styles, sizes, and materials, allowing them to complement diverse interior aesthetics. They are a central piece of furniture in living rooms, lounges, and common areas, providing a cozy and functional space for individuals and groups to gather, converse, or unwind. The design versatility of sofas caters to different preferences, ranging from classic and traditional to modern and contemporary styles.", 
        ItemCount = 12, ItemDiscount = 30, ItemPrice= 1350.0, imageName ="sofa.png",VerticalRotation = true, ItemType = "sofa",SceneValues = new SceneValue{ItemScene = "sofa.glb", X = 0.04, Y = 0.04, Z = 0.04}},
        new Items{ItemName = "Wardrobe", ItemDescription = "A wardrobe is a furniture piece designed for storing clothes and personal items. Equipped with doors, drawers, and shelves, it provides organized storage while contributing to room aesthetics. Found in bedrooms and dressing rooms, wardrobes offer functional solutions for keeping clothing and accessories in order.", 
        ItemCount = 10, ItemDiscount = 30, ItemPrice= 2045.0,imageName ="wardobe1.png",VerticalRotation = false,ItemType = "wardrobe",SceneValues = new SceneValue{ItemScene = "wardrobe1.glb", X = 0.01, Y = 0.01, Z = 0.01}},
        new Items{ItemName = "Armchair", ItemDescription = "Something", ItemCount = 34, ItemDiscount = 30, ItemPrice= 1115.0,imageName ="armchair.png",VerticalRotation = false,ItemType = "sofa",SceneValues = new SceneValue{ItemScene = "armchair.glb", X = 1, Y = 1, Z = 1}},
        new Items{ItemName = "Wardrobe", ItemDescription = "Something", ItemCount = 34, ItemDiscount = 30, ItemPrice= 1675.0,imageName ="wardrobe2.png",VerticalRotation = false,ItemType = "wardrobe",SceneValues = new SceneValue{ItemScene = "wardrobe2.glb", X = 0.01, Y = 0.01, Z = 0.01}},
        new Items{ItemName = "Wardrobe", ItemDescription = "Something", ItemCount = 34, ItemDiscount = 30, ItemPrice= 2000.0,imageName ="wardrobe.png",VerticalRotation = false,ItemType = "wardrobe",SceneValues = new SceneValue{ItemScene = "wardrobe.glb", X = 2, Y = 2, Z = 2}},

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
        foreach(Items item in Values)
        {
            _service.AddItems(item);
        }
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
        Items item = _service.GetItemById(Value);
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

}
