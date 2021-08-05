# Project's name: My-cowoking App

## Description

​
My-cowoking App is an app that will help you find and compare the bests coworkings in your city.
​

## USER STORIES (MVP)

​
**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
​
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
​
**Landing page** - As a user I want to be able to access the landing page so that I see what the app is about and login and signup
​
**Sign up** - As a user I want to be able to create an account to use the app and save my tasks
​
**Login** - As a user I want to be able to log in on the webpage
​
**Logout** - As a user I want to be able to log out from the webpage
​
**Profile** - As a user I want to be able to see my profile and edit it
​
**Reservations** - As a user I want to be able to do a reservation and check for available spots
​
**Add spaces** - As a owner I want to add a coworking space
​
**Add products** - As a owner I want to add extra commodities to my coworking space
​
**Edit space** -As a owner I want to edit my space and products

## BACKLOG

**Calendar with available spots (live)** - As a costumer and as a owner, I want to see the available spots for each day.
**Fake payment** - As a costumer I want to pay & as a business I want to receive money.
**Mailing** - As a user I want to receive an email when I make a reservation.
**Geo-location of business** - As a business I want to be able to locate my place on a map, as a costumer I want to see business near me.

## ROUTES

​
| Name | Method | Endpoint | Description | Body | |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home | GET | /home |See the main page | | |
| Sign up | POST | /signup | Sign up a user with an account | { mail, password } | |
| Log in | POST | /login | Log in the user | { mail, password, profile } | |
| Logout | GET | /logout | Logout a user |

- | - | - | - | -
  | User main page | GET | /user/profile | User main page | {spaces, products }
  | Edit user | GET | /user/profile/edit | Edit user | {firstName, lastName, city}  
  | Edit user | PUT | /user/profile/edit | Edit user | {firstName, lastName, city}
  | See details of a specific space | GET | /spaces/:id/detail | See spaces details | {products, calendar, city}
  | My reservations | GET | /reservations | See current and past reservations
  | Make reservation | POST | /reservations | Add product to cart | {spaceName, products, user}
  | Order detail | GET | /reservations/:id/details | See details of a reservation
  | Delete user account | DELETE | /user/delete | Delete user
- | - | - | - | -
  | Add space | GET | /space/add | See add space form
  | Add space | POST | /space/add | Send space data to database | {spaceName, products, city, image }
  | Space main page | GET | /space/profile | space main page
  | Edit space | GET | /space/profile/edit | Edit space  
  | Edit space | PUT | /space/profile/edit | Edit space | {spaceName, spaceType, city}
  | My products | GET | /space/products | See space products
  | My space orders | GET | /space/reservations | See current reservations of tables
  | Add product | GET | /space/add-product | Add product
  | Add product | POST | /space/add-product | Add product | {description, price, image}
  | Edit product | GET | /space/:id/edit | Edit product
  | Edit product | PUT | /space/:id/edit | Edit product | {description, price, image}
  | Delete product | POST | /space/:id/delete | Delete product
  | Delete space account | DELETE | /space/delete | Delete space
  | Log out | POST | /logout | Log out of the app

​
​

## COMPONENTS

​
**AUTH**
Auth-service
Login
Signup
Protected-routes
​
**NAVBAR**
Cart
Home
​
**SPACE**
Add
Edit
Details
List
​
**PRODUCTS**
Add
List
​
**USER**
Edit account
Manage Space
Add space to favourites
Check my reservations

**ADMIN**
Edit account
Edit/ Add/ Delete Space
Edit/ Add/ Delete Products
Check all the reservations
​
**RESERVATIONS**
Add
List
​
**CART**
Status

## MODELS

​

USER MODEL
​

```js
{
		firstName: String,
		lastName: String,
		hashedPassword: { type: String, required: true, match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/ },
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
		},
		city: String,
		role: {
			type: String,
			enum: ['admin', 'customer'],
			default: 'customer',
		},
		favSpaces: [{ type: Schema.Types.ObjectId, ref: 'Space' }],
	}
```

PRODUCT MODEL
​

```js
{
   productPrice: Number,
	productDescription: String,
	quantity: {
		type: Number,
		default: 1,
	},
}
```

SPACE MODEL
​

```js
{
		spaceName: { type: String, required: true },
		spaceType: {
			type: String,
			enum: ['Desk', 'Room'],
			required: [true, 'SpaceType is required.'],
		},
		imgUrl: {
			type: [String],
		},
		daily: { type: Number, required: true },
		weekly: { type: Number, required: true },
		monthly: { type: Number, required: true },
		city: { type: String, required: true },
		quantity: {
			type: Number,
			default: 1,
		},
	},
```

​

RESERVATION MODEL
​

```js
	{
		spaces: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Space',
			},
		],
		products: [
			{
				type: [Schema.Types.ObjectId],
				ref: 'Product',
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		totalAmount: {
			type: Number,
		},

	},
	{
		t
```

​

## LINKS

​

### Github project

​

- https://github.com/celia22/Frontend-My-coworking-app
- https://github.com/celia22/My-coworking-App-Backend
  ​

### Deploy links

​

- https://my-coworking.netlify.app/
  ​

### Project kanban

- https://github.com/celia22/Frontend-My-coworking-app/projects/1
  ​

### Wireframes

​

- https://excalidraw.com/#json=5270398597857280,N3-hW5vzP1Y15AptqvefJQ
  ​

### Slides

​

- https://docs.google.com/presentation/d/1QAfQEa4cdZdrQ9zNPuDmi0zvgMYkVBeTzYZ59GX_4ic/edit#slide=id.gc6f80d1ff_0_5
