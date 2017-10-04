$(document).ready(function () {
    $("#list_order tr").each(function(){
        var number = $(this).attr('id');
        number = number.replace('order_','');

        $(this).find('#link_sp').keypress(function (e) {
            if (e.which == 13) {
                var url = $(this).val(),
                    info = new Info(url,number);
                localStorage.setItem('requestUrl', url);
                info.getInfo();

            }
        });
    });

});

function Info(url,number = 0) {
    this.url = url;
    this.number = number;
    this.getInfo = function () {
        console.log(this.number);
        $.ajax({
            url: this.url,
            type: 'GET',
            number:this.number,
            success: function (data) {
                //console.log(data);

                var url = localStorage.getItem('requestUrl'),
                    info = new Info(url,this.number);

                if (this.url.indexOf('taobao') >= 0) {
                    info.getTaobao(data);
                } else if (this.url.indexOf('tmall') >= 0) {
                    info.getTmaill(data);
                } else if (this.url.indexOf('1688') >= 0) {
                    info.get1688(data);
                }
            }
        });


    }
    this.getTaobao = function (data) {

        var image, shop, amount, price;
        if ($(data).find("#J_PromoPriceNum").length > 0) {
            var mainPrice = $(data).find("#J_PromoPriceNum").text();
            var convertPrice = String(mainPrice).replace(',', '.').match(/[0-9]*[\.]?[0-9]+/g);
            price = convertPrice[0];
        } else if ($(data).find("#J_PromoPrice > strong").length > 0) {
            var mainPrice = $(data).find("#J_PromoPrice > strong").text();
            var convertPrice = String(mainPrice).replace(',', '.').match(/[0-9]*[\.]?[0-9]+/g);
            price = convertPrice[0];

        } else if ($(data).find("#J_priceStd > strong > span[itemprop='price']").length > 0) {
            var mainPrice = $(data).find("#J_priceStd > strong > span[itemprop='price']").text();
            var convertPrice = String(mainPrice).replace(',', '.').match(/[0-9]*[\.]?[0-9]+/g);
            price = convertPrice[0];

        } else if ($(data).find("#J_priceStd > strong > span[itemprop='lowPrice']").length > 0) {
            var mainPrice = $(data).find("#J_priceStd > strong > span[itemprop='lowPrice']").text();
            var convertPrice = String(mainPrice).replace(',', '.').match(/[0-9]*[\.]?[0-9]+/g);
            price = convertPrice[0];

        }
        else if ($(data).find("#J_StrPriceModBox").length > 0) {
            var str_price = $(data).find("#J_StrPriceModBox > .tb-property-cont > #J_StrPrice > .tb-rmb-num").text();
            if(str_price.indexOf("-",0) < 0){
                var convertPrice = String(str_price).replace(',', '.').match(/[0-9]*[\.]?[0-9]+/g);
                price = convertPrice[0];
            }
        }
        if (price == "" || price == 0) {
            var mainPrice = $(data).find("#J_priceStd > strong > span[itemprop='price']").text();
            var convertPrice = String(mainPrice).replace(',', '.').match(/[0-9]*[\.]?[0-9]+/g);
            price = convertPrice[0];
        }

        if (this.url.indexOf('item.taobao.com') >= 0) {
            image = $(data).find('#J_ImgBooth').attr('src');

            shop = $(data).find('.tb-seller-name').text().trim();

            amount = $(data).find('#J_IptAmount').val();

        }else{
            image = $(data).find('#J_ThumbView').attr('src');

            shop = $(data).find('.shop-info .tb-shop-seller a').text();

            amount = $(data).find('#J_IptAmount').val();
        }
        $("#order_"+this.number).find('#anh_sanpham').val(image);
        $("#order_"+this.number).find('#ten_shop').val(shop);
        $("#order_"+this.number).find('#so_luong').val(amount);
        $("#order_"+this.number).find('#don_gia').val(price);
    }
    this.getTmaill = function (data) {
        var image, shop, amount, price;

        if ($(data).find("#J_PromoPrice > dd").length > 0) {
            price = $(data).find("#J_PromoPrice > dd > .tm-promo-price > .tm-price").text();
            if (price==0)
            {
                price = $(data).find("#J_PromoPrice > dd > .tm-promo-price > .tm-price > font ").text();

            }

        }
        else if ($(data).find("#J_StrPriceModBox > dd").length > 0) {
            price = $(data).find("#J_StrPriceModBox > dd > .tm-price").text();
            if (price==0)
            {
                price = $(data).find("#J_StrPriceModBox > dd > .tm-price > font ").text();
                if(price==0)
                {
                    price =$(data).find("#J_StrPriceModBox > dd > .tm-price > font ").replace(/,/g, '.').text();
                }
            }
        }

        image = $(data).find("#J_ImgBooth").attr("src");

        shop = $(data).find("#J_HdShopInfo .hd-shop-name a").text();

        amount = $(data).find("#J_Amount > .tb-amount-widget.mui-amount-wrap > .mui-amount-input").val();

        $("#order_"+this.number).find('#anh_sanpham').val(image);
        $("#order_"+this.number).find('#ten_shop').val(shop);
        $("#order_"+this.number).find('#so_luong').val(amount);
        $("#order_"+this.number).find('#don_gia').val(price);
    }
    this.get1688 = function (data) {

    }
}
