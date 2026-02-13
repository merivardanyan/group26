$(document).ready(function () {
    if ($("#home_page")) {
        fetch("https://dummyjson.com/products").then(el => el.json()).then(e => {
            show_products(e.products)
            Cart_count()
    })
        
    }
    if ($("#cart_page")) {
        fetch("https://dummyjson.com/products")
            .then((e) => e.json())
            .then((e) => {
                show_cart_products(e.products);
                Cart_count()
            });
            if (cart.length === 0) {
                $('.cart_products').html('');
            }
    }
})
