using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities;

public class Basket
{
    public int Id {get; set;}

    public string BuyerId{get; set;}

     // Basket has many BasketItem
    public List<BasketItem> Items{get; set;} = new(); //on a la liste des basketItem

    public void AddIten (Product product, int quantity)
    {
        if (Items.All(item=>item.ProductId != product.Id))
        {
            Items.Add(new BasketItem{Product = product, Quantity = quantity});
        }

        var existingItem = Items.FirstOrDefault(item=>item.ProductId == product.Id);
        if(existingItem != null)existingItem.Quantity += quantity;
    }

    public void RemoveItem(int ProductId, int quantity)
   {
        var item = Items.FirstOrDefault(item=>item.ProductId == ProductId);
        if (item == null) return;
        item.Quantity -= quantity;
        if(item.Quantity == 0) Items.Remove(item);
        {
            
        }
   }
}
