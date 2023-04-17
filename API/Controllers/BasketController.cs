using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using API.DTOs;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
            _context = context;

    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();

        return MapBasketToDto(basket);
    }



    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemBasket (int productId, int quantity)
    {
       var basket = await RetrieveBasket();

       if(basket == null) basket= CreateBasket();

       //get product
       var product = await _context.Products.FindAsync(productId);
       
       if(product == null) return NotFound();

       basket.AddIten(product, quantity);

       var result =  await _context.SaveChangesAsync() > 0;
       
       if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

       return BadRequest(new ProblemDetails{Title = "Probleme saving item to basket"});
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
    {
       //get basket
       var basket = await RetrieveBasket();
       if(basket == null)return NotFound();

       //remove item or reduce quantity
       basket.RemoveItem(productId, quantity);

       //save changes
      var result = await _context.SaveChangesAsync()>0;
      if(result) return Ok();
    
       return BadRequest(new ProblemDetails{Title ="Probleme removing item from the basket"});
    }

      private async Task<Basket> RetrieveBasket()
    {
        return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
    }

    private Basket CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        var basket = new Basket {BuyerId = buyerId};
        _context.Baskets.Add(basket);
        return basket;
    }


     private BasketDto MapBasketToDto(Basket basket)
    {
        return new BasketDto
        {
            Id = basket.Id,
            BuyerId = basket.BuyerId,
            Items = basket.Items.Select(item => new BasketItemDto
            {
                productId = item.ProductId,
                Name = item.Product.Name,
                price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity
            }).ToList()
        };
    }
}
