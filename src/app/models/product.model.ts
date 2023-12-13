export interface Product {
    id?: string;
    name: string;
    price: number;
    description?: string;
    type: string;
    photo: string;
}

export interface CartItem {
    product: Product;  // Product es la interfaz que ya definiste para los productos
    quantity: number;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}
