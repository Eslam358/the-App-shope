// stores/counter.js
import { defineStore } from "pinia";

export const productsAll = defineStore("productsAll", {
  state: () => {
    return { count: 0, getproductarr: [], favoriteproduct: [], windowsize: 0 };
  },
  actions: {
    async getproduct() {
      // ------------------Get all products ---------
      await fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((res) => {
          this.getproductarr = res.products;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    favoriteproduct_fun(data) {
      let logc = true;
      this.favoriteproduct_updated();
      for (let i = 0; i < this.favoriteproduct.length; i++) {
        if (this.favoriteproduct[i].id == data.id) {
          logc = false;
          this.favoriteproduct[i].total += 1;
        }
      }
      if (logc) {
        data.total = 1;
        this.favoriteproduct.push(data);
      }
      localStorage.setItem(
        "favoriteproduct",
        JSON.stringify(this.favoriteproduct)
      );
    },
    favoriteproduct_updated() {
      if (localStorage.getItem("favoriteproduct")) {
        this.favoriteproduct = JSON.parse(
          localStorage.getItem("favoriteproduct")
        );
      }
    },
    favoriteproduct_Delet(id) {
      this.favoriteproduct_updated();
      for (let i = 0; i < this.favoriteproduct.length; i++) {
        if (this.favoriteproduct[i].id == id) {
          this.favoriteproduct.splice(i, 1);
        }
      }
      localStorage.setItem(
        "favoriteproduct",
        JSON.stringify(this.favoriteproduct)
      );
    },
    favoriteproduct_Delet_All() {
      this.favoriteproduct = [];
      localStorage.removeItem("favoriteproduct");
    },
    // ------------------Get all products ---------
    windowsizefun() {
      this.windowsize = window.innerWidth;
      window.onresize = () => {
        this.windowsize = window.innerWidth;
      };
    },
  },
});
// ----------------------------------------------------------------------
// ------------------Get all products ---------
// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(console.log);
// ----------------------------------------------------------------------

// ------------------ Get all products categories ---------

// fetch('https://dummyjson.com/products/categories')
// .then(res => res.json())
// .then(console.log);
// ----------------------------------------------------------------------

// ------------------ Get products of a category ---------

// fetch('https://dummyjson.com/products/category/smartphones')
// .then(res => res.json())
// .then(console.log);
// ----------------------------------------------------------------------

// ------------------ Add a new product ---------
//
//  Adding a new product will not add it into the server.
//  It will simulate a POST request and will return the new created product with a new id

// fetch('https://dummyjson.com/products/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'BMW Pencil',
//     /* other product data */
//   })
// })
// .then(res => res.json())
// .then(console.log);
// ----------------------------------------------------------------------

// ------------------ Update a product ---------
//
//  Updating a product will not update it into the server.
//  It will simulate a PUT/PATCH request and will return the product with modified data

// /* updating title of product with id 1 */
// fetch('https://dummyjson.com/products/1', {
//   method: 'PUT', /* or PATCH */
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'iPhone Galaxy +1'
//   })
// })
// .then(res => res.json())
// .then(console.log);
// ----------------------------------------------------------------------

// ------------------ Delete a product ---------
//
//  Deleting a product will not delete it into the server.
//  It will simulate a DELETE request and will return deleted product with "isDeleted" & "deletedOn" keys

// fetch('https://dummyjson.com/products/1', {
//   method: 'DELETE',
// })
// .then(res => res.json())
// .then(console.log);

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------
// {
//   "products": [
//     {
//       "id": 1,
//       "title": "iPhone 9",
//       "description": "An apple mobile which is nothing like apple",
//       "price": 549,
//       "discountPercentage": 12.96,
//       "rating": 4.69,
//       "stock": 94,
//       "brand": "Apple",
//       "category": "smartphones",
//       "thumbnail": "...",
//       "images": ["...", "...", "..."]
//     },
//     {...},
//     {...},
//     {...}
//     // 30 items
//   ],

//   "total": 100,
//   "skip": 0,
//   "limit": 30
// }
// [
//   "smartphones",
//   "laptops",
//   "fragrances",
//   "skincare",
//   "groceries",
//   "home-decoration",
//   "furniture",
//   "tops",
//   "womens-dresses",
//   "womens-shoes",
//   "mens-shirts",
//   "mens-shoes",
//   "mens-watches",
//   "womens-watches",
//   "womens-bags",
//   "womens-jewellery",
//   "sunglasses",
//   "automotive",
//   "motorcycle",
//   "lighting",
// ];
