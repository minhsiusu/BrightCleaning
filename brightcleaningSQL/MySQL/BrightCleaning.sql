/*drop table user;*/
create table user(
 id int not null auto_increment,
 name char(10) comment'名字',
    account char(10) comment'帳號',
    password char(10) comment'密碼',
    email char(10) comment'信箱',
    cellphone char(10) comment'手機號碼',
    address char(20) comment'地址',
    primary key(id)
);

create table product(
 product_id int not null auto_increment,
 detail varchar(10) comment'細節',
    count int(10) comment'數量',
    picture varchar(10) comment'圖片',
    price int(10) comment'價格',
    product_name char(10) comment'產品名字',
    sales int(10) comment'銷售數量',
    type varchar(20) comment'分類',
    primary key(product_id)
);