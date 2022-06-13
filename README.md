# ReservoirCats

ReservoirCats is a full-stack e-commerce app. It was a group project for the Concordia University boot camp.

It is built on the MERN stack:

- The database used is MongoDB;
- The node.js server is RESTful and follows REST principles;
- The Express.js framework is used;
- The front end is built with React.js;

<h2>Other Group Members:</h2>

R-LeBlanc <https://github.com/R-LeBlanc>
MichelleDeblois <https://github.com/MichelleDeblois>

<h2>Landing page:</h2>

![LandingPage](https://user-images.githubusercontent.com/91158694/173381575-12779493-bc78-4842-ba5f-734b4254f62a.png)

The landing page presents the user a short fade-in animation, revealing some cartoons cats (the Reservoir Cats, as we called them).

<h2>All Products:</h2>

![AllProducts](https://user-images.githubusercontent.com/91158694/173382081-6aad7b79-590b-4dda-b91c-7858578c7365.png)

The AllProducts page presents the user with the products for sale. Each product is presented on its own tile, with the option to add one of this item to your cart.

![ItemsCanBeSorted](https://user-images.githubusercontent.com/91158694/173387772-7f316419-3232-4d5f-9ae8-25ed543fbe5d.png)

A cool feature of this app is that items can be sorted based on various criteria.

<h2>Cart:</h2>

![Cart](https://user-images.githubusercontent.com/91158694/173388290-9aca9b42-235e-45b8-a48f-9df34a3c20b1.png)

Users can add or remove items from their cart, or reset their cart. LocalStorage allows the cart's contents to persist through a refresh or a closed browser window. The Cart component's fuctionality comes from a CartContext file, which contains a useReducer hook.

<h2>Order Confirmation:</h2>

![OrderConfirmation](https://user-images.githubusercontent.com/91158694/173390383-ced632ff-b8ef-46cc-84e2-6b09609caa9f.png)

Upon placing an order, the user is presented with a confrimation page. A summary of the purchase is provided, along with an order ID generated using UUIDv4.
