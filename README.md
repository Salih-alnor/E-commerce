<h1>React Native E-Commerce App</h1>

A complete E-Commerce mobile application built with React Native (frontend) and Node.js + Express.js + MongoDB (backend).
The app provides a modern shopping experience with authentication, product browsing, cart, wishlist, advanced search, secure checkout with Stripe, and password hashing with bcrypt.


<h2>Features</h2>
<p>	•	Splash & Onboarding: Introductory screens highlighting app features.</p>
<p>	•	Home Screen: Browse categories and featured products.</p>
<p>	•	Products Screen:</p>
<p>	•	Displays products using FlatList for efficient rendering.</p>
<p>	•	Each product card shows image, name, price, and quick actions (Add to Cart / Add to Favourites).</p>
<p>	•	Search Screen:</p>
<p>	•	Search products by product name or brand name.</p>
<p>	•	Product Details Screen:</p>
<p>	•	Display multiple product images using ScrollView.</p>
<p>	•	Show name, description, price, rating.</p>
<p>	•	Add to Cart and Favourites.</p>
<p>	•	Cart Screen:</p>
<p>	•	View products added to the cart.</p>
<p>	•	Increase or decrease product quantity with instant update of the total price.</p>
<p>	•	Remove a single product or clear all products at once.</p>
<p>	•	Proceed to Checkout.</p>
<p>	•	Favourites Screen:</p>
<p>	•	Manage favourite products.</p>
<p>	•	Add/remove products individually or clear all.</p>
<p>	•	Profile Screen:</p>
<p>	•	View and edit user information.</p>
<p>	•	Change profile picture using camera or photo gallery.</p>
<p>	•	Authentication (Login & Register): Secure sign-up and login.</p>
<p>	•	Persistent User Session: Managed with JWT and AsyncStorage.</p>


<h2>State Management with Redux</h2>
<p>	•	User State: Manage logged-in user data including profile picture.</p>
<h3>	•	Cart State:</h3>
<p>	•	Add products to cart.</p>
<p>	•	Increase/decrease product quantity with live price calculation.</p>
<p>	•	Remove single product or clear all.</p>
<p>	•	Sync cart data with backend via API.</p>
<p>	•	Favourites State:</p>
<p>	•	Add/remove products individually or clear all.</p>
<p>	•	Fetch favourite products from backend via API.</p>
<p>	•	Products State:</p>
<p>	•	Fetch product list from API.</p>
<p>	•	Supports filtering/search.</p>
<p>	•	API Integration:</p>
<p>	•	All cart, favourites, user profile, and product actions are synced with backend using RESTful APIs.</p>
<p>	•	Ensures persistent and up-to-date data across sessions and devices.</p>



<h2>Tech Stack</h2>

<h3>Frontend</h3>
<p>	•	React Native (Expo or CLI)</p>
<p>	•	Redux (State Management)</p>
<p>	•	AsyncStorage (Persistent User Data)</p>
<p>	•	Stripe SDK</p>
<p>	•	ScrollView (Multiple images in Product Details)</p>
<p>	•	FlatList (Product Listing)</p>
<p>	•	Image Picker / Camera Access (Profile Picture)</p>

<h3>Backend</h3>
<p>	•	Node.js</p>
<p>	•	Express.js</p>
<p>	•	MongoDB</p>
<p>	•	JWT (JSON Web Token)</p>
<p>	•	bcrypt (Password Hashing)</p>



<h2>Installation & Setup</h2>

<h3>Backend</h3>
<p>cd backend</p>
<p>npm install</p>
<p>npm start</p>

<h3>Frontend</h3>
<p>cd frontend</p>
<p>npm install</p>
<p>npm start</p>




<h2>Security</h2>
<p>	•	Password Hashing: Implemented with bcrypt before storing passwords.</p>
<p>	•	Authentication: Secure session management with JWT.</p>
<p>	•	Persistence: Tokens stored in AsyncStorage for persistent login.</p>



<h2>Payment Integration</h2>
<p>	•	Stripe API for card payments.</p>
<p>	•	Cash on Delivery and PayPal supported.</p>



Screenshots
<p>	•	Splash / Onboarding</p>
<p>	•	Home / Categories</p>
<p>	•	Products (FlatList)</p>
<p>	•	Search (by product name or brand name)</p>
<p>	•	Product Details (ScrollView with multiple images)</p>
<p>	•	Cart (Increase/decrease quantity, Remove single / Clear all products)</p>
<p>	•	Checkout</p>
<p>	•	Favourites</p>
<p>	•	Profile (Change profile picture via Camera or Gallery)</p>
<p>	•	Login / Register</p>



  <h2>Future Improvements</h2>
<p>	•	Push Notifications</p>
<p>	•	Multi-language support (i18n)</p>
<p>	•	Admin Dashboard for product & order management</p>
<p>	•	Enhanced UI/UX</p>


![moc page](./client/assets/screenshots/moc.jpg)

![]
<img src="./client/assets/screenshots/home.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/login.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/register.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/profile.jpg" width="190px" height="600px">


![]
<img src="./client/assets/screenshots/categoris.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/subCategoris.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/brand.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/search.jpg" width="190px" height="600px">



![]
<img src="./client/assets/screenshots/cart.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/empty-cart.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/details.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/favorites.jpg" width="190px" height="600px">



![]
<img src="./client/assets/screenshots/checkout.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/payment-method.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/details.jpg" width="190px" height="600px">
<img src="./client/assets/screenshots/favorites.jpg" width="190px" height="600px">
 


