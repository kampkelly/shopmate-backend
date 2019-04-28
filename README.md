[![Build Status](https://travis-ci.com/kampkelly/shopmate-backend.svg?token=jDmhdZzRzB1WyMWuvoJF&branch=develop)](https://travis-ci.com/kampkelly/shopmate-backend)

# shopmate-backend

This is the API for an e-commerce application allowing users to create accounts, view products, add to cart and checkout.

The following are the API routes available

### Setup and Installation

The app is built with the following tools/technologies:

1. NodeJs
2. Mysql
3. Sequelize ORM
4. Redis

## Installation

1. Install Nodejs and npm if they are not already installed.
2. Install Mysql server on database. If using a mac, you can make use of SequelPro to connect to it. If on Windows, ypu can make use of PhpMyAdmin.
3. Clone the repository.
4. Run `npm install`.
5. Create a .env file in your root directory and add the environment variables from .env-sample (put in your own details).
6. Migrate the database with `npm run migrate`.
7. You can seed the database with `npm run seed` (optionally).
8. Run `npm run dev to start the server`.
9. Visit the available endpoints.

##### _The documentation for this api can be found [here](https://documenter.getpostman.com/view/7132396/S1LpaX7j)_

## Available Endpoints

### Customer Registration

Post Request to: `/customers`

Body:
```
{
	"name": "customer name",
	"email": "email@example.com",
	"password": "password"
}
```
Example response: 
```
{
    "customer": {
        "customer_id": 'id',
        ...
    },
    "accessToken": "...",
    "expires_in": "24h"
}
```

### Customer Login

Post Request to: `/customers/login`

Body:
```
{
	"email": "email@example.com",
	"password": "password"
}
```
Example response: 
```
{
    "customer": {
        "customer_id": 'id',
        ...
    },
    "accessToken": "...",
    "expires_in": "24h"
}
```

### Customer update address 

Post request to: `/customers/address`

*Jwt token required in header Authorization*

Body:
```
{
	"address_1": "...",
	"address_2": "...",
	"city": "...",
	"region": "...",
	"postal_code": "...",
	"country": "...",
	"shipping_region_id": 'id'
}
```
Example response: 
```
{
    "customer_id": 'id',
    "name": "...",
    "email": "...",
    "address_1": "...",
    "address_2": "...",
    "city": "...",
    "region": "...",
    "postal_code": "...",
    "country": "...",
    "shipping_region_id": 'id',
    "credit_Card": null,
    "day_phone": null,
    "eve_phone": null,
    "mob_phone": null
}
```

### Product Endpoints

#### Get all products

*Get request to: `/products`*

#### Get all products (with filters)

*Get request to: `/products?limit=10&description_length=51&page=1`*

Example response: 
```
{
    "count": 0,
    "rows": [...]
}

```

#### Get single product

*Get request to: `/products/:productId`*

Example response: 
```
{
    "product_id": 'id',
    "name": "...",
    "description": "...",
    "price": "...",
    "discounted_price": "...",
    "image": "...",
    "image_2": "...",
    "thumbnail": "...",
    "display": 0
}

```

#### Get products in category

*Get request to: `/products/inCategory/:categoryId`*

#### Get products in category (with filters)

*Get request to: `/products/inCategory/:categoryId?page=3&limit=23&description_length=51`*


Example response: 
```
{
    "count": 0,
    "rows": []
}

```

#### Get products in department

*Get request to: `/products/inDepartment/:departmentId`*

#### Get products in category (with filters)

*Get request to: `/products/inDepartment/:departmentId?page=3&limit=23&description_length=51`*


Example response: 
```
{
    "count": 0,
    "rows": []
}

```

#### Search products

*Get request to: `/products/search?query_string=Coay&page=1&limit=10&description_length=50`*

Example response: 
```
{
    "count": 0,
    "rows": [...]
}

```

### Shopping Cart Endpoints

#### Generate cart id

*Get request to: `shoppingcart/generateUniqueId`*

Example response: 
```
{
    "cart_id": "..."
}
```

#### Add product to cart

*Post request to: `shoppingcart/add`*
Body:
```
{
	"cart_id": 'id',
	"product_id": 1',
	"attributes": "..."
}
```

Example response: 
```
[
    {
        "item_id": 'id',
        "name": "...",
        "attributes": "...",
        "price": "...",
        "quantity": 2,
        "subtotal": "..."
    }
    ...
]
```

#### Get items in a shopping cart

*Get request to: `shoppingcart/:cart_id`*

Example response: 
```
[
    {
        "item_id": 'id',
        "name": "...",
        "attributes": "...",
        "price": "...",
        "quantity": 2,
        "subtotal": "..."
    }
    ...
]
```

#### Empty the shopping cart

*Get request to: `shoppingcart/empty/:cart_id`*

Example response: 
```
[]
```

### Stripe Endpoints

#### Charge on Stripe

*Get request to: `stripe/charge`*
Body:
```
{
	"stripeEmail": "email@exmaple.com",
    "amount": 100,
    "order_id": 1,
    "description": "...",
    "currency": "usd",
    "stripeToken": "..."
}
```

Example response: 
```
{
     ...
}
```

## Testing

To run the tests, run `npm run test` in the terminal.

## Supporting a large number of users

#### To support a large number of users, here are a couple of suggestions:
1. Renting a server (a cloud server, AWS or Google) with great specifications. This includes the ram, storage size and how distributed it is. It should also be very reliable (99%+ uptime). 
2. Making use of caching to reduce the number of requests to the database.
3. Saving images and assets in a cloud storage such as Google to reduce the stress on the server. This also allows the server to have more storage space.



#### When most of my users are coming from the US:
I would need to ensure majority of my severs are from the US and regions around it. This will allow users from the US to send and retrieve data faster because where they are requesting data from is closer.
Also, I can make use of load balancers to efficiently distribute incoming network traffic. So, if the servers from the US region are receiving very large number of requests and a server goes down, the load balancer will  redirect traffic to the remaining online servers from other regions.