using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("BasketItems")]
public class BasketItem
{
    public int Id {get; set;}
    public  int Quantity {get; set;}

   // Navigation properties
    public int ProductId {get; set;} //cles etrangere
    public Product Product {get; set;} //relation entre BaskeItem et les products et il on une relation one to one 
   
    public int BasketId {get; set;} //cles etrangere
    public Basket basket {get; set;} //relation oneToOne

}
