let cart = JSON.parse(localStorage.getItem("basket")) || []

function show_products(products) {
    products.forEach(e => {
        $(".products_colletion").append(`
             <div class="product flex flex-col bg-white shadow-md w-72">
                <img class='w-72 h-48 object-cover'
                    src="${e.thumbnail}"
                    alt="image">
                <div class="p-4 text-sm">
                    <p class="text-slate-600">$ ${e.price}</p>
                    <p class="text-slate-800 text-base font-medium my-1.5">${e.title}</p>
                    <p class="text-slate-500">${e.description.slice(50)}</p>
                    <div class="grid grid-cols-2 gap-2 mt-3">
                        <button data-id="${e.id}" class="add_to_cart bg-slate-100 text-slate-600 py-2">
                            Add to cart
                        </button>
                        <button class="bg-slate-800 text-white py-2">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            `)
    })
    $(".add_to_cart").click(function () {
        let id = $(this).data('id')
        change_basket(id)
    })
}

function change_basket(id, quantity = 1, price = null) {

    let cart_item = cart.find(el => el.product_id == id);

    if (cart_item) {
        if (cart_item.quantity + +quantity < 1) return
        cart_item.quantity += quantity
        if (price) {
            const subtotal = (+$('.subtotal').text() + (price * quantity))
            const tax = (+$('.tax').text() + ((price * quantity) * .1))
            $('.subtotal').text(subtotal.toFixed(2))
            $('.tax').text(tax.toFixed(2))
            $('.total').text((subtotal + tax + 10).toFixed(2))
        }
    }
    else {
        cart.push({ product_id: id, quantity: 1 })
    }
    Cart_count()


    localStorage.setItem('basket', JSON.stringify(cart))
    return cart_item?.quantity || 1;

}

let cart_items
function show_cart_products(products) {
    cart_items = cart.map(el => {
        let find_id = products.find(e => e.id == el.product_id)
        find_id.quantity = el.quantity
        return find_id
    })
    cart_total(cart_items)

    cart_items.forEach(e => {
        $('.cart_products').append(`
             <div class="product flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200">
                <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
                    <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                        <img src='${e.thumbnail}'
                            class="w-full h-full object-contain" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <div>
                            <h3 class="text-sm sm:text-base font-semibold text-slate-900">${e.title}</h3>
                            <p class="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2">
                                Color: <span class="inline-block w-4 h-4 rounded-sm bg-[#ac7f48]"></span>
                            </p>
                        </div>
                        <div class="mt-auto">
                            <h3 class="text-sm font-semibold text-slate-900">$ ${e.price}</h3>
                        </div>
                    </div>
                </div>

                <div class="ml-auto flex flex-col">
                    <div class="flex items-start gap-4 justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            class="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                            viewBox="0 0 64 64">
                            <path
                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                data-original="#000000"></path>
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" data-id="${e.id}" id='hiden${e.id}'
                            class="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                            viewBox="0 0 24 24">
                            <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000"></path>
                            <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000"></path>
                        </svg>
                    </div>
                    <div class="flex items-center gap-3 mt-auto">
                        <button data-price="${e.price}" type="button" data-quantity="-1" data-id="${e.id}"
                            class="change_quantity flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-400 outline-none rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-2 fill-white"
                                viewBox="0 0 124 124">
                                <path
                                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                    data-original="#000000"></path>
                            </svg>
                        </button>
                        <span class="quantity_final font-semibold text-base leading-[18px]">${e.quantity}</span>
                        <button data-price="${e.price}" type="button" data-quantity="1" data-id="${e.id}"
                            class="change_quantity flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-800 outline-none rounded-full">
                            <svg data-id="${e.id}" xmlns="http://www.w3.org/2000/svg" class="w-2 fill-white"
                                viewBox="0 0 42 42">
                                <path
                                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                    data-original="#000000"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
    `)
    })
    $(".cart_products").css({
        "whiteSpace": "nowrap"
    })
    function hide(cart_items) {
        cart_items.forEach(e => {
            $(`#hiden${e.id}`).click(function () {
                $(this).closest('.product').hide(2000);
                cart = cart.filter(el => el.product_id !== e.id)
                localStorage.setItem("basket", JSON.stringify(cart));
                cart_items = cart_items.filter(item => item.id !== e.id);
                Cart_count();
                cart_total(cart_items)
            })
        })
        return cart_items
    }


    $(".change_quantity").click(function () {
        let quantity = change_basket($(this).data('id'), $(this).data('quantity'), $(this).data('price'))
        $(this).siblings('.quantity_final').text(quantity)
    })
    cart_items = hide(cart_items)
    buy_product(cart_items, cart)
}

function Cart_count() {
    const cartCount = cart.reduce((sum, el) => sum + el.quantity, 0)
     $('.cart_count').text(cartCount)
     return $('.cart_count').text()
}


function buy_product(cart_items, cart) {
    $("#button_buy").click(function () {
        let count=Cart_count()
        console.log(count);
        if (count === '0') return;
        $(".cart_products").hide(4000, function () {
            $(".cart_products").html('<span id="success_msg">Your purchase was successful</span>').show(4000, function () {
                $("#success_msg").hide(5000)
            });
            $("#success_msg").css({
                "padding": "20px",
                "display": "flex",
                "justifyContent": "center",
                "backgroundColor": "red",
                "borderRadius": "10px",
                "color": "white",
                "fontSize": "24px",
                "whiteSpace": "nowrap"
            });
        })
        cart.length = 0;                
        cart_items.length = 0;
        localStorage.setItem("basket", JSON.stringify(cart));
        cart_items = []
        cart_total(cart_items)
        Cart_count()
    })
}
function cart_total(cart_items) {

    const subtotal = cart_items.reduce((sum, el) => el.price * el.quantity + sum, 0);
    const tax = subtotal * .1;
    const shipping = 10;
    const total = subtotal + tax + shipping
    $('.subtotal').text(subtotal.toFixed(2))
    $('.tax').text(tax.toFixed(2))
    $('.shipping').text(shipping.toFixed(2))
    $('.total').text(total.toFixed(2))
}
