## Project comforty :

- cloudinary 
### Problem statement :
Many other platforms out thier could not have targeted this niche . There are absolutely some pain points which exists in the buy , sell and specially renting of furniture .
- Olx targets a wide variety of products , same sell and purchase model .
- zameen.com uses same business model and targeting niche of real estate .

### Audience :
The users would probably be able to 
- purchase furnitures and browse variety  of it .
- Providers can be able to sold out furnitures , or rent it out for a specific perioud of time .
All operations have to be done with same account . Create one account then sell or purchase or rent out furnitures .

### Goal :
To target the pain points of this niche specially in rental business model

### Core features :
- Listings page with search bar 
- filters for category such as beds , sofas , chairs , tables , cupboard etc 
- Filters for rental , sell and purchase of furniture .
- details page for showing details about the selected product .
- Login and signup functionality for accounts .
- Dashboard for accounts with options like rental , sell and purchasing .
- For rental furnitures , simply add products , upload images and select the pricing model (hourly , days , per month) , price 
- Same goes with selling furnitures .
- For purchasing, checkout the listing -> details page and then directly message provider to get the details .

## Database schema :
- 4 tables created by better auth . 
- `selling_products` table for storing products that are uploaded to be sold.
- `rental_products` table for storing products data rented out .
- `rentings` table which store data about who rented what for which price. (because later the rental_products should be editable by owner we have to store an agreement) 
- `messages` which should store the messages .

## Feature Description:

1. #### **Listings page :**
- Fetch the data from `selling_products` table .
- Create a search bar for searching out the product .
- Create filter selection for different categories like sofas , chairs , bad etc 
- Another filter for Rental and sell furnitures .

2. #### **Product details page :**
- Details page for showing details 
- Be able to display different pictures of the product. 
- display product name , price and nessessary details .
- details page should defer for different categories like differnt for purchase , rental and selling .

3. #### **Authentication :**
- User should be navigated to signup page at `/signup` route ,
- Create a zod schema for validating user's name , email , phone number and password , then use an external api to verify if phone number is valid . if not dont create account else create account and  redirect user to `/account` page .

4. #### **Selling :**
- Create `/account/sell` route which showing products user have uploaded for sell . A button which redirects user to `/account/sell/add` route to enter following product's data .
1. product name 
2. product description
3. price 
4. quantity available in stock 
- Validate the data and add products in the selling category table.
- User should right click on product , edit this product using dialog. also product can be deleted .

5. #### **Purchasing:**
- User go to `/listings` route which showing products catalog . On clicking the card user should be redirected to the details page , from where he can message the owner of product .

6. #### **Renting out  :**
- Create `/accounts/rentals` route which is showing products the user have rented out , the add button for adding the products for the renting out which redirects user to `/account/rentals/add` route and user should have to enter following data .
1. product name 
2. product description
3. price 
4. quantity available in stock 
5. Pricing model (hourly , per month )

- This route also have a details page for product details and contains the following tabs .
1. A tab for ratings , 
2. A tab for listing of other users who have rented the same product, if the product is even edited later , 
7. #### **Landing page UI :**
- Enhance the existing ui of landing page .