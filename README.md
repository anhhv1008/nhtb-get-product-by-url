# nhtb-get-product-by-url

Lấy dữ liệu từ taobao, tmall, 1688 bằng jquery ajax

Code nằm tại file `script.js`

Khi ghép vào dữ liệu thật, cách modify sẽ như sau:
* Khi `append()` dòng mới sẽ thêm đoạn code sau ở cuối đoạn code:
```javascript
$(this).find('#link_sp').keypress(function (e) {
    if (e.which == 13) {
       var url = $(this).val(),
           info = new Info(url,number);
    localStorage.setItem('requestUrl', url);
    info.getInfo();
    }
});
```

Với `this` sẽ phản ánh phần tử vừa được `append()`
