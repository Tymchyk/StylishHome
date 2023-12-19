using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Store.Data
{
    public class Items
    {
        public int Id {get;set;}
        public string? ItemName{get;set;}
        public string? ItemDescription{get;set;}
        public int ItemCount{get;set;}
        public double ItemPrice{get;set;}
        public int ItemDiscount{get;set;}
        public bool VerticalRotation{get;set;}
        public string? imageName{get;set;}
        public string? ItemType{get;set;}
        public int? SceneValueId{get;set;}
        public SceneValue? SceneValues{get;set;}
        

        
    }

    public class SceneValue{
        public int Id{get;set;}
        public string? ItemScene{get;set;}
        public double X{get;set;}
        public double Y{get;set;}
        public double Z{get;set;}
    }

    public class Order
    {
        public int Id {get;set;}

        public string? UserName{get;set;}
        public string? UserEmail{get;set;}

        public int ItemsId{get;set;}
        public Items? Item{get;set;}

        public int UserCount{get;set;}
        public string? OrderStatus{get;set;}
        public int OrderNumber{get;set;}
        public DateTime? YourDateField { get; set; }
    }
    public class CheckUser{
        public string? UserName{get;set;}
        public string? UserEmail{get;set;}
    }


}