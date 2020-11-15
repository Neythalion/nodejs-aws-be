create extension if not exists "uuid-ossp";

create table if not exists product_list (
	id uuid primary key default uuid_generate_v4(),
    title text not null,
    genre text not null,
    price decimal not null
);
            
create table if not exists product_stock (
    id uuid primary key,
    count integer default 0 not null,
    foreign key ("id") references "product_list" ("id")
);