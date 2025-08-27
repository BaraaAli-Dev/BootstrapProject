let App = {
  // Data
  data: function () {
    return {
      products: products,
      path: `home`,
      cart: [],
      searchVal: ``,
      filteredProducts: products,
    };
  },
  // Methods
  methods: {
    changeContent: function (content) {
      this.path = content;
    },
    addToCart: function (productInfo) {
      let check = this.cart.some(function (item) {
        return item.productInfo.id == productInfo.id;
      });
      if (check == false) {
        this.cart.push({ productInfo, counter: 1 });
      } else {
        let addedPro = this.cart.find(function (item) {
          return item.productInfo.id == productInfo.id;
        });
        addedPro.counter++;
      }
      productInfo.stock--;
    },
    deleteAll: function (item) {
      let toRemove = this.cart.find(
        (i) => i.productInfo.id === item.productInfo.id
      );
      if (toRemove) {
        toRemove.productInfo.stock += toRemove.counter;
      }
      this.cart = this.cart.filter(
        (i) => i.productInfo.id !== item.productInfo.id
      );
    },
    deleteOne: function (item) {
      let cartItem = this.cart.find(
        (i) => i.productInfo.id === item.productInfo.id
      );
      if (!cartItem) return;
      cartItem.productInfo.stock += 1;
      cartItem.counter -= 1;
      if (cartItem.counter <= 0) {
        this.cart = this.cart.filter(
          (i) => i.productInfo.id !== item.productInfo.id
        );
      }
    },
    doSearch: function () {
      let search = this.searchVal.trim().toLowerCase();
      if (search.trim() === ``) {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(
          (item) =>
            item.title.toLowerCase().includes(search) ||
            (item.category && item.category.toLowerCase().includes(search))
        );
      }
      window.scrollTo({ top: 0, behavior: `smooth` });
    },
  },
};

Vue.createApp(App).mount(`#App`);
