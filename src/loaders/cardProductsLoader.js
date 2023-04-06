import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();
    // if cart data is coming from database then have to use async await

    // console.log(products);
    const storedCart = getShoppingCart()
    const savedCart = []

    for (const id in storedCart) {
        // meaning searching with id and trying to find a match with the object
        const addedProduct = products.find(pd => pd.id === id)
        // if we find a id matched with cart local storage then we will try to find the quantity too
        if (addedProduct) {
            const quantity = storedCart[id];
            // defining the quantity and then assigning it to addedProduct

            addedProduct.quantity = quantity;

            // making an array and pushing new cart data , which was fetched from local storage
            savedCart.push(addedProduct)

        }
    }

    return savedCart;
}

export default cartProductsLoader;