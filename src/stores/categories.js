import { defineStore } from "pinia";

export const categories = defineStore("categoriesAll", {
  state: () => {
    return {
      categories: [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting",
      ],
      namcategories: [],
      getcategory: [],
      Allpro: [],
    };
  },
  actions: {
    async get_categories(category, fals) {
      // ------------------Get all products ---------
      await fetch(`https://dummyjson.com/products/category/${category}`)
        .then((res) => res.json())
        .then((res) => {
          if (fals) {
            this.Allpro = res.products;
          } else {
            this.getcategory = res.products;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async name_categories() {
      this.Allpro = [];
      await fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((res) => {
          this.namcategories = res;
        })

        .catch((error) => {
          console.log(error);
        });
    },
  },
});
